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

  console.log(userApiKey);

  /**
   * El usuario puede usar la aplicación con su prueba gratuita(5 veces) o con su propia api key.
   * Se debería enviar el uid si el usuario está autenticado o la apiKey si no lo está.
   * Si el usuario está autenticado, se debería enviar el uid y en el servidor se debería valida que el uid sea válido y que el usuario cuente con una prueba gratuita activa. Caso contrario se mostraría un error indicando que la prueba gratuita se terminó y para seguir usando la aplicación debería ingresar su api key.
   *
   * Si el usuario no está autenticado, se debería enviar la api key y en el servidor se debería validar que la api key sea válida, caso contrario se mostraría un error en pantalla solicitando que ingrese una api key válida.
   *
   * Si el usuario está autenticado e ingresa una api key, se validaría primero si tiene una prueba gratuita activa y se usaría la prueba gratuita en lugar de la api key. Si la prueba gratuita está terminada, se usaría la api key siempre y cuándo sea válida, caso contrario se mostraría un error solicitando una api key válida.
   *
   * Siempre se mostrará un botón que derive al usuario a un formulario para dejar feedback sobre la aplicación.
   */

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
