import Link from 'next/link';
import Cart from './cart';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl">Website</h1>
        <div className="flex space-x-4 items-center">
            <Cart/>
          <Link href="/" className='border border-transparent hover:border-white rounded-full px-2 items-center'>
            <p className='text-bold text-white'>Login</p>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;