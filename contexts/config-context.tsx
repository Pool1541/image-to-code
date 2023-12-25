'use client';

import { createContext, useState } from 'react';

export const ConfigContext = createContext<{
  userApiKey: string;
  setUserApiKey: React.Dispatch<React.SetStateAction<string>>;
}>({
  userApiKey: '',
  setUserApiKey: () => {},
});

export default function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [userApiKey, setUserApiKey] = useState<string>('');

  return (
    <ConfigContext.Provider value={{ userApiKey, setUserApiKey }}>
      {children}
    </ConfigContext.Provider>
  );
}
