import type { NextPage } from "next";
import Categories from "../app/Components/CategoriesHome";
import Meta from "../app/Components/Meta";
import NewsLetter from "../app/Components/NewsLetter";
import Slider from "../app/Components/Slide";

const Home: NextPage = () => {
  return (
    <>
      <Meta title="E-commerce Home" />
      <Slider />
      <Categories />
      <NewsLetter />
    </>
  );
};

export default Home;
