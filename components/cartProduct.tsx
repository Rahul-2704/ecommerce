'use client'
import React from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/libs/hooks';
import { removeItemFromCart, updateItemQuantity,setCartItems } from '@/redux/cartSlice';
import QuantitySelector from './QuantitySelector';
import { useEffect } from 'react';


export default function CartComponent() {
  const dispatch = useAppDispatch();
  const cart_items = useAppSelector((state) => state.cart.items);
  const totalPrice=cart_items.reduce((acc:number,item)=>acc+item.price*item.quantity,0);

  const handleRemoveItem = (id: string) => {
    dispatch(removeItemFromCart(id));
  };

  const handleQuantityChange = (itemId: string, quantity: number) => {
    dispatch(updateItemQuantity({ itemId, quantity }));
  };

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      dispatch(setCartItems(JSON.parse(storedCartItems)));
    }
  }, [dispatch]);
  return (
    <div className="flex p-4 space-x-4 p-4">
      {/* Left side: Cart items */}
      <div className="w-1/2 h-[350px] overflow-y-auto pr-4">
        {cart_items.length > 0 ? (
          <div className="grid grid-cols-1 p-2 space-y-4">
            {cart_items.map((item) => (
              <div
                key={item.id}
                className="border border-gray-300 rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-lg font-semibold text-gray-800 truncate">{item.title}</h2>
                <p className="text-sm text-gray-600">Product Id: {item.id}</p>
                <p className="text-gray-700 line-clamp-3 mb-2">{item.description}</p>
                <p className="text-sm text-gray-600">Price: ${item.price}</p>
                <p className="text-sm text-gray-600">Category: {item.category}</p>
                <p className="text-sm text-gray-600 mb-2">Quantity: {item.quantity}</p>
                <QuantitySelector
                  initialQuantity={item.quantity}
                  onChange={(quantity) => handleQuantityChange(item.id.toString(), quantity)}
                />
                <button
                  onClick={() => handleRemoveItem(item.id.toString())}
                  className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      {/* Right side: Total price */}
      <div className="w-1/2 p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className='text-bold text-black text-2xl'>Order Summary</h2>
        <input type='text' placeholder='Enter coupon code here' className='text-gray-500 items-center p-2 w-full mt-2 border border-black-500 rounded-md'/>
        <div className='flex justify-between mt-2'>
          <p>subtotal</p>
          <p>${totalPrice}</p>
        </div>
        <div className='flex justify-between mt-2'>
          <p>shipping</p>
          <p className='text-gray-500'>calculated at next step</p>
        </div>

        {/* for border */}
        <div className='border border-black mt-3'></div>

        {/* for total costing */}
        <div className='flex mt-2 justify-between p-2'>
          <h2 className='text-bold'>Total</h2>
          <p>${totalPrice}</p>
        </div>

        {/* for checkout button */}
        <button className='text-white bg-black items-center w-full mt-4 p-2'>Continue to Checkout</button>
      </div>
    </div>
  );
}