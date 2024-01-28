import { PrismaClient } from '@prisma/client';

export let prisma: any;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }

  prisma = (global as any).prisma;
}
