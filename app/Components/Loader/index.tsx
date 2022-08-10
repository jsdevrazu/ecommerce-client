import React from "react";
import { RotatingSquare } from "react-loader-spinner";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <RotatingSquare
        ariaLabel="rotating-square"
        visible={true}
        color="#122f57"
        strokeWidth="10"
      />
    </div>
  );
};

export default Loader;
