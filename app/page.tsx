import Aside from '@/components/layout/aside';
import Navbar from '@/components/layout/navbar';
import MainContent from './main-content';

export default function Home() {
  return (
    <div className='grid lg:grid-cols-[350px_1fr]'>
      <Aside />
      <main className='bg-gray-950 p-10'>
        <header className='flex justify-between items-middle pb-5'>
          <h2>Dashboard</h2>
          <nav>
            <Navbar />
          </nav>
        </header>
        <MainContent />
      </main>
    </div>
  );
}
