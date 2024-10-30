import { Link } from "react-router-dom";
import { MdOutlineArrowRight } from "react-icons/md";
import classNames from "classnames/bind";

import styles from "./HeadingBox.module.scss";
const cx = classNames.bind(styles);
function HeadingBox({ address, heading }) {
  return (
    <div className={cx("heading-box")}>
      <h1 className={cx("title-head")}>{heading}</h1>
      <div className={cx("address")}>
        <span>
          <Link to="/">home</Link>
        </span>
        <span>
          <MdOutlineArrowRight />
        </span>
        <span>{address}</span>
      </div>
    </div>
  );
}

export default HeadingBox;
