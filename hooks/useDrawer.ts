import { DrawerContext } from '@/contexts/drawer-context';
import { useContext } from 'react';

export default function useDrawer() {
  return useContext(DrawerContext);
}
