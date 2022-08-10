import { Country, State } from "country-state-city";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Input } from "react-daisyui";
import { useSelector } from "react-redux";
import Meta from "../../app/Components/Meta";
import {
  selectTotalCartItems,
  selectTotalPrice,
} from "../../app/Slice/basketSlice";
import { RootState } from "../../app/store";

const initialState = {
  address: "",
  state: "",
  country: "",
  zipCode: "",
  phoneNo: "",
};

const Checkout = () => {
  const router = useRouter();
  const [fromData, setFormData] = useState(initialState);
  const { address, state, country, zipCode, phoneNo } = fromData;
  const { auth } = useSelector((state: RootState) => state);
  const totalPrice = useSelector(selectTotalPrice);
  const cartItems = useSelector(selectTotalCartItems);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...fromData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const myFormData = {
      user: auth.user?._id,
      address: `${address}, ${state}, ${country}, ${zipCode}`,
      mobile: phoneNo,
      cart: cartItems,
      total: totalPrice,
    };
    localStorage.setItem("address", JSON.stringify(myFormData));
    return router.push("/confirmation");
  };

  return (
    <>
    <Meta title="E-commerce Checkout Page" />
    <section className="sec">
      <div className="container">
        <h1 className="text-3xl text-gray-700 font-semibold text-center mb-6">
          Billing Information
        </h1>
        <form onSubmit={handleSubmit}>
          <Input
            name="address"
            type="text"
            placeholder="example address"
            className="border-[1px] py-2 px-4 rounded w-full mb-4"
            value={address}
            onChange={handleChange}
          />
          <Input
            name="phoneNo"
            type="text"
            placeholder="example mobile"
            className="border-[1px] py-2 px-4 rounded w-full"
            value={phoneNo}
            onChange={handleChange}
          />
          <div className="w-full">
            <select
              required
              name="country"
              value={country}
              onChange={handleChange}
              className="select focus:outline-offset-0 select-bordered w-full mt-2"
            >
              <option value="">County</option>
              {Country.getAllCountries().map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {country && (
            <div className="form_control mt-2 mb-4">
              <select
                required
                name="state"
                className="select focus:outline-offset-0 select-bordered w-full"
                value={state}
                onChange={handleChange}
              >
                <option value="">State</option>
                {State &&
                  State.getStatesOfCountry(country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          )}
          <Input
            name="zipCode"
            type="text"
            placeholder="zipCode"
            className="border-[1px] py-2 px-4 rounded w-full mt-2"
            value={zipCode}
            onChange={handleChange}
          />
          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-full mt-2 text-white"
              color="secondary"
            >
              Make a Payment
            </Button>
          </div>
        </form>
      </div>
    </section>
    </>
  );
};

export default Checkout;
