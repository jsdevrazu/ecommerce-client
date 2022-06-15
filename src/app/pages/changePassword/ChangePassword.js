import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button, Input, Loader } from "../../components";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_PROXY_URI}/change-password`, {
        email,
        password,
      });
      setLoading(false);
      toast.success("Successfully Change Password");
      navigate("/login");
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
              <h1>Change Your Password</h1>
              <form className="forgot_main" onSubmit={handleChangePassword}>
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
                  <label htmlFor="password" className="label_text">
                    Enter your new password
                  </label>
                  <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button className="app_btn" text="Update Password" />
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ChangePassword;
