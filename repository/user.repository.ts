import { prisma } from '@/lib/auth';
import { Prisma, PrismaClient } from '@prisma/client';

export class UserRepository {
  constructor(private readonly instance: PrismaClient) {}

  async findMany() {
    return await this.instance.user.findMany();
  }

  async findById(id: string) {
    return await this.instance.user.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    return await this.instance.user.update({
      where: { id },
      data,
    });
  }
}

export const User = new UserRepository(prisma);
