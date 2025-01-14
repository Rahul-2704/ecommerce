import Product from '@/components/product'
import type { Metadata } from 'next'
import { Suspense } from 'react'

interface Product {
    id: number
    title: string
    description: string
    price: number
    rating: number
    category: string
    image: string
    __v: number
  }

export default async function Products() {

    const response=await fetch('https://fake-ecommerce-app-api.onrender.com/products?limit=10&page=1')
    const data=await response.json()
    const products=data.products
    return(
      <Suspense fallback={<div>Loading...</div>}>
            <Product initialProducts={products}/> 
      </Suspense>          
    )
}

export const metadata: Metadata = {
    title: 'Products',
    description: 'All Products Page',
  }
   
