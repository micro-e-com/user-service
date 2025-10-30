import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Prisma } from 'generated/prisma';

export const handleError = (error: any) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      const fields = error.meta?.target as string[];
      throw new BadRequestException(`${fields.join(', ')} already exists`);
    }
    // Handle other Prisma errors
    if (error.code === 'P2025') {
      throw new NotFoundException('Related record not found');
    }
  }
};
