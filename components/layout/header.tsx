import BurgerButton from '../home/burger-button';
import Navbar from './navbar';

export default function Header() {
  return (
    <header className='flex justify-between items-middle pb-5'>
      <h2 className='hidden lg:block'>Dashboard</h2>
      <BurgerButton />
      <nav>
        <Navbar />
      </nav>
    </header>
  );
}
