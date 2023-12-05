'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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

        transformUrlToCode(url.value);
      }}>
      <Label htmlFor='url'>Introduce la url de la imagen</Label>
      <Input name='url' id='url' type='url' placeholder='https://tu-screenshot/image.jpg' />
      <Button>Generar código de la imagen</Button>
    </form>
  );
}
