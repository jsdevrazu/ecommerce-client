import { useRouter } from "next/router";
import React from "react";
import { Button } from "react-daisyui";
import { useDispatch, useSelector } from "react-redux";
import Meta from "../../app/Components/Meta";
import SingleCard from "../../app/Components/SingleCard";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  removeItem,
  selectItems,
  selectTotalCartItems,
  selectTotalPrice,
} from "../../app/Slice/basketSlice";


const Cart = () => {
  const cartItems = useSelector(selectItems);
  const totalCartItems = useSelector(selectTotalCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const dispatch = useDispatch();
  const router = useRouter();
  const increaseQuantity = (id: string) => {
    dispatch(increaseItemQuantity(id));
  };

  const decreaseQuantity = (id: string) => {
    dispatch(decreaseItemQuantity(id));
  };


  return (
   <>
   <Meta title="E-commerce Cart Page" />
    <section className="sec">
      <div className="container">
        <div className="gap-6 flex flex-wrap">
          <div className="shadow-xl p-10 w-full md:w-[60%] lg:w-[950px]">
            <div className="flex justify-between items-center border-b border-gray-300 pb-6">
              <h1 className="text-3xl text-gray-600">Shopping Cart</h1>
              <h1 className="text-3xl text-gray-600">{totalCartItems} Items</h1>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-400 text-xs uppercase w-2/5">
                Product Details
              </h3>
              <h3 className="font-semibold text-gray-400 text-xs uppercase w-1/5">
                Quantity
              </h3>
              <h3 className="font-semibold text-gray-400 text-xs uppercase w-1/5">
                Price
              </h3>
              <h3 className="font-semibold text-gray-400 text-xs uppercase w-1/5">
                Total
              </h3>
            </div>
            <div>
              {cartItems.map((item) => (
                <SingleCard
                  key={item._id}
                  {...item}
                  onRemove={() => dispatch(removeItem(item._id))}
                  onIncrease={() => increaseQuantity(item._id)}
                  onDecrease={() => decreaseQuantity(item._id)}
                />
              ))}
            </div>
          </div>

          <div id="summary" className="w-1/4 px-8 py-10 bg-[#f6f6f6] flex-1">
            <h1 className="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">
                Items {totalCartItems}
              </span>
              <span className="font-semibold text-sm">{totalPrice}$</span>
            </div>
            <div>
              <label className="font-medium inline-block mb-3 text-sm uppercase">
                Shipping
              </label>
              <select className="block p-2 text-gray-600 w-full text-sm">
                <option>Standard shipping - $10.00</option>
              </select>
            </div>
            <Button
              color="error"
              className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase mt-4 w-full"
            >
              Apply
            </Button>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>${totalPrice}</span>
              </div>
              <Button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full" onClick={() => router.push("/checkout")}>
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
   </>
  );
};

export default Cart;
