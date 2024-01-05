'use client';

import { useRef, useState } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

export default function FeedbackForm() {
  const { data } = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const [rating, setRating] = useState<number | null>(null);
  const [content, setContent] = useState<string>('');
  const [validationError, setValidationError] = useState<string>('');

  function resetValues() {
    setContent('');
    setRating(null);
    setValidationError('');
  }

  function handleRating(value: number) {
    setRating(value);
  }

  function handleContent(value: string) {
    setContent(value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let uid;

    if (data?.user && 'id' in data.user) {
      uid = data.user.id;
    }

    try {
      if (rating === null) return setValidationError('Por favor selecciona una calificación');

      if (content === '') return setValidationError('Por favor escribe un comentario');

      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating,
          content,
          uid,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setValidationError('');
        resetValues();

        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (rating === null || content === '') {
        setOpen(true);
      } else {
        setOpen(false);
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={(open) => (setOpen(open), resetValues())}>
      <DialogTrigger asChild>
        <Button className='fixed bottom-3 right-3 bg-amber-700 text-slate-100 hover:bg-amber-600'>
          <p className=''>¿Alguna sugerencia?</p>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='[text-align:center]'>
            ¿Cómo calificarías tu experiencia?
          </DialogTitle>
          {/* <DialogDescription className='pt-2'></DialogDescription> */}
        </DialogHeader>
        <form className='flex items-center space-x-2' id='feedback-form' onSubmit={handleSubmit}>
          <div className='grid flex-1 gap-2'>
            <Rating handleRating={handleRating} />
            <Label htmlFor='content' className='sr-only'>
              content
            </Label>
            <Textarea
              id='content'
              placeholder='Hablanos sobre tu experiencia'
              className='resize-none'
              onChange={(e) => handleContent(e.target.value)}
            />
          </div>
        </form>
        <DialogFooter className='sm:justify-start'>
          <Button type='submit' variant='secondary' form='feedback-form'>
            Enviar
          </Button>
          <div className='m-auto flex-1 flex justify-center'>
            <span className='text-sm text-red-500 text-left'>{validationError}</span>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Rating({ handleRating }: { handleRating: (value: number) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const index = Number(e.currentTarget.querySelector('svg')!.dataset.index);

    if (containerRef.current) {
      const svgsInButtons = containerRef.current.querySelectorAll('button svg');

      svgsInButtons.forEach((svg, currentIndex) => {
        if (currentIndex <= index) {
          svg.classList.remove('text-gray-300');
          svg.classList.add('text-yellow-300');
        } else {
          svg.classList.remove('text-yellow-300');
          svg.classList.add('text-gray-300');
        }
      });

      handleRating(index + 1);
    }
  }

  return (
    <div ref={containerRef} className='flex items-center justify-center gap-2 my-2'>
      <button type='button' onClick={handleClick}>
        <svg
          className='w-8 h-8 text-gray-300 ms-1'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          viewBox='0 0 22 20'
          data-index={'0'}>
          <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
        </svg>
      </button>
      <button type='button' onClick={handleClick}>
        <svg
          className='w-8 h-8 text-gray-300 ms-1'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          viewBox='0 0 22 20'
          data-index={'1'}>
          <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
        </svg>
      </button>
      <button type='button' onClick={handleClick}>
        <svg
          className='w-8 h-8 text-gray-300 ms-1'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          viewBox='0 0 22 20'
          data-index={'2'}>
          <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
        </svg>
      </button>
      <button type='button' onClick={handleClick}>
        <svg
          className='w-8 h-8 text-gray-300 ms-1'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          viewBox='0 0 22 20'
          data-index={'3'}>
          <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
        </svg>
      </button>
      <button type='button' onClick={handleClick}>
        <svg
          className='w-8 h-8 ms-1 text-gray-300'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          viewBox='0 0 22 20'
          data-index={'4'}>
          <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
        </svg>
      </button>
    </div>
  );
}
