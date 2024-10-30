import className from "classnames/bind";

import { brands } from "../../assets/data/Data";

import styles from "./Brands.module.scss";
const cx = className.bind(styles);
function Brands() {
  return (
    <div className={cx("brand-container")}>
      {brands.map((brand, index) => (
        <div className={cx("brand-box")} key={index}>
          <img src={brand.image} alt=""></img>
        </div>
      ))}
    </div>
  );
}

export default Brands;
