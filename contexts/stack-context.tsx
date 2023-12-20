'use client';

import { createContext, useState } from 'react';

export const StackContext = createContext<any>(null);

export default function StackProvider({ children }: { children: React.ReactNode }) {
  const [stack, setStack] = useState<any>('Tailwind + React');

  return <StackContext.Provider value={{ stack, setStack }}>{children}</StackContext.Provider>;
}
