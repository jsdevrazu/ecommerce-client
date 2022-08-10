import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "react-daisyui";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useSelector } from "react-redux";
import Loader from "../../app/Components/Loader";
import Meta from "../../app/Components/Meta";
import { RootState } from "../../app/store";
import { IOrderItem } from "../../app/Types";
import { getOrderDetail } from "../../app/Utils/api";

const OrderDetails = () => {
  const router = useRouter();
  const [details, setDetails] = useState<IOrderItem>();
  const { token } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (router.query.id && token) {
      (async () => {
        setLoading(true);
        const res = await getOrderDetail(`${router.query.id}`, token);
        setLoading(false);
        setDetails(res.order);
      })();
    }
  }, [router.query.id]);

  return (
    <>
      <Meta title="E-commerce Order Details" />
      {loading ? (
        <Loader />
      ) : (
        <section className="sec">
          <div className="container">
            <Button
              onClick={() => router.push("/profile")}
              color="secondary"
              className="flex items-center gap-2"
            >
              <AiOutlineArrowLeft size={25} /> Go Back
            </Button>
            <div className="mt-4 flex justify-start items-start flex-col">
              <h1 className="uppercase font-bold text-2xl text-gray-800">
                order Id : {details && details._id}
              </h1>
              <h1 className="text-[1.2em] text-gray-400 font-semibold uppercase">
                shipping
              </h1>
              <div className="mt-4 leading-8">
                <p className="text-gray-400 uppercase">
                  <span>Name</span>: {details && details.user.name}
                </p>
                <p className="text-gray-400 uppercase">
                  <span>Email</span>: {details && details.user.email}
                </p>
                <p className="text-gray-400 uppercase">
                  <span>Address</span>: {details && details.address}
                </p>
                <p className="text-gray-400 uppercase">
                  <span>Mobile</span>: {details && details._id}
                </p>

                {details && details.delivered ? (
                  <p className="bg-green-400 text-white p-3 mt-4 w-[300px]">
                    Delivered Successfully
                  </p>
                ) : (
                  <p className="bg-red-400 text-gray p-3 mt-4 w-[300px]">
                    Not Successfully
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default OrderDetails;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  if (!req.headers.cookie) {
    return {
      redirect: {
        destination: "/login",
      },
      props: { isLogin: false },
    };
  }
  return {
    props: { isLogin: true },
  };
};
