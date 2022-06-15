import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, ProductConfirm } from "../../components";
import { selectTotal } from "../../redux/cartSlice";
import "./confirm.module.min.css";

const ConfirmOrder = () => {
  const cartItem = useSelector((state) => state?.cart?.items);
  const total = useSelector(selectTotal);
  const shipCost = Math.round(((total * 5) / 100 / 5) % +total);
  const allTotal = total + shipCost;
  const navigate = useNavigate();
  const address = JSON.parse(localStorage.getItem("address"));

  useEffect(() => {
    localStorage.setItem(
      "address",
      JSON.stringify({ ...address, total: allTotal })
    );
  }, [allTotal, address]);

  return (
    <>
      <section className="orderConfirm">
        <div className="container">
          <div className="confirm_container">
            <div className="left_side">
              {cartItem &&
                cartItem.map((product) => (
                  <ProductConfirm key={product?._id} product={product} />
                ))}
            </div>
            <div className="right_side">
              <div className="checkout">
                <h1>Checkout Summary</h1>
                <p>Subtotal: ${total}</p>
                <p>Shipping: ${shipCost}</p>
                <p>With Shipping Cost: ${allTotal}</p>
                <Button
                  onClick={() => navigate("/payment")}
                  type="button"
                  text={"Confirm Order"}
                  className="app_btn"
                  style={{
                    marginTop: "20px",
                    width: "100%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ConfirmOrder;
