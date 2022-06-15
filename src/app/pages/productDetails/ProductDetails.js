import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Loader, ReviewCard } from "../../components";
import { Carousel } from "react-carousel-minimal";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import "./productDetails.module.min.css";
import StarRatingComponent from "react-star-rating-component";

const ProductDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState();
  const dispatch = useDispatch();

  const getSingleProductDetails = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_PROXY_URI}/product/${id}`
      );
      setProductData(data?.product);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProductDetails();
  }, [id]);

  if (loading && !id && !productData) return <Loader />;

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: productData?.ratings,
    isHalf: true,
  };

  return (
    <>
      {loading ? <Loader /> : (
        <section className="sec_p">
        <div className="container">
          <h1 className="home_shop">Home / {productData?.title}</h1>
          <div className="details_container">
            {/* Image Gallery */}
            <div className="img_gallery">
              {productData && (
                <Carousel
                  data={productData?.img}
                  time={2000}
                  width="850px"
                  height="500px"
                  radius="10px"
                  slideNumber={true}
                  automatic={true}
                  dots={true}
                  pauseIconColor="white"
                  pauseIconSize="40px"
                  slideBackgroundColor="darkgrey"
                  slideImageFit="cover"
                  thumbnailWidth="100px"
                />
              )}
            </div>
            {/* Content */}
            <div className="details_info">
              <h1>{productData?.title}</h1>
              <h1>${productData?.price}</h1>
              {/* Stock  */}
              <div className="some_info">
                <p>
                  Availability:
                  <span>
                    {productData?.qty > 0 ? `In Stock` : `Out Of Stock`}
                  </span>
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                  }}
                >
                  <StarRatingComponent {...options} />(
                  {productData?.reviews?.length})
                </div>
                <p>
                  Sku#: <span>{productData?._id}</span>
                </p>
                <p>
                  Category#: <span>{productData?.category}</span>
                </p>
              </div>
              {/* Small Description */}
              <div className="sm_desc">
                <p>{productData?.description}</p>
              </div>
              <Button
                onClick={() => dispatch(addToCart(productData))}
                className="app_btn"
                text={"Add to cart"}
              />
            </div>
          </div>
          {/* Review Card */}
          <div className="review_box">
            <div className="review_card_container">
              {productData?.reviews && productData?.reviews[0] ? (
                productData.reviews &&
                productData.reviews.map((review) => (
                  <ReviewCard key={review?._id} review={review} />
                ))
              ) : (
                <p className="notReview">No Reviews Yet</p>
              )}
            </div>
          </div>
        </div>
      </section>
      )}
    </>
  );
};

export default ProductDetails;
