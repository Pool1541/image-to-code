'use client';

import StackProvider from '@/contexts/stack-context';
import { SessionProvider } from 'next-auth/react';

interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <StackProvider>{children}</StackProvider>
    </SessionProvider>
  );
}
