import { createSlice } from "@reduxjs/toolkit";

//initialState define here
const initialState = {
  product: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProduct: (state, { payload }) => {
      return {
        ...state,
        message: payload?.message,
        productCount: payload?.productCount,
        result: payload?.result,
      };
    },
  },
});

//Reducer Action
export const { getProduct } = productSlice.actions;

export default productSlice.reducer;
