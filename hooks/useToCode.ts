/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import useStack from './useStack';
import { streamReader, toBase64 } from '@/lib/utils';
import { toast } from 'sonner';
import { STEPS } from '@/constants/steps';
import { useSession } from 'next-auth/react';
import useConfig from './useConfig';
import ToastError from '@/components/home/toast-error';

export function useToCode() {
  const [completed, setCompleted] = useState(false);
  const [background, setBackground] = useState('');
  const { data } = useSession();
  const [result, setResult] = useState('');
  const [step, setStep] = useState(STEPS.INITIAL);
  const { stack } = useStack();
  const { userApiKey } = useConfig();

  function restart() {
    setStep(STEPS.INITIAL);
    setCompleted(false);
    setBackground('');
  }

  async function transformToCode(body: string) {
    try {
      setStep(STEPS.LOADING);
      const res = await fetch('/api/generate-code-from-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      if (!res.ok || res.body === null) {
        setStep(STEPS.ERROR);
        const error = await res.json();
        throw new Error(error.message);
      }

      setStep(STEPS.PREVIEW);

      // leer el streaming de datos
      for await (const chunk of streamReader(res)) {
        setResult((prev) => prev + chunk);
      }

      setCompleted(true);
    } catch (error) {
      if (error instanceof Error)
        toast.error(ToastError({ message: error.message }), { duration: 7000 });
    }
  }

  async function tranformImageToCode(file: File) {
    const img = await toBase64(file);
    let uid;
    if (data?.user && 'id' in data.user) {
      uid = data.user.id;
    }

    await transformToCode(JSON.stringify({ img, stack, uid, userApiKey }));
  }

  async function transformUrlToCode(url: string) {
    let uid;
    if (data?.user && 'id' in data.user) {
      uid = data.user.id;
    }
    await transformToCode(JSON.stringify({ url, stack, uid, userApiKey }));
  }

  const [bg, ...rest] = result.split('|||');

  const html = rest.pop() || '';

  useEffect(() => {
    if (!background && bg.length >= 7) {
      setBackground(bg.trim());
    }
  }, [bg]);

  return { step, background, html, completed, tranformImageToCode, transformUrlToCode, restart };
}
