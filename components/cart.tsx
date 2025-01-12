'use client'
import Link from "next/link"
import Image from "next/image"
import { useAppSelector } from "@/redux/libs/hooks"
import { RootState } from "@/redux/libs/store"
import { useEffect } from "react"
export default function Cart(){
    
    const cart_items=useAppSelector((state:RootState)=>state.cart.items)
    return(
        <div>
            <Link href="/cart" className='flex items-center justify-center'>
            <Image src={'/cart.png'} alt={'Shopping cart'} width={40} height={40}/>
            <p className='text-white border rounded-full'>{cart_items.length}</p>
          </Link>
        </div>
    )
}