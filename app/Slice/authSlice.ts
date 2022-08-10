import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../Types";

export interface AuthState {
  token: string;
  user: IUser | undefined
}

const initialState: AuthState = {
  token: "",
  user: undefined
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAuth: (state: AuthState, action: PayloadAction<AuthState>) => {
      return {
        ...state,
        token: action.payload?.token,
        user: action.payload?.user,
      }
    },
  },
})

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;