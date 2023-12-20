'use client';

import { Output, OutputType } from '@/types/output.type';
import { createContext, useState } from 'react';

export const StackContext = createContext<{
  stack: OutputType;
  setStack: React.Dispatch<React.SetStateAction<OutputType>>;
}>({
  stack: Output.html_tailwind,
  setStack: () => {},
});

export default function StackProvider({ children }: { children: React.ReactNode }) {
  const [stack, setStack] = useState<OutputType>(Output.html_tailwind);

  return <StackContext.Provider value={{ stack, setStack }}>{children}</StackContext.Provider>;
}
