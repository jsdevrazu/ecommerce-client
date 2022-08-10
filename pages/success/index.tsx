import { useRouter } from "next/router";
import { Button } from "react-daisyui";
import Meta from "../../app/Components/Meta";

const OrderSuccessfully = () => {
  const router = useRouter();

  return (
    <section className="sec">
      <Meta title="E-commerce Order Confirmation" />
      <div className="container grid grid-cols-1 md:grid-cols-3 tracking-wide">
        <div
          id="order-summary-card"
          className="h-full col-start-2 py-20 place-self-center items-center md:py-3 px-3"
        >
          <div id="hero-image" className="">
            <img
              src="https://cvines528.github.io/order-summary-solution/images/illustration-hero.svg"
              alt="Razu Islam"
              className="w-full rounded-t-lg"
            />
          </div>
          <div
            id="card-body"
            className="grid grid-cols-1 justify-items-center px-20 py-10 bg-white rounded-b-lg  shadow-2xl"
          >
            <div id="order-title">
              <h1 className="text-xl">Order Placed Succesfully</h1>
            </div>

            <div
              id="order-description"
              className="flex justify-center items-center"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
                alt="Razu Islam"
                className="mt-4 mb-4 w-[40%]"
              />
            </div>
            <div id="confirmation-bt" className="w-full ">
              <Button
                color="secondary"
                className="rounded-lg mb-5 p-3 px-6 w-full text-white"
                onClick={() => router.push("/profile")}
              >
                Back to Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSuccessfully;
