import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  title: string;
  description: string;
  price: number;
  category:string;
  quantity:number
}
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
interface CartState {
  items: CartItem[];
  // totalPrice: number;
}

const initialState: CartState = {
  items:[]
  // totalPrice: 0,
};

const updateLocalStorage = (items: CartItem[]) => {
  localStorage.setItem('cartItems', JSON.stringify(items));
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<{ item: Product; quantity: number }>) => {
      const { item, quantity } = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...item, quantity });
      }
      updateLocalStorage(state.items)
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const itemId = parseInt(action.payload);
      const existingItem = state.items.find((i) => i.id === itemId);
      if (existingItem) {
        state.items = state.items.filter((i) => i.id !== itemId);
      }
      updateLocalStorage(state.items)
    },
    updateItemQuantity: (state, action: PayloadAction<{ itemId: string; quantity: number }>) => {
      const { itemId, quantity } = action.payload;
      const itemIdNumber=parseInt(itemId)
      const existingItem = state.items.find((i) => i.id === itemIdNumber);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
      updateLocalStorage(state.items)
    },
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addItemToCart, removeItemFromCart, updateItemQuantity,setCartItems } = cartSlice.actions;
export default cartSlice.reducer;