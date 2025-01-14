'use client';
import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/redux/libs/hooks";
import { RootState } from "@/redux/libs/store";
export default function Cart() {
  const cart_items = useAppSelector((state: RootState) => state.cart.items);
  // const cart_items=JSON.parse(localStorage.getItem('cartItems'))||[];
  console.log("cart_items header",cart_items)
  return (
    <div className="relative">
      <Link href="/cart" className="flex items-center justify-center">
        <Image
          src="/cart.png"
          alt="Shopping cart"
          width={40}
          height={40}
          className="hover:scale-110 transition-transform duration-200"
        />

        {cart_items.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center translate-x-1/2 -translate-y-1/2">
            {cart_items.length}
          </span>
        )}
      </Link>
    </div>
  );
}
