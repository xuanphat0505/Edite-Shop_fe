import { useState } from "react";
import classNames from "classnames/bind";

import { tabs } from "../../assets/data/Data";
import { BASE_URL } from "../../config/utils";
import useAxios from "../../hooks/useAxios";
import Design1 from "../../shared/Design/Design1";

import styles from "./Products.module.scss";
const cx = classNames.bind(styles);
function Products() {
  const { data: products } = useAxios(`${BASE_URL}/product`, "get");
  const [tabIndex, setTabIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleAnimate = (index) => {
    setTabIndex(index);
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 500);
  };
  
  setTimeout(() => {
    setFilteredProducts(
      products.filter((product) => product.type === tabs[tabIndex].title)
    );
  }, 250);
  return (
    <div className={cx("product-container")}>
      <div className={cx("products")}>
        <div className={cx("heading-text")}>
          <h3 className={cx("heading")}>our products</h3>
        </div>
        <ul>
          {tabs.map((tab, index) => (
            <li key={index} onClick={() => handleAnimate(index)}>
              <span className={cx(tabIndex === index ? "active" : "")}>
                {tab.title}
              </span>
            </li>
          ))}
        </ul>
        <Design1 products={filteredProducts} animate={animate} />
      </div>
    </div>
  );
}

export default Products;
