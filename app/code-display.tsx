'use client';

import { ClipboardIcon } from '@/components/icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { toast } from 'sonner';

interface CodeDisplayProps {
  children: string;
}

export default function CodeDisplay({ children }: CodeDisplayProps) {
  async function handleClick() {
    const pre = document.getElementsByTagName('code')[0];
    const code = pre.innerText;

    if (code) {
      await navigator.clipboard.writeText(code);
      // toast success
      return toast.success('Código copiado al portapapeles');
    }

    //toast error
    toast.error('No hay nada que copiar');
  }

  return (
    <div className='rounded-lg border-2 border-gray-400'>
      <div className='flex justify-between items-center px-2.5 py-1 bg-neutral-700 rounded-md rounded-b-none'>
        <p></p>
        <button
          className='flex items-center gap-2 p-2 hover:text-gray-300 transition-colors'
          onClick={handleClick}>
          <ClipboardIcon /> Copiar código
        </button>
      </div>
      <SyntaxHighlighter
        language='javascript'
        style={theme}
        wrapLongLines
        className='max-w-full w-full mx-auto p-10 rounded-lg rounded-t-none'
        customStyle={{ margin: '0', overflow: 'hidden' }}>
        {children}
      </SyntaxHighlighter>
    </div>
  );
}
