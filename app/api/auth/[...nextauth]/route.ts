import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import GoogleProvider from 'next-auth/providers/google';
import NextAuth from 'next-auth';
import logger from '@/lib/logger';

const handler = NextAuth({
  events: {
    createUser: async ({ user }) => {
      try {
        const freeTrial = await prisma.freeTrial.create({
          data: {
            active: true,
            gen_count: 0,
            userId: user.id as string,
          },
        });

        await prisma.user.update({
          where: { id: user.id as string },
          data: { freeTrial: { connect: { id: freeTrial.id } } },
        });

        // Registra en los logs cuando el usuario se ha creado correctamete.
        logger.info('¡Un nuevo usuario se ha registrado!', { service: 'sign-up', user: user });
      } catch (error) {
        // Registra en los logs cuando ocurre un error en el callback "createUser".
        if (error instanceof Error) logger.error(error.stack as string, { user });
      }
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        const userData = { ...session.user, id: user.id };
        session.user = userData;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
