import React, { useState } from "react";
import StarRatingComponent from "react-star-rating-component";
import { BsTrash } from "react-icons/bs";
import { useSelector } from "react-redux";
import Button from "../button/Button";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Loader from "../loader/Loader";

const ReviewCard = ({ review }) => {
  const { user, token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: review?.rating,
    isHalf: true,
  };

  const deleteReview = async () => {
    setLoading(true);
    try {
      await axios.delete(
        `${process.env.REACT_APP_PROXY_URI}/reviews?productId=${id}&id=${review?._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: true,
        }
      );
      setLoading(false);
      toast.success("Review Delete Successfully");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="review_card">
          <div className="img">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Razu Islam"
            />
          </div>
          <div className="review_info">
            <h3>Review By: {review?.name}</h3>
            <StarRatingComponent {...options} />
            <p>{review?.comment}</p>
            {user?._id === review?.user ? (
              <Button
                onClick={deleteReview}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  border: "none",
                  outline: "none",
                  background: "#c91515",
                  color: "#fff",
                  padding: "0.5em 1.5em",
                  borderRadius: "10px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
                icon={<BsTrash size={30} />}
                text="Delete Review"
              />
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewCard;
