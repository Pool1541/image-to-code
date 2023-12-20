'use client';

import Loader from '@/components/ui/loader';
import { useToCode } from '@/hooks/useToCode';
import { DragAndDrop } from './draganddrop';
import Form from './form';
import CodeDisplay from './code-display';

export default function MainContent() {
  const { STEPS, background, html, step, tranformImageToCode, transformUrlToCode } = useToCode();
  return (
    <section className='max-w-7xl w-full min-h-screen mx-auto mt-10 flex justify-center'>
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
  );
}
