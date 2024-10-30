import { Link, useLocation } from "react-router-dom";
import classNames from "classnames/bind";

import { IoSearchSharp } from "react-icons/io5";

import styles from "./SearchBlogResult.module.scss";
import { useEffect } from "react";
const cx = classNames.bind(styles);
function SearchBlogResult() {
  const location = useLocation();
  const { result, searchInput } = location.state;
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  return (
    <section className={cx("blog-result_section", "result-section")}>
      <div className={cx("blog-result_container", "result-container")}>
        <div className={cx("blog-result_header", "result-header")}>
          <h1>
            {typeof result === "string" ? 0 : result.length} Search Result for:
            “{searchInput}”
          </h1>
        </div>
        <div className={cx("blog-result_list")}>
          {typeof result === "string" ? (
            <div className={cx("blog-result_text")}>
              <div className={cx("blog-result")}>
                <div className={cx("blog-result_icon")}>
                  <i>
                    <IoSearchSharp />
                  </i>
                </div>
                <div className={cx("no-blog")}>
                  <svg viewBox="0 0 512 512" width="18" height="18">
                    <path d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z"></path>
                  </svg>
                  No results matched
                </div>
              </div>
            </div>
          ) : (
            result.map((result) => (
              <div className={cx("blog-result_box")}>
                <Link
                  className={cx("blog-result_image")}
                  to={`/blog/${result._id}`}
                >
                  <img src={result.image} alt=""></img>
                </Link>
                <div className={cx("blog-result_info")}>
                  <Link to={`/blog/${result._id}`}>{result.title}</Link>
                  <p>
                    Viverra a consectetur Go sporty this summer with this
                    vintage navy and white stri...
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default SearchBlogResult;
