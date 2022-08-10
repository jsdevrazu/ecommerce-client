import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IProduct } from "../Types";

export interface BasketState {
  items: IProduct[];
}

const initialState: BasketState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addItem: (state: BasketState, action: PayloadAction<IProduct>) => {
      state.items = [...state.items, action.payload];
    },
    removeItem: (state: BasketState, action: PayloadAction<string>) => {
      state.items = state.items.filter((x) => x._id !== action.payload);
    },
    // Start Here increaseItemQuantity
    increaseItemQuantity: (
      state: BasketState,
      action: PayloadAction<string>
    ) => {
      state.items = state.items.map((item: any) => {
        if (item._id !== action.payload) return item;
        else if (item.quantity)
          return {
            ...item,
            quantity: item.quantity + 1,
          };
      });
    },
    // End Here increaseItemQuantity

    decreaseItemQuantity: (
      state: BasketState,
      action: PayloadAction<string>
    ) => {
      state.items = state.items
        .map((item: any) => {
          if (item._id !== action.payload) return item;
          if (item.quantity === 1) return false;
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        })
        .filter((x) => x !== false);
    },
    // End Here decreaseItemQuantity
  },
});

export const {
  addItem,
  removeItem,
  increaseItemQuantity,
  decreaseItemQuantity,
} = basketSlice.actions;

export const selectItems = (state: RootState) => state.cart.items;
export const selectTotalPrice = (state: RootState) =>
  state.cart.items.map((x) => x.price * x.quantity).reduce((a, b) => a + b, 0);
export const selectTotalCartItems = (state: RootState) =>
  state.cart.items.map((x) => x.quantity).reduce((a, b) => a + b, 0);

export default basketSlice.reducer;
