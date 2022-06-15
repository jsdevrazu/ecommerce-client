import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import './home.module.min.css';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() =>{
      document.title = `E-commerce Application - Home`
      if(user && !user?.isVerified) return navigate("/email-verify");
  }, [])


  return (
    <>
      <section className="home">
        <div className="container">
          <div className="hero_content">
            <h1>New Arrivals</h1>
            <span>
              From $399
            </span>
            <p>
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, quo error, laboriosam officia perferendis ipsam doloribus sint commodi expedita est enim quae sequi rem quasi itaque! Nam laudantium repellendus odio?
            </p>
            <Button
              text={"Shop Now"}
              className="app_btn"
              onClick={() => navigate("/shop")}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
