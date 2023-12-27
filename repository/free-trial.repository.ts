import { prisma } from '@/lib/auth';
import { Prisma, PrismaClient } from '@prisma/client';

export class FreeTrialRepository {
  constructor(private readonly instance: PrismaClient) {}

  async findMany() {
    return await this.instance.freeTrial.findMany();
  }

  async findOne(id: string) {
    return await this.instance.freeTrial.findUnique({
      where: { userId: id },
    });
  }

  async findById(id: string, active: boolean = true) {
    return await this.instance.freeTrial.findUnique({
      where: { userId: id, active: active },
    });
  }

  async create(data: Prisma.FreeTrialUncheckedCreateInput) {
    return await this.instance.freeTrial.create({
      data,
    });
  }

  async update(id: string, data: Prisma.FreeTrialUncheckedUpdateInput) {
    return await this.instance.freeTrial.update({
      where: { id },
      data,
    });
  }
}

export const FreeTrial = new FreeTrialRepository(prisma);
