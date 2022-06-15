import React from 'react'
import './style.module.min.css';
import { Button } from '../../components';
import { useNavigate } from 'react-router-dom';

const Successfull = () => {
  const navigate = useNavigate();


  return (
    <>
      <div className="after_order">
      <img src="https://cdn-icons-png.flaticon.com/512/3472/3472620.png" alt="Razu Islam" />
      <h1>Congratulation Your Order Has Successfully Placed</h1>
      <Button 
      text={"View Order"}
      type="button"
      className="app_btn"
      onClick={() => navigate("/my-order")}
      />
      </div>
    </>
  )
}

export default Successfull