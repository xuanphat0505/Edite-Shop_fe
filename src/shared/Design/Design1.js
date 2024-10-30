import classNames from "classnames/bind";

import ProductBox1 from "../ProductBox/ProductBox1";

import styles from "./Design1.module.scss";
const cx = classNames.bind(styles);
function Design1({ products, animate }) {
  return (
    <div className={cx("products-list", { animate })}>
      {products.map((product) => (
        <ProductBox1 product={product} key={product._id} index = {product._id}/>
      ))}
    </div>
  );
}

export default Design1;
