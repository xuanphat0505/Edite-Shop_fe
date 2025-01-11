import { useEffect, useState } from "react";
import classNames from "classnames/bind";

import { BASE_URL } from "../../config/utils";
import { tabsMode2 } from "../../assets/data/Data";
import useAxios from "../../hooks/useAxios";
import Design2 from "../../shared/Design/Design2";

import styles from "./NewProduct.module.scss";
const cx = classNames.bind(styles);
function NewProduct() {
  const [categoryType, setCategoryType] = useState("bedroom");
  const [animate, setAnimate] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { data: allProducts } = useAxios(`${BASE_URL}/product`);

  const handleAnimate = (categorType) => {
    setCategoryType(categorType);
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 500);
  };

  useEffect(() => {
    setTimeout(() => {
      if (allProducts) {
        const filtered = allProducts.filter((product) =>
          product.category.some(
            (cat) => cat.categoryType.toLowerCase() === categoryType
          )
        );
        setFilteredProducts(filtered);
      }
    }, 250);
  }, [categoryType, allProducts]);

  return (
    <div className={cx("new-products")}>
      <div className={cx("heading-text")}>
        <h3 className={cx("heading")}>new products</h3>
        <ul className={cx("tabs")}>
          {tabsMode2.map((tab, index) => (
            <li
              key={index}
              onClick={() => handleAnimate(tab.categorType)}
              className={cx(
                categoryType.toLowerCase() === tab.categorType ? "active" : ""
              )}
            >
              {tab.title}
            </li>
          ))}
        </ul>
      </div>
      <Design2 products={filteredProducts} animate={animate} />
    </div>
  );
}

export default NewProduct;
