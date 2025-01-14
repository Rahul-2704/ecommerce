
import SingleProduct from '@/components/singleProduct'
import type { Metadata} from 'next'

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

type Props = {
    params: Promise<{ id: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }

export default async function postDetailPage({params}:{params:Promise<{id:string}>}){
    const productId:string=(await params).id
    
    const product:Product=await fetch(`https://fake-ecommerce-app-api.onrender.com/products/${productId}`).then((res)=>res.json())
   
    return(  
        <>
            <SingleProduct product={product}/>
        </>
    )
}
  
  export async function generateMetadata(
    { params}: Props,
  ): Promise<Metadata> {
    
    const Id = (await params).id
    const product = await fetch(`https://fake-ecommerce-app-api.onrender.com/products/${Id}`).then((res) => res.json())
  
    return {
      title: product?.title,
      description: product?.description,
    }
  }