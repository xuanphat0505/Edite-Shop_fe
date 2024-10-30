import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import Tippy from "@tippy.js/react";
import classNames from "classnames/bind";

import { BASE_URL } from "../../config/utils";
import { followSocials } from "../../assets/data/Data";
import useAxios from "../../hooks/useAxios";

import styles from "./BlogDetail.module.scss";
import BlogBox from "../../shared/BlogBox/BlogBox";
const cx = classNames.bind(styles);
function BlogDetail() {
  const { id } = useParams();
  const { data: blogs } = useAxios(`${BASE_URL}/blog`);
  const { data: detailBlog } = useAxios(`${BASE_URL}/blog/${id}`);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const [toggle, setToggle] = useState(false);
  const [randomBlogs, setRandomBlogs] = useState([]);
  const [nextBlog, setNextBlog] = useState({});
  const [previousBlog, setPreviousBlog] = useState({});
  const getNextAndPreviousBlogs = (blogs, detailBlog) => {
    const currentIndex = blogs.findIndex((blog) => blog._id === detailBlog._id);
    const nextBlog =
      currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;
    const previousBlog = currentIndex > 0 ? blogs[currentIndex - 1] : null;
    setNextBlog(nextBlog);
    setPreviousBlog(previousBlog);
  };

  useEffect(() => {
    const getRandomBlogs = (blogs) => {
      const newBlogs = blogs.filter((blog) => blog._id !== detailBlog._id);
      newBlogs.sort(() => Math.random() - 0.5);
      return newBlogs.slice(0, 3);
    };
    setRandomBlogs(getRandomBlogs(blogs));
  }, [blogs, detailBlog]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getNextAndPreviousBlogs(blogs, detailBlog);
  }, [detailBlog, id]);

  return (
    <section className={cx("blog-detail")}>
      <div className={cx("blog-detail_container")}>
        <div
          className={cx("heading-article")}
          style={{ "--url": `url(${detailBlog.image})` }}
        >
          <div className={cx("overlay")}></div>
          <div className={cx("article")}>
            <h1>{detailBlog.title}</h1>
            <div className={cx("article-metas")}>
              <div className={cx("author")}>
                <span>By </span>
                <span> artur sulkowski</span>
              </div>
              <div className={cx("time")}>
                <span>on </span>
                <span>
                  {" "}
                  {new Date(detailBlog.date).toLocaleDateString(
                    "en-US",
                    options
                  )}
                </span>
              </div>
              <div className={cx("tag")}>
                <span>In </span>
                <span> {detailBlog.metas}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("blog-detail_content")}>
          <div className={cx("blog-content_box")}>
            <h4>Viverra a consectetur</h4>
            <p>
              Go sporty this summer with this vintage navy and white striped
              v-neck t-shirt from the Nike. Perfect for pairing with denim and
              white kicks for a stylish sporty vibe.
            </p>
          </div>
          <div className={cx("blog-content_box")}>
            <h4>Facilisis scelerisque mi</h4>
            <p>
              Typography is the work of typesetters, compositors, typographers,
              graphic designers, art directors, manga artists, comic book
              artists, graffiti artists, and now—anyone who arranges words,
              letters, numbers, and symbols for publication, display, or
              distribution—from clerical workers and newsletter writers to
              anyone self-publishing materials.
            </p>
          </div>
          <div className={cx("blog-content_box")}>
            <h4>Ullamcorper metus</h4>
            <p>
              As the capability to create typography has become ubiquitous, the
              application of principles and best practices developed over
              generations of skilled workers and professionals has diminished.
              Ironically, at a time when scientific techniques.
            </p>
          </div>
          <div className={cx("blog-content_box")}>
            <h4>Dignissim a leo cum</h4>
            <p>
              Digitization opened up typography to new generations of previously
              unrelated designers and lay users, and David Jury, head of graphic
              design at Colchester Institute in England, states that “typography
              is now something everybody does. As the capability to create
              typography has become ubiquitous, the application of principles
              and best practices developed over generations of skilled workers
              and professionals has diminished. Ironically, at a time when
              scientific techniques.
            </p>
          </div>
        </div>
        <div className={cx("btn-socials")}>
          <div className={cx("metas")}>funiture</div>
          <ul>
            {followSocials.slice(0, 3).map((social, index) => (
              <Tippy
                key={index}
                content={<div className={cx("tootlip")}>{social.tootlip}</div>}
              >
                <li>
                  <Link style={{ "--color": `${social.color}` }}>
                    <social.icon />
                  </Link>
                </li>
              </Tippy>
            ))}
            <li
              className={cx("social-dropdown")}
              onClick={() => setToggle((prev) => !prev)}
            >
              <Link style={{ "--color": "#27262c" }}>
                <FaPlus />
              </Link>
              <div className={cx("sub-socials", { isOpen: toggle })}>
                {followSocials.slice(3, 8).map((social, index) => (
                  <div className={cx("sub-socials_line")} key={index}>
                    <Tippy
                      content={
                        <div className={cx("tootlip")}>{social.tootlip}</div>
                      }
                    >
                      <Link to="#" style={{ "--color": `${social.color}` }}>
                        <social.icon className={cx("icon")} />
                        <span>{social.tootlip}</span>
                      </Link>
                    </Tippy>
                  </div>
                ))}
              </div>
            </li>
          </ul>
        </div>
        <div className={cx("blog-navigation")}>
          {previousBlog ? (
            <article className={cx("previous")}>
              <Link
                to={`/blog/${previousBlog._id}`}
                className={cx("navigation-btn")}
              >
                previous post
              </Link>
              <div className={cx("blog-previous")}>
                <Link
                  className={cx("blog-thumb")}
                  to={`/blog/${previousBlog._id}`}
                >
                  <img src={previousBlog.image} alt=""></img>
                </Link>
                <div className={cx("blog-info")}>
                  <Link to={`/blog/${previousBlog._id}`}>
                    <h3>{previousBlog.title}</h3>
                  </Link>
                </div>
              </div>
            </article>
          ) : (
            <></>
          )}
          {nextBlog ? (
            <article className={cx("next")}>
              <Link
                to={`/blog/${nextBlog._id}`}
                className={cx("navigation-btn")}
              >
                next post
              </Link>
              <div className={cx("blog-next")}>
                <div className={cx("blog-info")}>
                  <Link to={`/blog/${nextBlog._id}`}>
                    <h3>{nextBlog.title}</h3>
                  </Link>
                </div>
                <Link className={cx("blog-thumb")} to={`/blog/${nextBlog._id}`}>
                  <img src={nextBlog.image} alt=""></img>
                </Link>
              </div>
            </article>
          ) : (
            <></>
          )}
        </div>
        <div className={cx("related-blogs")}>
          {randomBlogs.map((blog) => (
            <BlogBox item={blog} key={blog._id} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogDetail;
