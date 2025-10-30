import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Prisma, User } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';
import { handleError } from 'src/utils/handle-create-error';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    @Inject('EMAIL_SERVICE') private client: ClientProxy,
  ) {}

  async get() {
    return this.prisma.user.findMany();
  }

  async getById(id: User['id']) {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async create(data: Prisma.UserCreateInput) {
    try {
      const user = await this.prisma.user.create({ data });
      this.client.emit('send-email-wellcome', {
        name: user.name,
        email: user.email,
      });
      return user;
    } catch (error) {
      handleError(error);
    }
  }
}
