import { configureStore } from "@reduxjs/toolkit";
import auth, { setAuth } from "./Slice/authSlice";
import { Provider } from "react-redux";
import axios from "axios";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { apiEndPoint } from "./Utils";
import cookie from 'js-cookie'
import cart, { addItem } from '../app/Slice/basketSlice'
interface IProps {
  children: React.ReactNode;
}

//Create Our Store
export const store = configureStore({
  reducer: {
    auth,
    cart
  },
  devTools: process.env.NODE_ENV !== "production",
});
//State Provider To Provide store state in our application
const StoreProvider = ({ children }: IProps) => {
  const router = useRouter();
  //checking if user logged in or not
  useEffect(() => {
    const myFunc = () => {
      const userData = localStorage.getItem("user");
      if (userData) store.dispatch(setAuth(JSON.parse(userData)));
    };
    myFunc();
  }, []);
  //when any error coming with axios it's showing to console to fix bug
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      const res = error.response;
      //Checking token is expire or not if token expire return automatic logout and return login page
      if (res?.data?.message?.includes("invalid token")) {
        return new Promise((response, reject) => {
          const { token } = store.getState().auth;
          axios
            .get(`${apiEndPoint}/auth/logout`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            .then(({ data }) => {
              store.dispatch(setAuth(data));
              localStorage.clear();
              cookie.remove("token");
              router.push("/login");
            })
            .catch((err) => {
              console.log(err);
              reject(error);
            });
        });
      }
      return Promise.reject(error);
    }
  );

  return <Provider store={store}>{children}</Provider>;
};

export type RootState = ReturnType<typeof store.getState>;

export default StoreProvider;