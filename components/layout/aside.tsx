import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Output, OutputType } from '@/types/output.type';

interface AsideProps {
  handleChange: (value: OutputType) => void;
}

export default function Aside({ handleChange }: AsideProps) {
  return (
    <aside className='hidden lg:flex flex-col gap-10 sm:min-h-screen px-6 py-8 bg-gray-900'>
      <header className='text-center'>
        <h1 className='text-2xl font-semibold'>Image 2 code</h1>
        <h2 className='text-sm opacity-75 mt-2'>Crea componentes a partir de imágenes</h2>
      </header>
      <section>
        <label className='text-sm pl-1'>Selecciona el stack de salida :</label>
        <Select defaultValue={Output.html_tailwind} onValueChange={handleChange}>
          <SelectTrigger className='w-full mt-2'>
            <SelectValue placeholder='Selecciona' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={Output.html_tailwind}>Html + Tailwind</SelectItem>
            <SelectItem value={Output.react_tailwind}>React + Tailwind</SelectItem>
          </SelectContent>
        </Select>
      </section>

      {/* <footer>Desarrollado por Pool Llerena</footer> */}
    </aside>
  );
}
