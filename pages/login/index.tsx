import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button } from "react-daisyui";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import AppForm from "../../app/Components/AppForm";
import FormInput from "../../app/Components/FormInput";
import Loader from "../../app/Components/Loader";
import { googleLogin, login } from "../../app/Utils/api";
import { loginSchema } from "../../app/Validation";
import { setAuth } from "../../app/Slice/authSlice";
import Cookies from "js-cookie";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { FcGoogle } from "react-icons/fc";
import Meta from "../../app/Components/Meta";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const res = await login(values.email, values.password);
    setLoading(false);
    if (res.user) {
      toast.success(res.message);
      dispatch(setAuth(res));
      localStorage.setItem("user", JSON.stringify(res));
      Cookies.set("token", res.token, { expires: 1 });
      router.push("/");
    } else toast.error(res.response.data.message);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const res = await googleLogin();
    setLoading(false);
    if (res.user) {
      toast.success(res.message);
      dispatch(setAuth(res));
      localStorage.setItem("user", JSON.stringify(res));
      Cookies.set("token", res.token, { expires: 1 });
      router.push("/");
    } else toast.error(res.response.data.message);
  };

  return (
    <>
    <Meta title="E-commerce Login" />
      {loading ? (
        <Loader />
      ) : (
        <section className="sec">
          <div className="container">
            <div className="mt-[0.2em] shadow-lg px-10 rounded-lg mx-auto md:max-w-[700px] flex justify-center items-center flex-col py-10">
              <h1 className="text-center text-2xl font-semibold mb-4">
                Welcome to login page
              </h1>
              <div className="w-full">
                <AppForm
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  onSubmit={handleSubmit}
                  validationSchema={loginSchema}
                >
                  <FormInput
                    name="email"
                    type="email"
                    placeholder="example@example.com"
                    className="border-[1px] py-2 px-4 rounded w-full"
                  />
                  <FormInput
                    name="password"
                    type="password"
                    placeholder="YourPassword%^*1093"
                    className="border-[1px] py-2 px-4 rounded w-full"
                  />
                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      className="w-full mt-2 text-white"
                      color="success"
                    >
                      Login
                    </Button>
                  </div>
                </AppForm>
                <Button
                  className="w-full mt-2 text-white flex items-center gap-4"
                  color="info"
                  onClick={handleGoogleLogin}
                >
                  <FcGoogle size={30} /> Sign in with Google
                </Button>
                <div className="flex items-center justify-between flex-wrap mt-6">
                  <p className="text-gray-500">
                    if do't have any account? please
                    <Link href="/register">
                      <a className="m-1 font-bold text-blue-600">register</a>
                    </Link>
                    now
                  </p>
                  <Link href="/forgotPassword">
                    <a className="text-blue-600">Forgot Password?</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  if (req.headers.cookie) {
    return {
      redirect: {
        destination: "/",
      },
      props: { isLogin: true },
    };
  }
  return {
    props: { isLogin: false },
  };
};
