'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { getFileFromClipboard } from '@/lib/utils';
import { DragAndDrop } from './draganddrop';
import { useToCode } from '@/hooks/useToCode';
import { Button } from '../ui/button';
import { STEPS } from '@/constants/steps';
import CodeDisplay from './code-display';
import usePaste from '@/hooks/usePaste';
import Loader from '@/components/ui/loader';
import Form from './form';

export default function MainContent() {
  const { background, html, step, completed, tranformImageToCode, transformUrlToCode, restart } =
    useToCode();
  usePaste({ onPaste: () => getFileFromClipboard(tranformImageToCode) });

  return (
    <section className='max-w-7xl w-full mx-auto mt-0 flex justify-center min-h-[calc(100dvh-140px)]'>
      {step === STEPS.LOADING && (
        <Loader className='h-full flex justify-center items-center self-center ' />
      )}
      {step === STEPS.INITIAL && (
        <div className='flex flex-col gap-4 w-full'>
          <DragAndDrop tranformImageToCode={tranformImageToCode} />
          <Form transformUrlToCode={transformUrlToCode} />
        </div>
      )}
      {step === STEPS.PREVIEW && (
        <Tabs defaultValue='desktop' className='w-full'>
          {completed && (
            <Button
              className='static w-full mb-2 sm:absolute sm:w-auto sm:mb-2 bg-gray-900 text-accent-foreground hover:bg-accent'
              onClick={restart}>
              Reiniciar
            </Button>
          )}

          <TabsList className='grid w-full sm:w-[400px] grid-cols-3 ml-auto'>
            <TabsTrigger value='desktop'>Desktop</TabsTrigger>
            <TabsTrigger value='mobile'>Mobile</TabsTrigger>
            <TabsTrigger value='code'>Code</TabsTrigger>
          </TabsList>
          <TabsContent value='desktop' className='w-full'>
            <div className='flex flex-col gap-4 w-full'>
              <div
                className='w-full h-full border-2 rounded-md border-black m-auto overflow-hidden'
                style={{ backgroundColor: `#${background ? background : 'fff'}` }}>
                <iframe srcDoc={html} className={`w-full h-[768px]`} style={{ width: '100%' }} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value='mobile' className='w-full'>
            <div className='flex flex-col gap-4 w-full'>
              <div
                className='w-full sm:w-96 h-full border-2 rounded-md border-black m-auto overflow-hidden'
                style={{ backgroundColor: `#${background ? background : 'fff'}` }}>
                <iframe srcDoc={html} className={`w-full sm:w-96 h-[768px]`} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value='code' className='w-full'>
            <CodeDisplay>{html}</CodeDisplay>
          </TabsContent>
        </Tabs>
      )}
      {step === STEPS.ERROR && (
        <div className='flex flex-col gap-4 w-full'>
          <DragAndDrop tranformImageToCode={tranformImageToCode} />
          <Form transformUrlToCode={transformUrlToCode} />
        </div>
      )}
    </section>
  );
}
