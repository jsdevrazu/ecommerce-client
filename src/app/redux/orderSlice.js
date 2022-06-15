import { createSlice } from "@reduxjs/toolkit";

//initialState define here
const initialState = {
  order: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, { payload }) => {
      return {
        order:[...state.order, payload?.order]
      };
    },
  },
});

//Reducer Action
export const { setOrder } = orderSlice.actions;

export default orderSlice.reducer;
