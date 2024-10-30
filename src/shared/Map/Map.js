import classNames from "classnames/bind";

import { FiMapPin } from "react-icons/fi";

import styles from "./Map.module.scss";
const cx = classNames.bind(styles);
function Map() {
  return (
    <div className={cx("map")}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154.8941731878194!2d144.81118417508648!3d-37.74562687199273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65fa6debeb781%3A0xe1d23f5d1759961e!2s184%20Main%20Rd%20E%2C%20St%20Albans%20VIC%203021%2C%20%C3%9Ac!5e0!3m2!1svi!2s!4v1724485701183!5m2!1svi!2s"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        className={cx("map-frame")}
      ></iframe>
      <div className={cx("map-info")}>
        <span className={cx("street-name")}>
          <i>
            <FiMapPin />
          </i>
          30 Darrick Meadows
        </span>
        <p className={cx("text")}>
          Suite 921 Brayanview,
          <br />
          HI 60451
        </p>
        <ul className={cx("schedule")}>
          <h3>Open hours</h3>
          <li>
            <p className={cx("text")}>monday</p>
            <p className={cx("text")}>10 a.m - 10 p.m</p>
          </li>
          <li>
            <p className={cx("text")}>tuesday</p>
            <p className={cx("text")}>10 a.m - 10 p.m</p>
          </li>
          <li>
            <p className={cx("text")}>wednesday</p>
            <p className={cx("text")}>10 a.m - 10 p.m</p>
          </li>
          <li>
            <p className={cx("text")}>thursday</p>
            <p className={cx("text")}>10 a.m - 10 p.m</p>
          </li>
          <li>
            <p className={cx("text")}>friday</p>
            <p className={cx("text")}>10 a.m - 10 p.m</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Map;
