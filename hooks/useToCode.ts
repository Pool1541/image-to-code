import { useState } from 'react';
import useStack from './useStack';
import { streamReader, toBase64 } from '@/lib/utils';
import { toast } from 'sonner';
import { STEPS } from '@/constants/steps';
import { useSession } from 'next-auth/react';
import useConfig from './useConfig';

export function useToCode() {
  const { data } = useSession();
  const [result, setResult] = useState('');
  const [step, setStep] = useState(STEPS.INITIAL);
  const { stack } = useStack();
  const { userApiKey } = useConfig();

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
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
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

  const [background, ...rest] = result.split('|||');
  const html = rest.pop() || '';

  return { step, background, html, tranformImageToCode, transformUrlToCode };
}
