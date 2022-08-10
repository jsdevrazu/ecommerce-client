import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).max(32).required(),
});

export const registerSchema = Yup.object().shape({
  name: Yup.string().min(5).max(30).required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(8).max(32).required(),
});

export const updateSchema = Yup.object().shape({
  name: Yup.string().min(5).max(30).required(),
  email: Yup.string().email().required(),
});

export const updatePassword = Yup.object().shape({
  oldPassword: Yup.string().min(8).max(32).required(),
  newPassword: Yup.string().min(8).max(32).required(),
});

export const orderScheme = Yup.object().shape({
  address: Yup.string().required(),
  mobile: Yup.string().required(),
  city: Yup.string().required(),
  state: Yup.string().required(),
});

