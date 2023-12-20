import type { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import GoogleProvider from 'next-auth/providers/google';

export const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  events: {
    createUser: async ({ user }) => {
      console.log('user rom createUserCallback  : ', user);
      try {
        const freeTrial = await prisma.freeTrial.create({
          data: {
            active: true,
            gen_count: 0,
            userId: user.id as string,
          },
        });

        console.log(freeTrial);

        await prisma.user.update({
          where: { id: user.id as string },
          data: { freeTrial: { connect: { id: freeTrial.id } } },
        });
      } catch (error) {
        console.log('Error en el callback "createUser"');
        console.log(error);
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
  // pages: {
  //   signIn: '/auth/signin',
  // },
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        const userData = { ...session.user, id: user.id };
        session.user = userData;
      }
      return session;
    },
  },
};
