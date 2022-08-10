import { useEffect, useState } from "react";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import InnerImageZoom from "react-inner-image-zoom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, selectItems } from "../../app/Slice/basketSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import { IProduct } from "../../app/Types";
import Loader from "../../app/Components/Loader";
import { getProduct } from "../../app/Utils/api";
import Meta from "../../app/Components/Meta";

function SingleProduct() {
  let {
    query: { id },
  } = useRouter();
  const [product, setProduct] = useState<IProduct>();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectItems);

  useEffect(() => {
    (async () => {
      if (id) {
        setLoading(true);
        const res = await getProduct(id as any);
        setLoading(false);
        setProduct(res?.product);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (product) {
      setImage(product?.images[0]);
    }
  }, [product]);

  const addToBasket = () => {
    if (product) {
      dispatch(
        addItem({
          ...product,
          quantity: 1,
        })
      );
    }
  };

  const checkItemExists = (id: string) => {
    const find = cartItems.filter((item) => item._id === id);
    return !!find.length;
  };

  return (
    <>
    <Meta title={`E-commerce Product ${product?.title}`} />
      <div className="container mx-auto md:w-5/6 pt-5 pb-7 px-2 md:px-0">
        {/* Bread crub */}
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="flex items-center mb-3 text-sm">
              <Link href={`/`} className="text-[#bb8e1d]">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="capitalize">{product?.title}</span>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2">
                <div>
                  <InnerImageZoom
                    src={image}
                    zoomSrc={image}
                    zoomType="hover"
                  />
                </div>
                <div className="flex flex-wrap gap-2 mt-5">
                  {product?.images.map((image, index) => (
                    <img
                      onClick={() => setImage(image)}
                      src={image}
                      alt={product?.title}
                      key={index}
                      className="w-20 rounded cursor-pointer"
                    />
                  ))}
                </div>
              </div>
              <div className="w-full md:w-1/2 md:pl-8 capitalize">
                <h1 className="text-xl md:text-3xl">{product?.title}</h1>
                <span className="text-sm text-gray-500">
                  {product?.category}
                </span>
                <p className="text-[#bb8e1d] mt-3 text-xl md:text-2xl">
                  $
                  {product?.price
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
                <div>
                  {product && checkItemExists(product?._id) ? (
                    <button className="bg-black text-white py-2 px-14 rounded text-sm mt-5 block">
                      Already added
                    </button>
                  ) : (
                    <button
                      onClick={addToBasket}
                      className="bg-black text-white py-2 px-14 rounded text-sm mt-5 block"
                    >
                      Add to cart
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-10">
              <h4 className="text-lg font-bold border-b mb-3">Description</h4>
              <p className="text-gray-500 text-sm">{product?.description}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default SingleProduct;
