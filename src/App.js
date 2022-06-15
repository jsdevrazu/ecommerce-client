import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./app/components";
import {
  Cart,
  Home,
  Login,
  Profile,
  Register,
  Page404,
  EmailVerify,
  Shop,
  ProductDetails,
  Blog,
  BlogDetails,
  ForgotPassword,
  VerifyForgotPassword,
  ChangePassword,
  Order,
  ConfirmOrder,
  Payment,
  Successfull,
  MyOrder,
} from "./app/pages";
import ProtectedRoutes from "./app/privetRoute/ProctedRoutes";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const App = () => {


  return (
    <>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/productDetails/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/email-verify"
          element={
            <ProtectedRoutes>
              <EmailVerify />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoutes>
              <Order />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/order/confirm"
          element={
            <ProtectedRoutes>
              <ConfirmOrder />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/success"
          element={
            <ProtectedRoutes>
              <Successfull />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/my-order"
          element={
            <ProtectedRoutes>
              <MyOrder />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/payment"
          element={
            <Elements stripe={loadStripe(process.env.REACT_APP_STRIPE_API_KEY)}>
            <ProtectedRoutes>
              <Payment />
            </ProtectedRoutes>
            </Elements>
          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
};

export default App;
