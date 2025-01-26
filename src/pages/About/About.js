import { useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import classNames from "classnames/bind";

import { aboutIcons, serviceInfo, memberTeam } from "../../assets/data/Data";


import styles from "./About.module.scss";
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/navigation";
const cx = classNames.bind(styles);
function About() {
  const [activeIndex, setActiveIndex] = useState(null);
  const handleToggleActive = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const breakpoints = {
    1024: {
      slidesPerView: 3,
    },
    1023: {
      slidesPerView: 2,
    },
    1000: {
      slidesPerView: 2,
    },
    800: {
      slidesPerView: 2,
    },
    767: {
      slidesPerView: 2,
    },
    766: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    600: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    500: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    400: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    300: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    200: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    100: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className={cx("about-section")}>
      <div className={cx("about-introduce")}>
        <div className={cx("about-description")}>
          <h3>about our online store</h3>
          <h4>gate best ecommerce theme 2024</h4>
          <p className={cx("about-text")}>
            One morning, when Gregor Samsa woke from froubled dreams, he found
            himselt transformed in his bed into a horrible vermin. He lay on his
            armour-like back, and if he lifted his head a little he could see
            his brown belly, slightly domed and divided by arches into stif.
          </p>
          <p className={cx("about-text")}>
            Dictumst per ante cras suscipit nascetur ullamcorper in nullam
            fermentum condimentum torquent iaculis reden posuere potenti viverra
            condimentum dictumst id tellus suspendisse convallis condimentum.His
            room, a proper human room although a litle too small, lay peacetully
            between its four familiar walls. A collection of textile samples lay
            spread out on the table- Samsa was a travelling salesman.
          </p>
          <p className={cx("about-text")} style={{ marginBottom: "35px" }}>
            The bedding was hardly able to cover if and seemed ready to slide
            oft any moment. His many legs, pitifully thin compared with the size
            of the rest of him, waved about helplessly as he looked. "What's
            happened to me?" he thought. Ii wasn't a dream.
          </p>
          <div className={cx("signature-image")}>
            <img src="https://res.cloudinary.com/djmeybzjk/image/upload/v1737862185/signature_hxedbr.webp" alt=""></img>
          </div>
        </div>
        <div className={cx("about-image")}>
          <img src="https://res.cloudinary.com/djmeybzjk/image/upload/v1737862178/about-1_bdcdfb.webp" alt=""></img>
        </div>
      </div>
      <div className={cx("about-advantage")}>
        <div className={cx("about-background")}>
          <h3>what we work?</h3>
        </div>
        <div className={cx("about-col")}>
          {aboutIcons.slice(0, 3).map((icon, index) => (
            <div className={cx("icon-box")} key={index}>
              <img src={icon.image} alt=""></img>
              <div className={cx("icon-content")}>
                <h3>{icon.title}</h3>
                <p>{icon.content}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={cx("about-col")}>
          {aboutIcons.slice(3, 6).map((icon, index) => (
            <div className={cx("icon-box")} key={index}>
              <img src={icon.image} alt=""></img>
              <div className={cx("icon-content")}>
                <h3>{icon.title}</h3>
                <p>{icon.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={cx("service")}>
        <div className={cx("service-image")}>
          <h3>our service</h3>
        </div>
        <div className={cx("service-info")}>
          {serviceInfo.map((info, index) => (
            <div
              className={cx("service-col", { active: activeIndex === index })}
              key={index}
            >
              <div
                className={cx("col-header")}
                onClick={() => handleToggleActive(index)}
              >
                <h3>{info.title}</h3>
                <span className={cx(activeIndex === index ? "rotate" : "")}>
                  {activeIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
              </div>
              <p className={cx("col-content")}>{info.content}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={cx("our-team")}>
        <h3 className={cx("heading")}>our team</h3>
        <div className={cx("slider-member")}>
          <Swiper
            modules={[Pagination, Navigation]}
            pagination={{ clickable: true }}
            navigation={{ prevEl: ".prev-btn", nextEl: ".next-btn" }}
            spaceBetween={50}
            slidesPerView={3}
            slidesPerGroup={2}
            speed={1000}
            breakpoints={breakpoints}
          >
            {memberTeam.map((memeber, index) => (
              <SwiperSlide key={index}>
                <div className={cx("member-box")}>
                  <div className={cx("member-image")}>
                    <img src={memeber.image} alt=""></img>
                  </div>
                  <div className={cx("member-info")}>
                    <h4>melio gride</h4>
                    <span>developer</span>
                    <p>
                      Markus Oscar joined One Constructon in 1955 as an
                      estimator/project manager.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className={cx("slide-btns")}>
              <span className={cx("prev-btn")}>
                <IoMdArrowDropleft />
              </span>
              <span className={cx("next-btn")}>
                <IoMdArrowDropright />
              </span>
            </div>
          </Swiper>
        </div>
      </div>
      <div className={cx("connected")}>
        <h3>get connected</h3>
        <div className={cx("list-address")}>
          <div className={cx("address-col")}>
            <div className={cx("city-name")}>
              <h5>new york</h5>
              <p>
                113 New Avenue, Roadway,
                <br /> 67 Brewer St, London, United Kingdom
              </p>
            </div>
            <div className={cx("phone-email")}>
              <span>phone:</span> +23 954 355 255
              <br />
              <span>email:</span> kazenart@gmail.com
            </div>
          </div>
          <div className={cx("address-col")}>
            <div className={cx("city-name")}>
              <h5>paris</h5>
              <p>
                113 New Avenue, Roadway,
                <br /> 67 Brewer St, London, United Kingdom
              </p>
            </div>
            <div className={cx("phone-email")}>
              <span>phone:</span> +23 954 355 255
              <br />
              <span>email:</span> kazenart@gmail.com
            </div>
          </div>
          <div className={cx("address-col")}>
            <div className={cx("city-name")}>
              <h5>london</h5>
              <p>
                113 New Avenue, Roadway,
                <br /> 67 Brewer St, London, United Kingdom
              </p>
            </div>
            <div className={cx("phone-email")}>
              <span>phone:</span> +23 954 355 255
              <br />
              <span>email:</span> kazenart@gmail.com
            </div>
          </div>
          <div className={cx("address-col")}>
            <div className={cx("city-name")}>
              <h5>norway</h5>
              <p>
                113 New Avenue, Roadway,
                <br /> 67 Brewer St, London, United Kingdom
              </p>
            </div>
            <div className={cx("phone-email")}>
              <span>phone:</span> +23 954 355 255
              <br />
              <span>email:</span> kazenart@gmail.com
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
