import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: []
};

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.cart.push(action.payload);
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload.id);
    },
    updateQty: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload.id);
      if (item) {
        item.qty = action.payload.qty;
      }
    },
  },
});

export const { addItem ,  removeItem ,updateQty } = navSlice.actions;


export const selectCart = (state) => state.nav.cart


export default navSlice.reducer