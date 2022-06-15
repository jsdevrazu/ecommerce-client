import React, { useEffect, useState } from "react";
import { BlogCard, Loader } from "../../components";
import Pagination from "react-js-pagination";
import axios from "axios";
import "./blog.module.min.css";

const Blog = () => {
  //Define All State
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogCount, setBlogCount] = useState(1);
  const resultPerPage = 3;
  //Pagination When Change
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  //It's fire automatically to fetch user data
  const handleBlog = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BLOG_API}/blogs?page=${currentPage}&limit=${resultPerPage}`
      );
      setLoading(false);
      setData(data?.result);
      setBlogCount(data?.blogCount);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleBlog();
  }, [currentPage]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="home_blog">
          <div className="container">
            <div className="homeBlog_container">
              <h1 style={{ textAlign: "center" }}>Our Least Blog</h1>
              <div className="all_blogs">
                {/* Render Single Blog Here */}
                {data?.length >= 1 ? (
                  data.map((blog) => <BlogCard key={blog?._id} blog={blog} />)
                ) : (
                  <h1
                    style={{
                      marginTop: "20px",
                      color: "#333",
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    Don't have any blog yet
                  </h1>
                )}
              </div>
              {/* Pagination */}
              {resultPerPage < blogCount && (
                <div className="paginationBox">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={blogCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Blog;
