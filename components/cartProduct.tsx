
export default async function CartComponent(){
    const cart_items=await fetch('https://fake-ecommerce-app-api.onrender.com/carts').then((res)=>res.json())
    console.log("cart",cart_items)
    return (
        <div className="grid grid-cols-3 gap-4">
            <>
            {cart_items.map((item)=>(
                <div className="border-2 border-black p-4">
                    <h2 className="text-bold text-black-500">Product Id:{item.id}</h2>
                    <p>User:{item.userId}</p>
                    <p>Quantity:{item.quantity}</p>
                    <p>Product Id:{item.productId}</p>
                    <span>Order on:{item.date}</span>
                </div>
            ))}
            </>
        </div>
    )
}