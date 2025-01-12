
export default async function postDetailPage({params}:{params:Promise<{id:string}>}){
    const productId=(await params).id
    console.log(productId)
    const product=await fetch(`https://fake-ecommerce-app-api.onrender.com/products/${productId}`).then((res)=>res.json())
    console.log(product)
    return(
        <div className="ml-4 space-y-4">  
            <h2 className="p-2 border-b-2 border-gray-400">Post Detail Page for {productId}</h2>
            <h2 className="text-bold text-2xl">{product.title}</h2>
            <p className="text-gray-500">{product.description}</p>
            <p>Price:{product.price}</p>
            <p>Ratings:{product.rating}</p>
            <p>Category:{product.category}</p>
     </div>
    )
}