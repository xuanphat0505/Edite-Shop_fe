import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import classNames from "classnames/bind";

import { BASE_URL } from "../../config/utils";
import useAxios from "../../hooks/useAxios";
import BlogBox from "../../shared/BlogBox/BlogBox";

import "swiper/scss";
import "swiper/scss/pagination";
import styles from "./News.module.scss";
const cx = classNames.bind(styles);
function News() {
  const { data: latestBlogs } = useAxios(`${BASE_URL}/blog/latest`);
  const [isResponsive, setIsReponsive] = useState(window.innerWidth <= 1023);
  const handleResize = () => {
    if (window.innerWidth <= 1023) setIsReponsive(true);
    else setIsReponsive(false);
  };

  const breakpoints = {
    1023: {
      slidesPerView: 2,
    },
    761: {
      slidesPerView: 2,
    },
    760: {
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
  }, []);
  return (
    <div className={cx("news-container")}>
      <div className={cx("heading-text")}>
        <h3 className={cx("heading")}>latest news</h3>
      </div>
      <div className={cx("news-list", isResponsive ? "active" : "")}>
        {isResponsive ? (
          <Swiper
            modules={[Pagination]}
            breakpoints={breakpoints}
            spaceBetween={50}
            slidesPerView={2}
            speed={700}
            pagination={{ el: ".swiper-pagination", clickable: true }}
          >
            {latestBlogs.map((item, index) => (
              <SwiperSlide key={index}>
                <BlogBox item={item} />
              </SwiperSlide>
            ))}
            <div className={cx("swiper-pagination")}></div>
          </Swiper>
        ) : (
          latestBlogs.map((item, index) => <BlogBox item={item} key={index} />)
        )}
      </div>
    </div>
  );
}

export default News;
