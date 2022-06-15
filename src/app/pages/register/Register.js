import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Loader } from "../../components";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import './register.module.min.css';

const initialState = {
  username: "",
  email: "",
  password: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { email, password, username } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.token) return navigate("/");
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    //Username validation
    if (username.length < 4 || username.length > 10)
    return toast.error(
      "username must be at least 4 characters or longer 10 characters"
    );
    //Password validation
    if (password.length < 8 || password.length > 32)
    return toast.error(
      "username must be at least 8 characters or longer 32 characters"
    );


    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_PROXY_URI}/register`,
        formData
      );
      dispatch(login(data));
      toast.success(data.message);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/email-verify");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <section className="register">
        <div className="container">
          <h1 className="login_text">Welcome to Register</h1>
          <form onSubmit={handleRegister}>
            <div className="form_control">
              <label className="label_text" htmlFor="username">
                Username
              </label>
              <Input
                type="text"
                id="username"
                value={username}
                onChange={handleChange}
                autoComplete="off"
                placeholder="Username"
                name="username"
              />
            </div>
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
            <div className="form_control mt-3">
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
              text={"Register"}
              disabled={!email || !password || !username ? true : false}
            />
            <p className="login_area">
              Already have account? please
              <Link to="/login">
                login
              </Link>
              now
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
