'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { validateURL } from '@/lib/utils';
import { toast } from 'sonner';

interface FormProps {
  transformUrlToCode: (url: string) => void;
}

export default function Form({ transformUrlToCode }: FormProps) {
  return (
    <form
      className='flex flex-col gap-10'
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        const url = form.elements.namedItem('url') as HTMLInputElement;
        const isValidURL = validateURL(url.value);
        if (!isValidURL) return toast.error('Ingresa una url válida');
        transformUrlToCode(url.value);
      }}>
      <Label htmlFor='url'>Introduce la url de la imagen</Label>
      <Input name='url' id='url' type='text' placeholder='https://tu-screenshot/image.jpg' />
      <Button>Generar código de la imagen</Button>
    </form>
  );
}
