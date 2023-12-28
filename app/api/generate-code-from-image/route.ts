import OpenAI, { APIError } from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { Output } from '@/types/output.type';
import { NextResponse } from 'next/server';
import { OPENAI_ERRORS } from '@/lib/openai-errors';
import { FreeTrial } from '@/repository';

const USER_PROMPT = 'Generate code for a web page that looks exactly like  this';
const HTML_SYSTEM_PROMPT = `You are an expert in designing user interfaces with html and Tailwindcss
You take screenshots of a reference web page from the user, and then build single page apps 
using Tailwind, HTML and JS.

- Make sure the app looks exactly like the screenshot.
- Pay close attention to background color, background color of each component, text color, font size, font family, font weight, line height,
padding, margin, border, border radius, box shadow, etc. Match the colors and sizes exactly.
- Make sure each component is exactly the same as the components in the image.
- Make sure you make responsive design so it looks good on different screen sizes.
- Make sure the background, text, and icon colors and fill are correct.
- Make sure the text is exactly the same as the image.
- Make sure the spacing between elements is correct.
- Make sure the text is also responsive and adaptable to different screen sizes.
- Do not add comments in the code such as "<!-- Add other navigation links as needed -->" and "<!-- ... other news items ... -->" in place of writing the full code. WRITE THE FULL CODE.
- You are also an expert at counting repeated elements in the interface and replicating them, carefully count the number of repeated elements such as cards and write them all in the code to make sure the result is correct.
- For images, use placeholder images from https://placehold.co and include a detailed description of the image in the alt text so that an image generation AI can generate the image later.

In terms of libraries,
- Use this script to include Tailwind: <script src="https://cdn.tailwindcss.com"></script>
- You can use Google Fonts
- Font Awesome 6 for icons: <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

Return first the background hexadecimals, put a ||| separator, and then all the code.
Do not include markdown "\`\`\`" or "\`\`\`html" at the start or end.
Make sure you have the correct code.`;

const REACT_SYSTEM_PROMPT = `You are an expert in designing user interfaces with html and Tailwindcss
You take screenshots of a reference web page from the user, and then build single page apps 
using React and Tailwind CSS.

- Make sure the app looks exactly like the screenshot.
- Pay close attention to background color, background color of each component, text color, font size, font family, font weight, line height,
padding, margin, border, border radius, box shadow, etc. Match the colors and sizes exactly.
- Make sure each component is exactly the same as the components in the image.
- Make sure you make responsive design so it looks good on different screen sizes.
- Make sure the background, text, and icon colors and fill are correct.
- Make sure the text is exactly the same as the image.
- Make sure the spacing between elements is correct.
- Make sure the text is also responsive and adaptable to different screen sizes.
- Do not add comments in the code such as "<!-- Add other navigation links as needed -->" and "<!-- ... other news items ... -->" in place of writing the full code. WRITE THE FULL CODE.
- You are also an expert at counting repeated elements in the interface and replicating them, carefully count the number of repeated elements such as cards and write them all in the code to make sure the result is correct.
- For images, use placeholder images from https://placehold.co and include a detailed description of the image in the alt text so that an image generation AI can generate the image later.

In terms of libraries,

- Use these script to include React so that it can run on a standalone page:
    <script src="https://unpkg.com/react/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.js"></script>
- Use this script to include Tailwind: <script src="https://cdn.tailwindcss.com"></script>
- You can use Google Fonts
- Font Awesome 6 for icons: <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

Return first the background hexadecimals, put a ||| separator, and then all the code.
Do not include markdown "\`\`\`" or "\`\`\`html" at the start or end.
Make sure you have the correct code.`;

const openai = new OpenAI();

// export const runtime = 'edge';

async function setApiKey({ uid, userApiKey }: { uid: string; userApiKey: string }) {
  // Si no existe el uid pero si la apikey del usuario se retorna la apikey del usuario
  if (!uid && userApiKey) return userApiKey;
  if (!uid && !userApiKey) throw new Error('Inicia sesión o agrega un api key de openai iniciar.');
  // Se busca el free-trial del usuario (Solo si está activo)
  const freeFrialFromDB = await FreeTrial.findById(uid);
  // Si el free-trial no está activo pero si hay una apikey del usuario, se retorna la api key del usuario
  if (!freeFrialFromDB && userApiKey) return userApiKey;
  // Si el free-trial no está activo y no hay apikey del usuario, se lanza un error
  if (!freeFrialFromDB && !userApiKey) {
    throw new Error(
      `La prueba gratis finalizó.
      Puedes ingresar una api key de openai en la configuración para seguir usando la app.`
    );
  }
  // Si el free-trial está activo se retorna la apikey de la aplicación.
  return process.env.OPENAI_API_KEY || '';
}

export async function POST(req: Request) {
  const { url, img, stack, uid, userApiKey } = await req.json();

  const SYSTEM_PROMPT = stack === Output.html_tailwind ? HTML_SYSTEM_PROMPT : REACT_SYSTEM_PROMPT;
  const imageUrl = url ?? img;

  try {
    const apiKey = await setApiKey({ uid, userApiKey });
    openai.apiKey = apiKey;

    const response = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      stream: true,
      max_tokens: 4096,
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: USER_PROMPT,
            },
            {
              type: 'image_url',
              image_url: { url: imageUrl, detail: 'high' },
            },
          ],
        },
      ],
    });
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log(error);
    if (error instanceof APIError) {
      const { status } = error;
      const errorResponse = {
        message: OPENAI_ERRORS[status!],
      };
      return NextResponse.json(errorResponse, { status: status });
    }

    if (error instanceof Error) {
      const errorResponse = {
        message: error.message,
      };
      return NextResponse.json(errorResponse, { status: 401 });
    }
  }
}
