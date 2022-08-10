import { Button } from "react-daisyui";
import {
  checkOutPayment,
  createOrder,
  paymentOrder,
} from "../../app/Utils/api";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import {
  selectItems,
  selectTotalPrice,
} from "../../app/Slice/basketSlice";
import { useEffect, useState } from "react";
import { IOrder } from "../../app/Types";
import Meta from "../../app/Components/Meta";

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_PUBLIC_SECRET}`);

const Confirmation = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const cartItems = useSelector(selectItems);
  const totalPrice = useSelector(selectTotalPrice);
  const [adddress, setAddress] = useState<IOrder>();

  useEffect(() => {
    setAddress(JSON.parse(localStorage.getItem("address") as any));
  }, []);

  const processPayment = async () => {
    if (cartItems?.length > 0) {
      const stripe = await stripePromise;

      if (user && cartItems) {
        const res = await checkOutPayment(
          cartItems,
          user?.email,
          token,
          totalPrice
        );

        if (res.id) {
          if (adddress) {
            const formData = {
              user: adddress.user,
              address: adddress.address,
              mobile: adddress.mobile,
              cart: cartItems,
              total: adddress.total,
            };
            const res = await createOrder(token, formData);
            const id = res.newOrder._id;
            await paymentOrder(id, token);
          }
        }

        const result = await stripe?.redirectToCheckout({
          sessionId: res.id,
        });

        if (result?.error) {
          toast.error(`${result.error.message}`);
        }
      }
    } else return toast.error("Please add to cart at least one item");
  };

  return (
    <>
      <Meta title="E-commerce Confirmation Payment" />
      <div className="flex justify-center items-center min-h-[50vh]">
        <Button
          color="accent"
          className="text-3xl text-center text-white"
          onClick={processPayment}
        >
          Pay Now
        </Button>
      </div>
    </>
  );
};

export default Confirmation;
