'use client';

import { MenuIcon } from '../icons';
import useDrawer from '@/hooks/useDrawer';

export default function BurgerButton() {
  const { toggleDrawer } = useDrawer();
  return (
    <button type='button' className='lg:hidden' onClick={toggleDrawer}>
      <MenuIcon
        height={25}
        width={25}
        className='text-slate-400 hover:text-white transition-colors duration-300'
      />
    </button>
  );
}
