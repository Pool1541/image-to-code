import { ConfigContext } from '@/contexts/config-context';
import { useContext } from 'react';

export default function useConfig() {
  return useContext(ConfigContext);
}
