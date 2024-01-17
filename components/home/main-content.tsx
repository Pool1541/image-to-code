/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import Loader from '@/components/ui/loader';
import { useToCode } from '@/hooks/useToCode';
import { DragAndDrop } from './draganddrop';
import Form from './form';
import CodeDisplay from './code-display';
import { STEPS } from '@/constants/steps';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { viewportStyles } from '@/constants/viewport';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export default function MainContent() {
  const { background, html, step, tranformImageToCode, transformUrlToCode } = useToCode();
  const [currentViewport, setCurrentViewport] = useState(viewportStyles.mobile);

  // const { data } = useSession();

  // useEffect(() => {
  //   async function getFreeTrial() {
  //     if (data?.user && 'id' in data.user) {
  //       const res = await fetch('/api/free-trial/' + data.user.id);
  //       const info = await res.json();
  //       console.log(info);
  //     }
  //   }

  //   getFreeTrial();
  // }, [data]);

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
          <TabsList className='grid w-full sm:w-[400px] grid-cols-3 ml-auto'>
            <TabsTrigger value='desktop'>Desktop</TabsTrigger>
            <TabsTrigger value='mobile'>Mobile</TabsTrigger>
            <TabsTrigger value='code'>Code</TabsTrigger>
          </TabsList>
          <TabsContent value='desktop' className='w-full'>
            <div className='flex flex-col gap-4 w-full'>
              <div
                className='w-full h-full border-2 rounded-md border-black m-auto'
                style={{ backgroundColor: `#${background ? background : 'fff'}` }}>
                <iframe srcDoc={html} className={`w-full h-[768px]`} style={{ width: '100%' }} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value='mobile' className='w-full'>
            <div className='flex flex-col gap-4 w-full'>
              <div
                className='w-full sm:w-96 h-full border-2 rounded-md border-black m-auto'
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
