import { prisma } from '@/lib/auth';
import { Prisma, PrismaClient } from '@prisma/client';

export class FeedBackRepository {
  constructor(private readonly instance: PrismaClient) {}

  async findMany() {
    return await this.instance.feedback.findMany();
  }

  async findOne(id: string) {
    return await this.instance.feedback.findUnique({
      where: { userId: id },
    });
  }

  async create(data: Prisma.FeedbackUncheckedCreateInput) {
    return await this.instance.feedback.create({
      data,
    });
  }

  async update(id: string, data: Prisma.FeedbackUncheckedUpdateInput) {
    return await this.instance.feedback.update({
      where: { id },
      data,
    });
  }
}

export const Feedback = new FeedBackRepository(prisma);
