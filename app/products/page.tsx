import ProductComponent from '@/components/product'
import StoreProvider from '@/redux/store/storeProvider'
import type { Metadata } from 'next'



export interface Product {
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
     
            <ProductComponent initialProducts={products}/>   

        
    )
}

export const metadata: Metadata = {
    title: 'Products',
    description: 'All Products Page',
  }
   
