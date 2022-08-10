import React from "react";
import { Button } from "react-daisyui";
import { ApiCategories } from "../../data";

const Categories = () => {
  return (
    <>
      <section className="sec">
      <div className="container">
      <div className="flex flex-wrap justify-between items-center p-5 gap-10">
        {ApiCategories.map((item, index) => (
          <div
            key={index}
            className="md:w-[350px] w-full shadow-lg rounded-md overflow-hidden relative"
          >
            <img src={item.src} className="w-[100%]" alt="category_img" />
            <div className="flex absolute w-[100%] h-[100%] left-0 top-0 items-center justify-center flex-col">
              <h2 className="text-white font-medium text-[30px]">
                {item.title}
              </h2>
              <Button color="primary" className="btn">
                See more
              </Button>
            </div>
          </div>
        ))}
      </div>
      </div>
      </section>
    </>
  );
};

export default Categories;
