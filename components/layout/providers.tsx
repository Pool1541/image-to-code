'use client';

import ConfigProvider from '@/contexts/config-context';
import StackProvider from '@/contexts/stack-context';
import { SessionProvider } from 'next-auth/react';

interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <StackProvider>
        <ConfigProvider>{children}</ConfigProvider>
      </StackProvider>
    </SessionProvider>
  );
}
