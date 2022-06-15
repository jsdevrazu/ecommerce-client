import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, CartCard } from "../../components";
import { selectItem, selectTotal } from "../../redux/cartSlice";
import './cart.module.min.css';

const Cart = () => {
  const { token } = useSelector((state) => state.user);
  const items = useSelector(selectItem);
  const total = useSelector(selectTotal);
  const navigate = useNavigate();


  return (
    <>
      <section className="cart_page sec_p">
        <div className="container">
          {!token ? (
            <div className="empty_login">
                <img src="https://www.rokomari.com/static/200/images/icon_empty_cart.png" alt="Razu Islam" />
                <h1>Don't login yet</h1>
            </div>
          ) : (
            <div className="cart_container">
            {/* Left */}
            <div className="cart_left">
              <img
                src="https://www.junglescout.com/wp-content/uploads/2020/05/Prime-day-banner.png"
                alt="Razu Islam"
              />

              <h1 className="cart_text">
                {items?.length === 0
                  ? "Your Shopping Cart Is Empty"
                  : "Shopping Cart"}
              </h1>
              {items &&
                items?.map((item) => <CartCard key={item?._id} item={item} />)}
            </div>
            {/* RIght */}
            {items?.length > 0 && (
              <div className="cart_right">
                <div className="cart_right_info">
                <h1>
                  Subtotal ({items?.length} item): <b>${total}</b>
                </h1>
                <Button
                  onClick={() => navigate("/order")}
                  disabled={!token}
                  text={!token ? "Sign In" : "Process to checkout"}
                  className="app_btn mt-4 w-[100%]"
                />
                </div>
              </div>
            )}
          </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Cart;
