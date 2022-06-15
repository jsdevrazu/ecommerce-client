import React from "react";

const PlaceOrder = ({ item }) => {
  return (
    <>
      <div className="placed_card">
        <img src={item?.img} alt="Razu Islam" />
        <h1>{item?.title.substring(0, 20)}....</h1>
        <p>${item?.price}</p>
      </div>
    </>
  );
};

export default PlaceOrder;
