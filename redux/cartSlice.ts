import { createSlice } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
  loading: boolean;
  error: string | null;
}

const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [] as CartItem[],
    totalPrice: 0,
  } as CartState,
  reducers: {
    addItemToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      state.totalPrice += item.price;
    },
    removeItemFromCart: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find((i) => i.id === itemId);
      if (existingItem) {
        state.totalPrice -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter((i) => i.id !== itemId);
      }
    },
    updateItemQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const existingItem = state.items.find((i) => i.id === itemId);
      if (existingItem) {
        state.totalPrice += (quantity - existingItem.quantity) * existingItem.price;
        existingItem.quantity = quantity;
      }
    },
  },
});

export const { addItemToCart, removeItemFromCart, updateItemQuantity } = CartSlice.actions;
export default CartSlice.reducer;