import React from "react";
import { Oval } from "react-loader-spinner";
import './loader.module.min.css';

const Loader = () => {
  return (
    <div className="loader">
      <Oval
        ariaLabel="loading-indicator"
        height={100}
        width={100}
        strokeWidth={5}
        color="cyan"
        secondaryColor="#ffcc00"
      />
    </div>
  );
};

export default Loader;
