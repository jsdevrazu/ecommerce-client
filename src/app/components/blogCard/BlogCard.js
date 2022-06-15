import moment from "moment";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";

const BlogCard = ({ blog, name }) => {
  const navigate = useNavigate();
  const {
    _id,
    category,
    createAt,
    description,
    img,
    title,
    reactBy,
    comments,
  } = blog;

  return (
    <>
      <div className="singleBlog">
        <div className="blog_img">
          <img src={img} alt="Razu Islam" />
        </div>
        <div className="blog_content">
          <h1>{title.substring(0, 20)}...</h1>
          <p>{category}</p>
          <div className="date">
            <p>{moment(createAt).format("MMMM Do YYYY")}</p>
            <p>{moment(createAt).format("h:mm:ss a")}</p>
          </div>
          <p>{description.substring(0, 150)}...</p>
          <div className="like_comment">
            <p>Like: {reactBy.length}</p>
            <p>Comment: {comments.length}</p>
          </div>
          <Button
            text={"View More"}
            style={{ marginTop: "20px" }}
            className="app_btn"
            onClick={() => navigate(`/blog/${_id}`)}
          />
        </div>
      </div>
    </>
  );
};

export default BlogCard;
