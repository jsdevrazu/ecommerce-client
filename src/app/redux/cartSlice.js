import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      state.items = payload;
    },
    removeToCart: (state, { payload }) => {
      const newCartItem = state.items.filter((itemId) => itemId?._id !== payload.id)
      state.items = newCartItem;
    },
  },
});

export const { addToCart, removeToCart } = cartSlice.actions;

export const selectItem = (state) => state.cart.items;
export const selectTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item?.price, 0);

export default cartSlice.reducer;
