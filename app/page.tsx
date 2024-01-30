import Aside from '@/components/layout/aside';
import MainContent from '../components/home/main-content';
import FeedbackForm from '@/components/home/feedback-form';
import Header from '@/components/layout/header';

export default function Home() {
  return (
    <>
      <div className='lg:grid grid-cols-[350px_1fr]'>
        <Aside />
        <main className='bg-gray-950 p-2 md:px-10 md:pt-10 md:pb-4 min-h-screen'>
          <Header />
          <MainContent />
        </main>
      </div>
      <FeedbackForm />
    </>
  );
}
