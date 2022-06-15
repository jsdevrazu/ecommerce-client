import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Loader } from "../../components";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import './email.module.min.css';
import { login } from "../../redux/userSlice";

const EmailVerify = () => {
  const [verifyCode, setVerifyCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { token, user } = useSelector((state) => state.user);


  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_PROXY_URI}/verify`,
        {
          email: user?.email,
          verifyCode,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(login(data))
      localStorage.setItem("user", JSON.stringify(data));
      setLoading(false);
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  
  useEffect(() => {
    if (!user) return navigate("/login");
  }, []);

  if (loading && !user) return <Loader />;

  return (
    <>
      <section className="verifyCode">
        <div className="container">
          <h1>
            Verify Your Email
          </h1>
          <form className="verify" onSubmit={handleVerifyEmail}>
            <div className="form_control">
              <label className="text_label" htmlFor="code">
                Enter Verify Code
              </label>
              <Input
                type="text"
                id="code"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value)}
                className="block w-[100%] border border-2 border-gray-200 mt-3 outline-none focus:outline focus:border-2 focus:border-cyan-500 p-2"
                autoComplete="off"
                placeholder="Verify Code"
              />
            </div>

            <Button
              type="submit"
              className="app_btn"
              text={"Email Verify"}
            />
          </form>
        </div>
      </section>
    </>
  );
};

export default EmailVerify;
