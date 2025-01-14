'use client'
import { addItemToCart } from '@/redux/cartSlice'
import { useAppDispatch } from '@/redux/libs/hooks'
import type { Metadata} from 'next'
import Image from 'next/image'
import QuantitySelector from './QuantitySelector'
import { useState } from 'react'  
import { notFound } from 'next/navigation'
export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    category: string;
    image: string;
    __v: number;
  }

export default function SingleProduct({product}:{product:Product}){
    const dispatch=useAppDispatch()
    if (!product) {
      notFound();
    }
    const productId=product.id
    console.log("single page",productId)
    console.log("single page",product)
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (newQuantity: number) => {
      setQuantity(newQuantity);
    };
    return(  
        <div className='flex space-x-4'>

            {/* left part image */}
            <div className='w-[500px] h-[500px] relative'>
                <Image src={product.image} alt={product.title} fill className='p-4'/>
            </div>

            {/* right part product name and description and add to cart button */}
            <div>
                <div className='p-4'>
                    <h1 className='text-bold text-4xl '>{product.title}</h1>
                    <p className='mt-2 text-gray-500'>{product.description}</p>
                    <p className='mt-2'>Price:{product.price}</p>
                    <p>Category:{product.category}</p>
                </div>
                <div className='flex space-x-4 mt-[200px]'>
                    <QuantitySelector initialQuantity={1} onChange={handleQuantityChange}/>
                    <button onClick={()=>{
                      console.log("clicked button")
                      dispatch(addItemToCart({item:product,quantity:quantity}))}} className="bg-blue-500 text-white px-4 py-2 rounded">Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

type Props = {
    params: Promise<{ id: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }
   
  export async function generateMetadata(
    { params}: Props,
  ): Promise<Metadata> {
    
    const Id = (await params).id
   
    
    const product = await fetch(`https://fake-ecommerce-app-api.onrender.com/products/${Id}`).then((res) => res.json())
   
   
    return {
      title: product.title,
      description: product.description,
    }
  }