import React, { useEffect, useState } from "react";
import { Button, Input } from "react-daisyui";
import ShoppingCard from "../../app/Components/ShopingCard";
import { ICategory, IProduct } from "../../app/Types";
import Pagination from "react-js-pagination";
import { getCategory, getShopProduct } from "../../app/Utils/api";
import { useRouter } from "next/router";
import Meta from "../../app/Components/Meta";
import Loader from "../../app/Components/Loader";

const sortBy = [
  { name: "Oldest", value: "oldest" },
  { name: "Newest", value: "newest" },
  { name: "Price: Hight-Low", value: "-price" },
  { name: "Price: Low-Hight", value: "price" },
  { name: "Best Sales", value: "-sold" },
];

const Shop = () => {
  const router = useRouter();
  const resultPerPage = 6;
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<IProduct[]>();
  const [category, setCategory] = useState<ICategory[]>();
  const [productCount, setProductCount] = useState(0);
  const [result, setResult] = useState(0);
  const [categories, setCategories] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const res = await getShopProduct(
      currentPage,
      resultPerPage,
      sort,
      searchText.toLowerCase(),
      categories
    );
    setLoading(false);
    setProducts(res?.products);
    setResult(res?.result);
    setProductCount(res?.productsCount);
  };

  useEffect(() => {
    getData();
  }, [currentPage, searchText, categories, resultPerPage, sort]);

  useEffect(() => {
    (async () => {
      const res = await getCategory();
      setCategory(res.categories);
    })();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="sec">
          <Meta title="E-commerce Shop" />
          <div className="container">
            <h1 className="text-3xl font-semibold text-center mb-3">
              Shop Page
            </h1>
            <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
              <Input
                placeholder="Search here...."
                className="w-full"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div className="bg_img rounded-md">
              <h1 className="text-1xl md:text-3xl font-semibold text-center text-white">
                Welcome to shop page
              </h1>
              <p className="max-w-[650px] text-white mt-4 text-center">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam
                voluptas, magni velit ad non quos, quod eveniet saepe adipisci
                corrupti sit exercitationem nisi unde repudiandae suscipit
                recusandae et quo? Nam numquam a facilis maiores repellendus
                doloremque quia magnam vel sed!
              </p>
              <Button color="accent" className="text-white mt-4">
                Buy Product
              </Button>
            </div>
            {/* Filter Product */}
            <div className="flex justify-between items-center flex-wrap mt-10">
              <>
                <select
                  className="select focus:outline-offset-0 select-bordered"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  {sortBy.map((item, index) => (
                    <option value={item.value} key={index}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <select
                  onChange={(e) => setCategories(e.target.value)}
                  value={categories}
                  className="select focus:outline-offset-0 select-bordered"
                >
                  {category &&
                    category?.map((item, index) => (
                      <option value={item.name} key={index}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </>
            </div>
            {/* Shopping cart Item*/}
            <div className="flex items-center flex-wrap gap-4 mt-4">
              {products &&
                products?.map((product) => (
                  <ShoppingCard
                    key={product._id}
                    product={product}
                    onClick={() => router.push(`/product/${product._id}`)}
                  />
                ))}
            </div>

            {/* Pagination */}
            {products && products?.length === 0 ? (
              <div className="flex items-center justify-center">
                <div className="font-semibold text-3xl text-red-400">
                  <h1>Sorry ! Your search product is not found</h1>
                </div>
              </div>
            ) : (
              result < productCount && (
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
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Shop;
