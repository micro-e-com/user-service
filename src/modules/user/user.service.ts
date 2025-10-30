import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Prisma, User } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    @Inject('EMAIL_SERVICE') private client: ClientProxy,
  ) {}

  async get() {
    this.client.emit('email', 'i sas');
    this.client.emit('kuy', { name: 'kuy', lll: 'hee' });
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
    return this.prisma.user.create({ data });
  }
}
