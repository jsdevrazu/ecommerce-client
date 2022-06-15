import React, { useState } from "react";
import "./fotgot.module.min.css";
import { Button, Input, Loader } from "../../components";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_PROXY_URI}/reset-password`, {
        email,
      });
      setLoading(false);
      toast.success("Email Sent Successfully! Please check your email");
      navigate("/verify-code");
    } catch (error) {
      console.log(error);
      toast.error("please double check your email")
      setLoading(false);
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
              <h1>Forgot Password</h1>
              <form className="forgot_main" onSubmit={handleForgotPassword}>
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
                <Button disabled={!email ? true : false} className="app_btn" text="Sent" />
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ForgotPassword;
