import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { removeToCart } from "../../redux/cartSlice";
import Button from "../button/Button";
import Loader from "../loader/Loader";

const CartCard = ({ item }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state?.user);


  const handleRemoveToCart = async () => {
    setLoading(true);
    try {
     await axios.delete(
        `${process.env.REACT_APP_PROXY_URI}/cart/${item?._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: true,
        }
      );
      setLoading(false);
      dispatch(removeToCart({id: item?._id}))
      toast.success("Removed To Cart");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        item && (
          <div className="cart_card">
            <img src={item?.img} className="cart_img" alt="Razu Islam" />
            <div className="cart_info">
              <h1>{item?.title}</h1>
              <span>{item?.qty > 0 ? "In Stock" : "Our Stock"}</span>
              <p className="description">{item?.description}</p>
              <p className="price_item">${item?.price}</p>
            </div>
            <div className="btn_grp">
              <Button
                onClick={handleRemoveToCart}
                className="app_btn"
                text={"Remove"}
              />
            </div>
          </div>
        )
      )}
    </>
  );
};

export default CartCard;
