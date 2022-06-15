import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsCart3, BsCart4 } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { GoThreeBars } from "react-icons/go";
import { MdOutlineLogout } from "react-icons/md";
import Button from "../button/Button";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader/Loader";
import axios from "axios";
import toast from "react-hot-toast";
import { login } from "../../redux/userSlice";
import { selectItem } from "../../redux/cartSlice";
import "./navbar.module.min.css";

const navData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Shop",
    url: "/shop",
  },
  {
    name: "Blog",
    url: "/blog",
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector(selectItem);

  const handleLogOut = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_PROXY_URI}/logout`
      );
      dispatch(login(data));
      setLoading(false);
      localStorage.clear();
      toast.success(data.message);
      navigate("/login")
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  if (loading && !token) return <Loader />;

  return (
    <>
      <header className="header">
        {/* Topbar */}
        <div className="topBar">
          <h3> Mid-season Sale up to 70% off. Shop now!</h3>
        </div>
        {/* Navbar Item */}
        <div className="container">
          <div className="mobile_menu" onClick={() => setActiveMenu(!activeMenu)}>
          <GoThreeBars size={40} />
          </div>
          <nav className={`${activeMenu ? "navbar active" : "navbar"}`}>
            {/* Logo */}
            <Link className="logo" to="/">
              <h4>Razu Islam</h4>
            </Link>
            {/* Menu Item */}
            <div className="nav_item">
              <ul>
                {navData.map(({ name, url }, index) => (
                  <li key={index}>
                    <NavLink to={url}>{name}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
            {/* Right Side Menu Item */}
            <div className="right_menu">
              {!token ? (
                <>
                  <Button
                    text={"Login"}
                    disabled={false}
                    style={{
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      fontSize: "1em",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate("/login")}
                  />
                  <div className="cartButton">
                    <Button
                      text={<BsCart3 size={20} />}
                      disabled={false}
                      onClick={() => navigate("/cart")}
                      className="cart_btn"
                    />
                    <div className="count_item">{items?.length}</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="cartButton">
                    <Button
                      text={<BsCart3 size={20} />}
                      disabled={false}
                      onClick={() => navigate("/cart")}
                      className="cart_btn"
                    />
                    <div className="count_item">{items?.length}</div>
                  </div>
                  <Button
                    icon={<CgProfile size={20} />}
                    disabled={false}
                    title="User Profile"
                    onClick={() => navigate("/profile")}
                    className="nav_btn"
                    text="Profile"
                  />
                  <Button
                    icon={<BsCart4 size={20} />}
                    disabled={false}
                    title="Order"
                    onClick={() => navigate("/my-order")}
                    className="nav_btn"
                    text="My Order"
                  />
                  <Button
                    icon={<MdOutlineLogout size={20} />}
                    disabled={false}
                    title="Logout"
                    onClick={handleLogOut}
                    className="nav_btn"
                    text="Logout"
                  />
                </>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
