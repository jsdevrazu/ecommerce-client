import React, { useEffect, useState } from "react";
import { Input, Loader, ProductCard } from "../../components";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getProduct } from "../../redux/productSlice";
import img404 from '../../asset/product.png'
import './shop.module.min.css'


const categories = [
  "Phone",
  "Table",
  "Electronic Device",
  "Computer",
  "Laptop",
];

const Shop = () => {
  const [category, setCategory] = useState("");
  const [lowPrice, setLowPrice] = useState(0);
  const [highPrice, setHighPrice] = useState(100000);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const resultPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const { productCount, result } = useSelector((state) => state.product);

  const getProductData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_PROXY_URI}/products?page=${currentPage}&limit=${resultPerPage}&category=${category}&price[gte]=${lowPrice}&price[lte]=${highPrice}&search=${searchText}`
      );
      setLoading(false);
      dispatch(getProduct(data));
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = `E-commerce Application - Shop`
    getProductData();
  }, [currentPage, category, lowPrice, highPrice, searchText]);


  if (loading && !result && !productCount) return <Loader />;
 

  return (
    <>
      <section className="sec_p">
        <div className="container">
          <h1 className="home_shop">Home / shop</h1>
          <div className="filter_itemMain">
            {/* Filter Item */}
            <div className="filter_item_first">
              <h1>
                SHOP BY
              </h1>
              {/* Filter By Product Category */}
              <div className="product_category">
                <h3>Filter By Product Category</h3>
                {categories.map((ptCategory, index) => (
                  <ul key={index}>
                    <li
                      onClick={() => setCategory(ptCategory)}
                      className="category_item"
                    >
                      {ptCategory}
                    </li>
                  </ul>
                ))}
              </div>
              {/* Filter By Using Price */}
              <div className="price">
                <h3>Filter By Product Price</h3>
                {/* Price Low */}
                <div className="priceLow">
                  <label htmlFor="price_min">Price Low</label>
                  <Input
                    type="range"
                    name="price_min"
                    id="price_min"
                    min={100}
                    max={2000}
                    value={lowPrice}
                    onChange={(e) => setLowPrice(e.target.value)}
                    title="Minium Value"
                  />
                </div>
                {/* Price High */}
                <div className="priceHigh">
                  <label htmlFor="price_max">Price High</label>
                  <Input
                    type="range"
                    name="price_max"
                    id="price_max"
                    min={0}
                    max={10000}
                    value={highPrice}
                    onChange={(e) => setHighPrice(e.target.value)}
                    title="Maximum Value"
                  />
                </div>
              </div>
            </div>
            {/* Product Item */}
            <div className="product_item">
              <img
                src="http://plazathemes.com/magento22/outline/pub/media/catalog/category/category-img.jpg"
                alt="Razu Islam"
                loading="lazy"
              />
              {/* Product */}
              {/* Search Box */}
              <div className="search_box">
                <Input
                 type="text"
                 placeholder="Search your product"
                 value={searchText}
                 onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div className="product">
                {result && result?.length === 0  ? (
                 <>
                  <div className="notFoundProduct">
                  <img className="notFound" alt="Razu Islam" src={img404} loading="lazy" />
                  <p>No Product Found</p>
                  </div>
                 </>
                ) : (
                  result && result?.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))
                )}
          </div>
              {/* Pagination */}
              {
                result && result?.length === 0  ? (
                  <h1></h1>
                ) : (
                  result?.length < productCount && (
                    <div className="pagination_box">
                      <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={productCount}
                        onChange={setCurrentPage}
                        nextPageText="Next"
                        prevPageText="Prev"
                        firstPageText="1st"
                        lastPageText="Last"
                        itemClass="page-item"
                        linkClass="page-link"
                        activeClass="pageItemActive"
                        activeLinkClass="pageLinkActive"
                      />
                    </div>
                  )
                )
              }
              
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
