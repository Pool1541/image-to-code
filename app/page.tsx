'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { DragAndDrop } from './draganddrop';
import { Output, OutputType } from '@/types/output.type';
import { toBase64 } from '@/lib/utils';
import CodeDisplay from './code-display';
import Aside from '@/components/layout/aside';
import Loader from '@/components/ui/loader';
import Form from './form';

const STEPS = {
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  PREVIEW: 'PREVIEW',
  ERROR: 'ERROR',
};

async function* streamReader(res: Response) {
  const reader = res.body?.getReader();
  const decoder = new TextDecoder();
  if (reader == null) return;

  while (true) {
    const { done, value } = await reader.read();
    const chunk = decoder.decode(value);
    yield chunk;
    if (done) break;
  }
}

export default function Home() {
  const [result, setResult] = useState('');
  const [step, setStep] = useState(STEPS.INITIAL);
  const [stack, setStack] = useState<OutputType>(Output.html_tailwind);

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
    await transformToCode(JSON.stringify({ img, stack }));
  }

  async function transformUrlToCode(url: string) {
    await transformToCode(JSON.stringify({ url, stack }));
  }

  const [background, ...rest] = result.split('|||');
  const html = rest.pop() || '';

  return (
    <div className='grid lg:grid-cols-[350px_1fr]'>
      <Aside handleChange={(value: OutputType) => setStack(value)} />
      <main className='bg-gray-950'>
        <section className='max-w-7xl w-full min-h-screen mx-auto p-10 flex justify-center'>
          {step === STEPS.LOADING && <Loader />}
          {step === STEPS.INITIAL && (
            <div className='flex flex-col gap-4 w-full'>
              <DragAndDrop tranformImageToCode={tranformImageToCode} />
              <Form transformUrlToCode={transformUrlToCode} />
            </div>
          )}
          {step === STEPS.PREVIEW && (
            <div className='rounded flex flex-col gap-4'>
              <div
                className='w-full h-full border rounded-4 border-gray-700  aspect-video'
                style={{ backgroundColor: `#${background ? background : 'fff'}` }}>
                <iframe srcDoc={html} className='w-full h-[832px]' />
              </div>
              <CodeDisplay>{html}</CodeDisplay>
            </div>
          )}
          {step === STEPS.ERROR && <Loader />}
        </section>
      </main>
    </div>
  );
}
