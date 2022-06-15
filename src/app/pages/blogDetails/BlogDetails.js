import React, { useEffect, useState } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TelegramShareButton,
  RedditShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  TelegramIcon,
  RedditIcon,
} from "react-share";
import moment from "moment";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Comment, Loader } from "../../components";
import './blogDetails.module.min.css';

const BlogDetails = () => {
  const shareUrl = document.URL;
  const [loading, setLoading] = useState(false);
  const [singlePost, setSinglePost] = useState(null);
  const { id } = useParams();
  //Get a single blog details
  useEffect(() => {
    const getSingleBlog = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BLOG_API}/blog/${id}`
        );
        setLoading(false);
        setSinglePost(data?.blog);
      } catch (error) {
        setLoading(false);
        console.log(error)
      }
    };

    getSingleBlog();
  }, [id]);

  return <div>{loading ? <Loader /> : (
    <section className="blog_details">
    <div className="container">
      <div className="blogDetails_container">
        <div className="blogDetails_img">
          <img src={singlePost?.img} alt="Razu Islam" />
        </div>
        <h3 className="author">
          Posted By: {singlePost?.author?.username}
        </h3>
        <h5 className="category">
          Posted Category: {singlePost?.category}
        </h5>
        <div className="date">
          <p>{moment(singlePost?.createAt).format("MMMM Do YYYY")}</p>
          <p>{moment(singlePost?.createAt).format("h:mm:ss a")}</p>
        </div>
        <div className="like_comment">
          <p>Like: {singlePost?.reactBy?.length}</p>
          <p>Comment: {singlePost?.comments.length}</p>
        </div>
        <h1 className="title">{singlePost?.title}</h1>
        <div className="description">
          <p>{singlePost?.description}</p>
        </div>
        {/* Social Media Share */}
        <div className="social_share">
          <h1 style={{ marginRight: "16px" }}>Share Social Media :</h1>
          <div className="social">
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={40} />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl}>
              <TwitterIcon size={40} />
            </TwitterShareButton>
            <LinkedinShareButton url={shareUrl}>
              <LinkedinIcon size={40} />
            </LinkedinShareButton>
            <PinterestShareButton url={shareUrl}>
              <PinterestIcon size={40} />
            </PinterestShareButton>
            <RedditShareButton url={shareUrl}>
              <RedditIcon size={40} />
            </RedditShareButton>
            <TelegramShareButton url={shareUrl}>
              <TelegramIcon size={40} />
            </TelegramShareButton>
          </div>
        </div>
        {/* Render Every Single Comment */}
        <div className="comment_main">
          {singlePost?.comments &&
            singlePost?.comments?.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
              />
            ))}
        </div>
      </div>
    </div>
  </section>
  )}</div>;
};

export default BlogDetails;
