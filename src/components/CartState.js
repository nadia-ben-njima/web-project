import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], 
  favorites: [], 
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if item already exists
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); // Add new item with quantity 1
      }
    },
    removeItemFromCart(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload); 
    },
    toggleFavorite(state, action) {
      const product = action.payload;
      const existingIndex = state.favorites.findIndex(item => item.id === product.id);

      if (existingIndex >= 0) {
        state.favorites.splice(existingIndex, 1); // Remove from favorites
      } else {
        state.favorites.push(product); // Add to favorites
      }
    },
    updateItemQuantity(state, action){
      const{id,newQuantity}=action.payload;
      const existingItem=state.items.find(item=>item.id===id);
      if (existingItem){
        existingItem.quantity=newQuantity;
      }
    }
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;