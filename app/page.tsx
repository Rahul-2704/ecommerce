import Link from 'next/link'
import type { Metadata } from 'next'
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <>
        <h2>Ecommerce App</h2>
        <Link href={'/products'}>Go to Products</Link>
      </>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'E-commerce App',
  description: 'E-commerce Website',
}
