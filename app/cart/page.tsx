import CartComponent from "@/components/cartProduct"
import StoreProvider from "@/redux/store/storeProvider"
import { PersistGate } from "redux-persist/integration/react"


export default async function Cart(){
  
    return(
        <div className="space-y-4">

            <div className="border-b-2 border-gray-400 p-2 ml-2">
                <h2 className="p-2">Cart Details Page</h2>
            </div>
            <div className="p-2 ml-2">
                <CartComponent/> 
            </div>
           
        </div>
    )
}