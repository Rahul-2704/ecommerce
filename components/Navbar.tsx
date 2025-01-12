import Link from 'next/link';
import Image from 'next/image';
import Cart from './cart';
import StoreProvider from '@/redux/store/storeProvider';
const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl">Website</h1>
        <div className="flex space-x-4 items-center">
            <Cart/>
          <Link href="">
            <p>Login</p>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;