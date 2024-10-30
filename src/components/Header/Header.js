import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { animated, useSpring } from "@react-spring/web";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";
import classNames from "classnames/bind";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/autoplay";
import styles from "./Header.module.scss";
const cx = classNames.bind(styles);
function Header() {
  const [reset, setReset] = useState(true);

  const firstProps = useSpring({
    from: { opacity: 0, y: 100 },
    to: { opacity: reset ? 1 : 0, y: reset ? 0 : 100 },
    config: { duration: 500 },
    reset: true,
  });

  const secondProps = useSpring({
    from: { opacity: 0, y: 100 },
    to: { opacity: reset ? 1 : 0, y: reset ? 0 : 100 },
    config: { duration: 500 },
    delay: 400,
    reset: true,
  });

  const thirdProps = useSpring({
    from: { opacity: 0, y: 100 },
    to: { opacity: reset ? 1 : 0, y: reset ? 0 : 100 },
    config: { duration: 500 },
    delay: 600,
    reset: true,
  });

  useEffect(() => {
    setReset(true);
  }, []);
  return (
    <header className={cx("header")}>
      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        speed={1500}
        loop={true}
        navigation={{ prevEl: ".prev-button", nextEl: ".next-button" }}
        onSlideChangeTransitionStart={() => setReset(false)}
        onSlideChangeTransitionEnd={() => setReset(true)}
      >
        <SwiperSlide>
          <div className={cx("slide-container", "mode1")}>
            <div className={cx("slide-content")}>
              <animated.h3 style={firstProps}>interior decoration</animated.h3>
              <animated.h4 style={secondProps}>
                The folks over Youmeus Design have been approach by the know
                <br /> brand Joseph
              </animated.h4>
              <animated.div style={thirdProps}>
                <Link to="#">discover now</Link>
              </animated.div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={cx("slide-container", "mode2")}>
            <div className={cx("slide-content")}>
              <animated.h4 style={firstProps}>Up to 50% off online</animated.h4>
              <animated.h3 style={secondProps}>
                look book collection
              </animated.h3>
              <animated.div style={thirdProps}>
                <Link to="#">discover now</Link>
              </animated.div>
            </div>
          </div>
        </SwiperSlide>
        <div className={cx("slide-buttons")}>
          <div className={cx("slide-button", "prev-button")}>
            <GoChevronLeft />
          </div>
          <div className={cx("slide-button", "next-button")}>
            <GoChevronRight />
          </div>
        </div>
      </Swiper>
    </header>
  );
}

export default Header;
