import React, { useEffect, useState } from "react";
import "./style.module.min.css";
import { Button, Loader, PlaceOrder } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setOrder } from "../../redux/orderSlice";

const MyOrder = () => {
  const { token } = useSelector((state) => state?.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state?.order);


  const getMyOrder = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_PROXY_URI}/my/order`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: true,
        }
      );
      setLoading(false);
      dispatch(setOrder(data));
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    token && getMyOrder();
  }, [token]);

  if(order[0]?.length === 0) return <Loader />

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="my_order">
          <div className="container">
            <div className="my_order_wrapper">
              <div className="my_header">
                <h1>My Orders</h1>
                <span>Your Total Order: {order[0]?.length}</span>
              </div>
              {order[0] &&
                order[0]?.map((productOrder, index) => (
                  <div className="my_orders" key={index}>
                    <h3>
                      Your Order ID:
                      <span style={{ color: "#33c24d" }}>
                        {productOrder?._id}
                      </span>
                      ({productOrder?.orderItems?.length} items)
                    </h3>
                    <Button
                      text={productOrder?.orderStatus}
                      type="button"
                      className={productOrder?.orderStatus}
                    />
                    <div className="placed_order">
                      {productOrder &&
                        productOrder?.orderItems?.map((item, index) => (
                          <PlaceOrder item={item} key={index} />
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default MyOrder;
