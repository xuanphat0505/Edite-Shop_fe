import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import classNames from "classnames/bind";
import axios from "axios";

import { BASE_URL } from "../../config/utils";
import { toastError } from "../../shared/Toastify/Toastify";
import useAxios from "../../hooks/useAxios";
import BlogBox from "../../shared/BlogBox/BlogBox";
import HeadingBox from "../../shared/HeadingBox/HeadingBox";

import "swiper/scss";
import styles from "./Blog.module.scss";
const cx = classNames.bind(styles);
function Blog() {
  const navigate = useNavigate();
  const [isResponsive, setIsResponsvie] = useState(window.innerWidth <= 1023);
  const [title, setTitle] = useState("");
  const { data: newestBlogs } = useAxios(`${BASE_URL}/blog/newest`);
  const { data: blogs } = useAxios(`${BASE_URL}/blog`);
  const handleResize = () => {
    if (window.innerWidth <= 1023) setIsResponsvie(true);
    else setIsResponsvie(false);
  };

  const handelSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/blog/search`, {
        title,
      });
      const result = res.data;
      if (result.success) {
        return navigate("/blog/result", {
          state: { result: result.data, searchInput: title },
        });
      } else {
        return navigate("/blog/result", {
          state: { result: result.message, searchInput: title },
        });
      }
    } catch (error) {
      return toastError(error?.response?.data?.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handelSearch();
    }
  };

  const breakpoints = {
    1023: {
      slidesPerView: 2,
    },
    766: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 1,
    },
    500: {
      slidesPerView: 1,
    },
    400: {
      slidesPerView: 1,
    },
    300: {
      slidesPerView: 1,
    },
    200: {
      slidesPerView: 1,
    },
    100: {
      slidesPerView: 1,
    },
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className={cx("blog-section")}>
      <div className={cx("blog-container")}>
        <HeadingBox address="blog" heading={"blogs"} />
        <div className={cx("blog-search")}>
          <form className={cx("search-box")} onSubmit={handelSearch}>
            <input
              type="text"
              placeholder="What are you looking for?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <span type="submit" onClick={handelSearch}>
              <IoSearch />
            </span>
          </form>
        </div>
        <div className={cx("blogs")}>
          <div className={cx("newest-blogs")}>
            <h1>newest blogs</h1>
            <div className={cx("newest-blog_list")}>
              {isResponsive ? (
                <Swiper
                  breakpoints={breakpoints}
                  className={cx("blog-swiper")}
                  slidesPerView={2}
                  loop={true}
                  speed={500}
                  modules={[Navigation]}
                  navigation={{
                    prevEl: ".blog-prev_btn",
                    nextEl: ".blog-next_btn",
                  }}
                >
                  {newestBlogs.map((blog, index) => (
                    <SwiperSlide>
                      <Link
                        className={cx("blog-box")}
                        key={index}
                        to={`/blog/${blog._id}`}
                      >
                        <div className={cx("blog-img")}>
                          <img src={blog.image} alt=""></img>
                          <div className={cx("blog-content")}>
                            <p>funiture</p>
                            <h3>{blog.title}</h3>
                            <p className={cx("blog-date")}>
                              {new Date(blog.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                            <Link to={`/blog/${blog._id}`}>read more</Link>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                  <div className={cx("blog-navigation")}>
                    <span className={cx("blog-prev_btn")}>
                      <IoMdArrowDropleft />
                    </span>
                    <span className={cx("blog-next_btn")}>
                      <IoMdArrowDropright />
                    </span>
                  </div>
                </Swiper>
              ) : (
                newestBlogs.map((blog, index) => (
                  <Link
                    className={cx("blog-box")}
                    key={index}
                    to={`/blog/${blog._id}`}
                  >
                    <div className={cx("blog-img")}>
                      <img src={blog.image} alt=""></img>
                      <div className={cx("blog-content")}>
                        <p>{blog.metas}</p>
                        <h3>{blog.title}</h3>
                        <p className={cx("blog-date")}>
                          {new Date(blog.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <Link to={`/blog/${blog._id}`}>read more</Link>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
          <div className={cx("normal-blogs")}>
            <div className={cx("normal-blog_list")}>
              {blogs.map((item, index) => (
                <BlogBox item={item} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Blog;
