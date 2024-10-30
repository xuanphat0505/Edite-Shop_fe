import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./BlogBox.module.scss";
const cx = classNames.bind(styles);
function BlogBox({ item }) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return (
    <div className={cx("new-box")}>
      <Link to={`/blog/${item._id}`} className={cx("new-image")}>
        <img src={item.image} alt=""></img>
      </Link>
      <div className={cx("new-content")}>
        <Link to={`/blog/${item._id}`}>
          <h3>{item.title}</h3>
        </Link>
        <p>{new Date(item.date).toLocaleDateString("en-US", options)}</p>
      </div>
    </div>
  );
}

export default BlogBox;
