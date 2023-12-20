import { StackContext } from '@/contexts/stack-context';
import { useContext } from 'react';

export default function useStack() {
  return useContext(StackContext);
}
