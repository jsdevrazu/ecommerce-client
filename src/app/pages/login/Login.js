import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Loader } from "../../components";
import { login } from "../../redux/userSlice";
import './login.module.min.css';

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, password } = formData;
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.token) return navigate("/");
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // Validation form
    if (password.length < 8)
      return toast.error("password must be at least 8 characters");
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_PROXY_URI}/login`,
        formData
      );
      dispatch(login(data));
      toast.success(data.message);
      setLoading(false);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  if (loading && !user) return <Loader />;

  return (
    <>
      <section className="login">
        <div className="container">
          <h1 className="login_text">Welcome to login</h1>
          <form onSubmit={handleLogin}>
            <div className="form_control">
              <label className="label_text" htmlFor="email">
                Email Address
              </label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={handleChange}
                autoComplete="off"
                placeholder="Email Address"
                name="email"
              />
            </div>
            <div className="form_control">
              <label className="label_text" htmlFor="password">
                Password
              </label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={handleChange}
                autoComplete="off"
                placeholder="Password"
                name="password"
              />
            </div>
            <Button
              type="submit"
              className="app_btn"
              text={"Login"}
              disabled={!email || !password ? true : false}
            />
            <Link
              to="/forgot-password"
              className="forgot_password"
            >
              Forgot Password
            </Link>
            <Button
              type="button"
              className="app_btn"
              text={"Create An Account"}
              onClick={() => navigate("/register")}
            />
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
