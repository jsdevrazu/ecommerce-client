import React from 'react'

const ProductConfirm = ({product}) => {
  return (
    <>
    <div className="confirm_card">
      <div className="left_img">
        <img src={product?.img} alt="Razu Islam" />
      </div>
      <div className="confirm_info">
        <h2>{product?.title}</h2>
        <p>{product?.description}</p>
        <span>${product?.price}</span>
      </div>
    </div>
    </>
  )
}

export default ProductConfirm