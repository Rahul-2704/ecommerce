import CartComponent from "@/components/cartProduct"
import { Metadata } from "next"

export default async function Cart(){
  
    return(
        <div className="space-y-4">

            <div className="border-b-2 border-gray-400 p-2">
                <h1 className="text-3xl font-bold text-center mb-3">Your Shopping Cart</h1>
            </div>
            <div className="p-2 ml-2">
                <CartComponent/> 
            </div>
           
        </div>
    )
}

export const metadata: Metadata = {
    title: 'Cart',
    description: 'Cart Items Page',
  }
   