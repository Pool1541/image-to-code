import { Copy } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useConfig from '@/hooks/useConfig';
import { useState } from 'react';

export function ApiKeyDialog() {
  const { setUserApiKey } = useConfig();
  const [value, setValue] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUserApiKey(value);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className='w-full mb-5'>
          Agregar api key
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>OpenAi api key</DialogTitle>
          <DialogDescription>Tu api key no se guardará en ningún lado.</DialogDescription>
        </DialogHeader>
        <form className='flex items-center space-x-2' id='apikeyform' onSubmit={handleSubmit}>
          <div className='grid flex-1 gap-2'>
            <Label htmlFor='link' className='sr-only'>
              Link
            </Label>
            <Input id='link' type='password' onChange={handleChange} value={value} />
          </div>
        </form>
        <DialogFooter className='sm:justify-start'>
          <DialogClose asChild>
            <Button type='submit' variant='secondary' form='apikeyform'>
              Guardar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
