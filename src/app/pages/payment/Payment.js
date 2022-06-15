import React, { useState } from "react";
import "./payment.module.min.css";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { BsCreditCard, BsCalendarEventFill } from "react-icons/bs";
import { MdVpnKey } from "react-icons/md";
import { Button, Loader } from "../../components";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectTotal } from "../../redux/cartSlice";
import { setOrder } from "../../redux/orderSlice";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state?.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const { total, ...shippingInfo } = JSON.parse(
    localStorage.getItem("address")
  );
  const { items } = useSelector((state) => state?.cart);
  const itemsPrice = useSelector(selectTotal);

  const paymentData = {
    amount: total,
  };

  const order = {
    shippingInfo,
    orderItems: items,
    itemsPrice,
    taxPrice: 5,
    totalPrice: total,
    shippingPrice: 50,
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_PROXY_URI}/payment/process`,
        paymentData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: true,
        }
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            address: {
              city: shippingInfo?.city,
              country: shippingInfo?.county,
              line1: shippingInfo?.address,
              postal_code: shippingInfo?.pinCode,
              state: shippingInfo?.state,
            },
          },
        },
      });

      if (result.error) console.log(result.error);
      else {
        if (result.paymentIntent.status === "succeeded") {
          setLoading(true)
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          
          const { data } = await axios.post(
            `${process.env.REACT_APP_PROXY_URI}/order/new`,
            order,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              credentials: true,
            }
          );
          dispatch(setOrder(data))
          toast.success("Payment Sent Successfully");
          navigate("/success")
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  return (
    <>
      {loading ? <Loader /> : (
        <section className="payment">
        <div className="container">
          <form className="payment_form" onSubmit={handlePayment}>
            <div className="form_control">
              <div className="icon" style={{
                position:"absolute",
                top:"10px",
                right:"30px"
              }}>
              <BsCreditCard />
              </div>
              <CardNumberElement className="paymentInput" />
            </div>
            <div className="form_control">
             <div className="icon" style={{
                position:"absolute",
                top:"10px",
                right:"30px"
              }}>
             <BsCalendarEventFill />
             </div>
              <CardExpiryElement className="paymentInput" />
            </div>
            <div className="form_control">
              <div className="icon" style={{
                position:"absolute",
                top:"10px",
                right:"30px"
              }}>
              <MdVpnKey />
              </div>
              <CardCvcElement className="paymentInput" />
            </div>
            <Button text={"Pay"} type="submit" className="app_btn" />
          </form>
        </div>
      </section>
      )}
    </>
  );
};

export default Payment;
