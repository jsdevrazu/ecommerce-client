import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button } from "react-daisyui";
import toast from "react-hot-toast";
import AppForm from "../../app/Components/AppForm";
import FormInput from "../../app/Components/FormInput";
import { register } from "../../app/Utils/api";
import { registerSchema } from "../../app/Validation";
import Link from "next/link";
import Loader from "../../app/Components/Loader";
import { GetServerSideProps } from "next";
import { useDispatch } from "react-redux";
import { setAuth } from "../../app/Slice/authSlice";
import Cookies from "js-cookie";
import Meta from "../../app/Components/Meta";

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const res = await register(values.name, values.email, values.password);
    setLoading(false);
    if (res.message) {
      toast.success(res.message);
      dispatch(setAuth(res));
      localStorage.setItem("user", JSON.stringify(res));
      Cookies.set("token", res.token, { expires: 1 });
      router.push("/");
    } else toast.error(res.response.data.message);
  };

  return (
    <>
    <Meta title="E-commerce Register" />
      {loading ? (
        <Loader />
      ) : (
        <section className="sec">
          <div className="container">
            <div className="mt-[0.2em] shadow-lg px-10 rounded-lg mx-auto md:max-w-[700px] flex justify-center items-center flex-col py-10">
              <h1 className="text-center text-2xl font-semibold mb-4">
                Welcome to signup page
              </h1>
              <div className="w-full">
                <AppForm
                  initialValues={{
                    name: "",
                    email: "",
                    password: "",
                  }}
                  onSubmit={handleSubmit}
                  validationSchema={registerSchema}
                >
                  <FormInput
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    className="border-[1px] py-2 px-4 rounded w-full"
                  />
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
                    <Button className="w-full mt-2 text-white" color="success">
                      Register Now
                    </Button>
                  </div>
                </AppForm>
                <p className="text-gray-500 mt-6">
                  if already have an account? please
                  <Link href="/login">
                    <a className="m-1 font-bold text-blue-600">login</a>
                  </Link>
                  now
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Register;



export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  if (req.headers.cookie) {
    return {
      redirect: {
        destination: "/",
      },
      props: { isLogin: true },
    }
  }
  return {
    props: { isLogin: false },
  }
}