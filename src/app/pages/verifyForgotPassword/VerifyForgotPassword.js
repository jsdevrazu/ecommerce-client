import React, { useState } from "react";
import "./style.module.min.css";
import { Button, Input, Loader } from "../../components";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const VerifyForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_PROXY_URI}/verify-code`, {
        email,
        resetCode,
      });
      setLoading(false);
      toast.success("Verify Code Successfully");
      navigate("/change-password");
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="forgot_password sec_p">
          <div className="container">
            <div className="main">
              <h1>Verify Your Code</h1>
              <form className="forgot_main" onSubmit={handleVerifyCode}>
                <div className="form_control">
                  <label htmlFor="email" className="label_text">
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form_control">
                  <label htmlFor="code" className="label_text">
                    Reset Code
                  </label>
                  <Input
                    type="text"
                    id="code"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                  />
                </div>
                <Button disabled={!email || !resetCode ? true : false} className="app_btn" text="Verify Code" />
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default VerifyForgotPassword;
