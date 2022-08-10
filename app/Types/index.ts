import { InputHTMLAttributes, ReactNode } from "react";

export interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  root: false;
  formGoogle?: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
  isActive:boolean;
  __v: number;
}

export interface IPropsChildren {
  children: React.ReactNode;
}

export interface FormProps {
  initialValues: any;
  validationSchema: any;
  onSubmit: any;
  children: ReactNode;
}

export interface InputProps extends IProps {
  tooltip?: any;
  hoverBoxContent?: any;
  editProfile?: boolean;
  name: string;
}

export interface IProduct {
  _id: string;
  title: string;
  price: number;
  description: string;
  content: string;
  images: string[];
  category: string;
  checked: boolean;
  inStock: number;
  sold: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  quantity: number;
}

export interface ShopCardProps {
  product: IProduct;
  onClick: () => void;
}

export interface SingleCardProps {
  _id: string;
  title: string;
  price: number;
  description: string;
  content: string;
  images: string[];
  quantity: number;
  onRemove: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
}

export interface IValue {
  email: string;
  name: string;
}

export interface ICategory {
  _id: string;
  name: string;
  createdA: string;
  updatedAt: string;
  __v: number;
}

export interface IPaymentData {
  name: string;
  email: string;
  totalAmount: number;
}

export interface IOrder {
  user: string;
  address: string;
  mobile: string;
  cart: IProduct[];
  total: number;
}

export interface IOrderItem {
  user: string | IUser | any;
  address: string;
  mobile: string;
  cart: IProduct[];
  total: number;
  delivered: boolean;
  paid: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IPassword{
  oldPassword:string,
  newPassword:string
}

export interface IPrams{
  id:string
}

export interface IModelOpen {
  open: boolean;
  setOpen: (open: boolean) => void;
}