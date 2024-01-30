import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import Providers from '@/components/layout/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Image to component',
  description:
    'Impulsa tu desarrollo web con nuestra innovadora aplicación que combina la potencia de la inteligencia artificial y las tecnologías líderes en la creación de interfaces. Con nuestro Generador de Componentes, simplemente carga una imagen y deja que la inteligencia artificial haga el trabajo pesado. Transforma automáticamente tu diseño visual en código HTML optimizado o componentes React, todo ello integrado con el popular framework de diseño Tailwind CSS.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${inter.className} dark`}>
        <Toaster richColors duration={3000} position='top-right' />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
