import React, { useState } from "react";
import { Button, Input } from "../../components";
import "./order.module.min.css";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";

const initialState = {
  address: "",
  city: "",
  state: "",
  country: "",
  pinCode: 6600,
  phoneNo: 1234567890
};

const Order = () => {
  const [fromData, setFormData] = useState(initialState);
  const { address, city, state, country, pinCode, phoneNo } = fromData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...fromData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("address", JSON.stringify(fromData));
    navigate("/order/confirm");
  };

  return (
    <>
      <div className="order_page">
        <div className="container">
          <h1 className="shop_text">
            Shipping Address
            <small>(Please select only one! shipping address)</small>
          </h1>
          <form className="order_confrim" onSubmit={handleSubmit}>
            <div className="form_control">
              <label htmlFor="address">Address</label>
              <Input
                type="text"
                id="address"
                placeholder="Enter Address"
                value={address}
                onChange={handleChange}
                name="address"
              />
            </div>
            <div className="form_control">
              <label htmlFor="city">City</label>
              <Input
                type="text"
                name="city"
                id="city"
                placeholder="Enter city"
                value={city}
                onChange={handleChange}
              />
            </div>
            <div className="form_control">
              <label htmlFor="country">County</label>
              <select
                required
                value={country}
                onChange={handleChange}
                name="country"
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
              <div className="form_control">
                <label htmlFor="state">State</label>
                <select
                  required
                  value={state}
                  onChange={handleChange}
                  name="state"
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

            <div className="form_control">
              <label htmlFor="pinCode">Zip Code</label>
              <Input
                type="text"
                id="pinCode"
                name="pinCode"
                placeholder="Enter Zip Code"
                value={pinCode}
                onChange={handleChange}
              />
            </div>
            <div className="form_control">
              <label htmlFor="phone">Phone Number</label>
              <Input
                type="text"
                id="phone"
                name="phoneNo"
                placeholder="Enter Phoneno"
                value={phoneNo}
                onChange={handleChange}
              />
            </div>
            <Button
              type="submit"
              text={"Continue"}
              className="app_btn"
              disabled={
                !address || !city || !country || !state || !pinCode || !phoneNo
              }
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Order;
