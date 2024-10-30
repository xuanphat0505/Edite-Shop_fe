import { useLocation, useMatch } from "react-router-dom";
import { IoIosArrowUp } from "react-icons/io";
import classNames from "classnames/bind";

import styles from "./Navigation.module.scss";
import { useEffect, useState } from "react";
const cx = classNames.bind(styles);
function Navigation() {
  const [scrollDegree, setScrollDegree] = useState(0);
  const [active, setActive] = useState(false);
  const scrollOnTop = () => {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop >= 120) {
        setActive(true);
      } else {
        setActive(false);
      }
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 360;
      setScrollDegree(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const isProductDetail = useMatch("/product/:id");

  return (
    <div
      className={cx(
        "navigation",
        { active: active },
        { responsive: isProductDetail?.params?.id !== "result" && isProductDetail?.params?.id }
      )}
      style={{ "--scroll-deg": `${scrollDegree}deg` }}
      onClick={scrollOnTop}
    >
      <span>
        <IoIosArrowUp className={cx("arrow-icon")} />
      </span>
    </div>
  );
}

export default Navigation;
