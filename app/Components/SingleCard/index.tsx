import React, { FC } from "react";
import { Button } from "react-daisyui";
import { TiTimes } from "react-icons/ti";
import { SingleCardProps } from "../../Types";

const SingleCard: FC<SingleCardProps> = ({
  title,
  price,
  images,
  quantity,
  onRemove,
  onIncrease,
  onDecrease,
}) => {
  return (
    <>
      <div className="flex gap-2 items-center my-2 bg-gray-50 p-4 rounded ">
        <div className="w-2/6 relative">
          <img
            src={images[0]}
            alt="product"
            className="w-full h-16 object-cover rounded"
          />
        </div>
        <div className="w-4/6">
          <div className="flex justify-between items-center pb-3">
            <h3 className="font-sans text-base flex-1 truncate mr-2 capitalize font-bold">
              {title}
            </h3>
            <TiTimes
              onClick={onRemove}
              color="#ccc"
              size={22}
              className="cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-600 text-base flex-1">
              ${price * quantity}
            </p>
            <div className=" flex justify-between items-center">
              <Button
                color="secondary"
                onClick={onDecrease}
                className="px-2 text-white rounded"
              >
                -
              </Button>
              <span className="px-2">{quantity}</span>
              <Button
                color="primary"
                onClick={onIncrease}
                className="px-2 text-white rounded"
              >
                +
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleCard;
