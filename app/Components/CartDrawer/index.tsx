import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Drawer from "react-modern-drawer";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  removeItem,
  selectItems,
  selectTotalCartItems,
  selectTotalPrice,
} from "../../Slice/basketSlice";
import SingleCard from "../SingleCard";

const CartDrawer = () => {
  const [drawer, setDrawer] = useState(false);
  const cartItems = useSelector(selectItems);
  const totalPrice = useSelector(selectTotalPrice);
  const totalCartItems = useSelector(selectTotalCartItems);
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
      <button
        onClick={() => setDrawer(true)}
        className="fixed rounded bottom-10 right-4 bg-[#DFC4AF] p-5 text-2xl z-50"
      >
        <span>
          <span className="flex items-center justify-center absolute text-xs top-0 right-0 p-1 bg-white font-bold w-6 h-6 rounded-full">
            {totalCartItems}
          </span>
        </span>
        <span>
          <AiOutlineShoppingCart />
        </span>
      </button>
      <Drawer
        open={drawer}
        onClose={() => setDrawer(false)}
        direction="right"
        size={314}
      >
        <div className="px-3 flex flex-col h-full">
          <h2 className="text-lg text-center mt-4 mb-3">
            Cart Items ({totalCartItems})
          </h2>
          <div className="flex-grow overflow-auto">
            {totalCartItems === 0 && (
              <p className="text-center mt-4">No items in cart</p>
            )}
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
          <div className="border-t mb-3">
            <h2 className="text-lg mt-3 mb-3">Total Price: ${totalPrice}</h2>
            <button
              className="bg-black text-white py-3  w-full block"
              onClick={() => router.push("/checkout")}
            >
              Checkout
            </button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default CartDrawer;
