import { Button } from "react-daisyui";
import { IoMdSend } from "react-icons/io";
const NewsLetter = () => {
  return (
    <section className="sec">
      <div className="container">
        <div className="flex justify-center items-center h-[350px] w-[100%] flex-col bg-[#c4a4f9]">
          <h1 className="text-[50px] font-bold">NEWSLETTER</h1>
          <h2 className="text-[20px] mt-2 mobile:text-center p-4 text-center">
            Always in touch with us, for your favourite Products.
          </h2>
          <div className="flex">
            <input
              className="border-none outline-none px-6 py-2 w-full"
              type="email"
              placeholder="Email"
            />
            <Button color="primary">
              <IoMdSend className="text-white" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
