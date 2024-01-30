'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useStack from '@/hooks/useStack';
import useDrawer from '@/hooks/useDrawer';
import { Output, OutputType } from '@/types/output.type';
import { ApiKeyDialog } from '../home/api-key-dialog';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Xicon } from '../icons';

export default function Aside() {
  const { setStack } = useStack();
  const { animation, toggleDrawer } = useDrawer();

  return (
    <aside
      className={twMerge(
        clsx(
          'fixed w-full translate-x-full lg:static lg:translate-x-0 flex flex-col gap-10 min-h-screen px-6 py-8 bg-gray-900 z-50',
          {
            '': !animation,
            'animate-fade-right': animation === 'fade-in',
            'animate-fade-left': animation === 'fade-out',
          }
        )
      )}>
      <header className='text-center relative mt-8 pb-5 border-b-2 lg:mt-0 '>
        <button onClick={toggleDrawer} className='absolute top-[-3rem] right-[-0.5rem] lg:hidden'>
          <Xicon
            height={30}
            width={30}
            className='text-slate-400 hover:text-white transition-colors duration-300'
          />
        </button>
        <h1 className='text-2xl font-semibold'>Image to component</h1>
        <h2 className='text-sm opacity-75 mt-2'>Crea componentes a partir de imágenes</h2>
      </header>
      <section>
        <ApiKeyDialog />
        <div>
          <label className='text-sm pl-1'>Selecciona el stack de salida :</label>
          <Select
            defaultValue={Output.html_tailwind}
            onValueChange={(value) => setStack(value as OutputType)}>
            <SelectTrigger className='w-full mt-2'>
              <SelectValue placeholder='Selecciona' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Output.html_tailwind}>Html + Tailwind</SelectItem>
              <SelectItem value={Output.react_tailwind}>React + Tailwind</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* <footer>Desarrollado por Pool Llerena</footer> */}
    </aside>
  );
}
