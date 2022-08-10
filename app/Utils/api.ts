import axios from "axios";
import { googleApi } from "react-firebase-lib";
import { auth, providerGoogle } from "../../firebase";
import { IOrder, IPassword } from "../Types";
import { apiEndPoint } from "./index";

export const login = async (email: string, password: string) => {
  try {
    const { data } = await axios.post(`${apiEndPoint}/auth/login`, {
      email,
      password,
    });
    return data;
  } catch (error: any) {
    return error;
  }
};

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const { data } = await axios.post(`${apiEndPoint}/auth/register`, {
      name,
      email,
      password,
    });
    return data;
  } catch (error: any) {
    return error;
  }
};

export const logout = async (token: string) => {
  try {
    const { data } = await axios.get(`${apiEndPoint}/auth/logout`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: any) {
    return error;
  }
};

export const getSingleUser = async (token: string) => {
  try {
    const { data } = await axios.get(`${apiEndPoint}/user/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: any) {
    return error;
  }
};

export const getAllOrder = async (token: string) => {
  try {
    const { data } = await axios.get(`${apiEndPoint}/order/getAllOrder`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: any) {
    return error;
  }
};

export const updateUser = async (id: string, token: string, formData: any) => {
  try {
    const { data } = await axios.put(
      `${apiEndPoint}/user/getUser/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error: any) {
    return error;
  }
};

export const googleLogin = async () => {
  try {
    const res = await googleApi(auth, providerGoogle);
    const { data } = await axios.post(`${apiEndPoint}/auth/google`, {
      name: res?.displayName,
      email: res?.email,
      avatar: res?.photoURL,
    });
    return data;
  } catch (error: any) {
    return error;
  }
};

export const getShopProduct = async (
  page: number = 1,
  limit: number = 6,
  sort: string = "oldest",
  title: string = "all",
  category: string = "all"
) => {
  try {
    const { data } = await axios.get(
      `${apiEndPoint}/admin/get-products?page=${page}&sort=${
        !sort ? "all" : sort
      }&limit=${limit}&title=${!title ? "all" : title}&category=${
        !category ? "all" : category
      }`
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const getCategory = async () => {
  try {
    const { data } = await axios.get(`${apiEndPoint}/admin/getCategories`);
    return data;
  } catch (error) {
    return error;
  }
};

export const getProduct = async (id: string) => {
  try {
    const { data } = await axios.get(`${apiEndPoint}/admin/product/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const checkOutPayment = async (
  items: any,
  email: string,
  token: string,
  totalPrice:number
) => {
  try {
    const { data } = await axios.post(
      `${apiEndPoint}/order/stipeRequest`,
      {
        items,
        email,
        totalPrice
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const createOrder = async (token: string, formData: IOrder) => {
  try {
    const { data } = await axios.post(
      `${apiEndPoint}/order/create-order`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const paymentOrder = async (id: string, token: string) => {
  try {
    const { data } = await axios.post(
      `${apiEndPoint}/order/payment/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const getOrder = async (token: string) => {
  try {
    const { data } = await axios.get(`${apiEndPoint}/order/getAllOrder`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    return error;
  }
}

export const getOrderDetail = async (id: string, token: string) => {
  try {
    const { data } = await axios.get(`${apiEndPoint}/order/getOrderDetail/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    return error;
  }
}

export const upPassword = async (token: string, formData: IPassword) => {
  try {
    const { data } = await axios.post(
      `${apiEndPoint}/auth/update-password`,
        formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error;
  }
}