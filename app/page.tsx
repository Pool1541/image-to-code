import Aside from '@/components/layout/aside';
import Navbar from '@/components/layout/navbar';
import MainContent from '../components/home/main-content';
import { Button } from '@/components/ui/button';
import FeedbackForm from '@/components/home/feedback-form';

export default function Home() {
  return (
    <>
      <div className='lg:grid grid-cols-[350px_1fr]'>
        <Aside />
        <main className='bg-gray-950 p-2 md:p-10 min-h-screen'>
          <header className='flex justify-between items-middle pb-5'>
            <h2>Dashboard</h2>
            <nav>
              <Navbar />
            </nav>
          </header>
          <MainContent />
        </main>
      </div>
      <FeedbackForm />
    </>
  );
}
