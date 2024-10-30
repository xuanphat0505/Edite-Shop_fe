import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import classNames from "classnames/bind";

import Design1 from "../../shared/Design/Design1";

import styles from "./SearchProductResult.module.scss";
const cx = classNames.bind(styles);
function SearchProducResult() {
  const location = useLocation();
  const { products, text } = location.state || { blogs: [] };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className={cx("product-result_section", "result-section")}>
      <div className={cx("product-result_container", "result-container")}>
        <div className={cx("product-result_header", "result-header")}>
          <h1>
            {products.length > 0 ? products.length : 0} Search Results for: “
            {text}”
          </h1>
        </div>
        <div className={cx("product-result_list")}>
          <Design1 products={products} />
        </div>
      </div>
    </section>
  );
}

export default SearchProducResult;
