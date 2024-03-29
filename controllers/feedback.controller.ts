import logger from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import { FeedBackRepository, Feedback, User, UserRepository } from '@/repository';
import { NextResponse } from 'next/server';

class FeedbackController {
  constructor(
    private readonly feedBack: FeedBackRepository,
    private readonly userRepository: UserRepository
  ) {}

  async create(request: Request) {
    const { uid, rating, content } = await request.json();

    try {
      const newFeedback = await this.feedBack.create({
        rating,
        content,
        userId: uid || null,
      });

      if (uid) {
        await this.userRepository.update(uid, {
          feedback: { connect: { id: newFeedback.id } },
        });
      }

      // // Obtiene todos los feedbacks asociados a un usuario.
      // const feedbacks = await prisma.user.findUnique({
      //   where: { id: uid },
      //   include: { feedback: true },
      // });
      logger.info('¡Se ha recibido un nuevo comentario!', {
        service: 'feedback',
        feedbackId: newFeedback.id,
        user: uid || 'anonymous',
      });
      return NextResponse.json({ message: '¡Gracias por tu comentario!' }, { status: 201 });
    } catch (error) {
      if (error instanceof Error) logger.error(error.stack);
      return NextResponse.json({ message: 'Hubo un error en el servidor' }, { status: 500 });
    }
  }
}

export const feedbackController = new FeedbackController(Feedback, User);
