import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  user:{}
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
    addItemUserDetails: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {addItem, removeItem, updateQty,addItemUserDetails} = navSlice.actions;

export const selectCart = state => state.nav.cart;

export const selectUser = state => state.nav.user;

export default navSlice.reducer;
