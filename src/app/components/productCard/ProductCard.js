import axios from "axios";
import React, {  useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../redux/cartSlice";
import Button from "../button/Button";
import Loader from "../loader/Loader";

const ProductCard = ({ product }) => {
  const { token } = useSelector((state) => state?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

const handleCart = async () =>{
  setLoading(true)
  try {
    await axios.post(`${process.env.REACT_APP_PROXY_URI}/cart/${product?._id}`, {
      title:product?.title,
      qty:product?.qty,
      price:product?.price,
      description:product?.description,
      img:product?.img[0]?.image
    }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: true,
    })
    setLoading(false)
    toast.success("Added To Cart")
  } catch (error) {
    setLoading(false)
    console.log(error)
  }
}

useEffect(() =>{
  const getAllCart = async () =>{
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_PROXY_URI}/cart/all`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: true,
        })
        dispatch(addToCart(data?.cart))
      } catch (error) {
        console.log(error)
      }
  }
  token && getAllCart();
}, [handleCart])

  return (
    <>
     {loading ? <Loader /> : (
       <div className="product_card">
       <div
         className="card_img"
         onClick={() => navigate(`/productDetails/${product?._id}`)}
       >
         <img src={product?.img[0]?.image} alt="Razu Islam" />
       </div>
       <div className="card_info">
         <h3>{product?.title.substring(0, 10)}...</h3>
         <p>${product?.price}</p>
         <Button
           onClick={handleCart}
           text={"Add to cart"}
           className="app_btn"
         />
       </div>
     </div>
     )}
    </>
  );
};

export default ProductCard;
