'use client';

import { createContext, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

export const DrawerContext = createContext<{
  toggleDrawer: () => void;
  animation: string;
}>({
  toggleDrawer: () => {},
  animation: '',
});

export default function DrawerProvider({ children }: Props) {
  const [animation, setAnimation] = useState('');

  function toggleDrawer() {
    if (window.innerWidth >= 1024) {
      return setAnimation('');
    }

    if (animation === 'fade-out' || animation === '') {
      setAnimation('fade-in');
    } else if (animation === 'fade-in' || animation === '') {
      setAnimation('fade-out');
    }
  }

  return (
    <DrawerContext.Provider value={{ toggleDrawer, animation }}>{children}</DrawerContext.Provider>
  );
}
