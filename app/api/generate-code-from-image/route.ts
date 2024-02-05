import { Output } from '@/types/output.type';
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { readFileSync } from 'fs';
import { StreamingTextResponse } from 'ai';

const USER_PROMPT = 'Generate code for a web component that looks exactly like this';
const HTML_SYSTEM_PROMPT = `You are an expert at replicating responsive web user interfaces from an image.
First identify each of the elements in the image, then define what type of element it is and the styles it has, finally write the component code with all the elements you identified respecting the following rules.

- use the correct colors in each element.
- Do not use icons from other sources, use icons only from the fontawesome library, as in the following example:
  <i class="fa-brands fa-apple"></i>
- Make sure the app looks exactly like the screenshot.
- Pay close attention to background color, text color, font size, font family, 
padding, margin, border, etc. Match the colors and sizes exactly.
- Use the exact text from the screenshot.
- Do not add comments in the code such as "<!-- Add other navigation links as needed -->" and "<!-- ... other news items ... -->" in place of writing the full code. WRITE THE FULL CODE.
- Repeat elements as needed to match the screenshot. For example, if there are 15 items, the code should have 15 items. DO NOT LEAVE comments like "<!-- Repeat for each news item -->" or bad things will happen.
- For images, use placeholder images from https://placehold.co and include a detailed description of the image in the alt text so that an image generation AI can generate the image later.

In terms of libraries,

- Use this script to include Tailwind: <script src="https://cdn.tailwindcss.com"></script>
- You can use Google Fonts
- Font Awesome for icons: <script src="https://kit.fontawesome.com/3feef57c63.js" crossorigin="anonymous"></script>

Return first the background hexadecimals, put a ||| separator, and then all the code.
Do not include markdown "\`\`\`" or "\`\`\`html" at the start or end.
Make sure you have the correct code.
`;

const REACT_SYSTEM_PROMPT = `You are an expert in designing user interfaces with React and Tailwindcss
You take screenshots of a reference web component from the user, and then build the web component using Tailwind, HTML and JavaScript.

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

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

async function setApiKey({
  freeTrialFromDB,
  userApiKey,
}: {
  freeTrialFromDB: any;
  userApiKey: string;
}) {
  // Si el free-trial no está activo pero si hay una apikey del usuario, se retorna la api key del usuario
  if (!freeTrialFromDB && userApiKey) return userApiKey;
  // Si el free-trial no está activo y no hay apikey del usuario, se lanza un error
  if (!freeTrialFromDB && !userApiKey) {
    throw new Error(
      `La prueba gratis finalizó.
      Puedes ingresar una api key de openai en la configuración para seguir usando la app.`
    );
  }
  // Si el free-trial está activo se retorna la apikey de la aplicación.
  return process.env.OPENAI_API_KEY || '';
}

function setInlineData(path: any, mimeType = 'image/png') {
  const data = path.split(',')[1];
  return {
    inlineData: {
      data,
      mimeType,
    },
  };
}

const generationConfig = {
  stopSequences: [],
  maxOutputTokens: 4096,
  temperature: 0.1,
};

function iteratorToStream(iterator: any) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();

      if (done) {
        controller.close();
      } else {
        controller.enqueue(value.text());
      }
    },
  });
}

export async function POST(req: Request) {
  const { url, img, stack, uid, userApiKey } = await req.json();

  const SYSTEM_PROMPT = stack === Output.html_tailwind ? HTML_SYSTEM_PROMPT : REACT_SYSTEM_PROMPT;
  const imageUrl = url ?? img;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision', generationConfig });
    const imageParts = [setInlineData(imageUrl)];

    const result = await model.generateContentStream([SYSTEM_PROMPT, ...imageParts]);
    const stream = iteratorToStream(result.stream);

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      const errorResponse = {
        message: error.message,
      };
      return NextResponse.json(errorResponse, { status: 401 });
    }
  }
}
