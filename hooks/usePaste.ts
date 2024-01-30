import { useEffect } from 'react';

interface onPasteProps {
  onPaste: (callback: any) => void;
}

export default function usePaste({ onPaste }: onPasteProps) {
  useEffect(() => {
    document.addEventListener('paste', onPaste);

    return () => {
      document.removeEventListener('paste', onPaste);
    };
  });
}
