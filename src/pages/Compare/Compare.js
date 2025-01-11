import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import { OpenContext } from "../../contexts/OpenContext/OpenContext";
import { AxiosContext } from "../../contexts/AxiosContext/AxiosContext";

import styles from "./Compare.module.scss";
const cx = classNames.bind(styles);
function Compare() {
  const { handleOpenShop } = useContext(OpenContext);
  const {
    compareProducts,
    handleRemoveCompareProduct,
    handleFindProductDetail
  } = useContext(AxiosContext);


  const handleFindAndOpen = (productId) => {
    handleOpenShop();
    handleFindProductDetail(productId);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className={cx("compare-section")}>
      <div className={cx("compare-container")}>
        <div className={cx("heading-container")}>
          <h1>compare</h1>
        </div>
        <div className={cx("compare-table")}>
          <div className={cx("compare-content")}>
            <div className={cx("table")}>
              <div className={cx("table-row", "basic")}>
                <div className={cx("table-col", "field")}></div>
                {compareProducts.map((product) => (
                  <div className={cx("table-col", "value")} key={product._id}>
                    <div className={cx("table-content")}>
                      <Link to={`/product/${product?._id}`}>
                        <img src={product.image} alt=""></img>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className={cx("table-row", "available")}>
                <div className={cx("table-col", "field")}>availability</div>
                {[...Array(compareProducts.length).keys()].map((_, index) => (
                  <div className={cx("table-col", "value")} key={index}>
                    <div className={cx("table-content")}>In Stock</div>
                  </div>
                ))}
              </div>
              <div className={cx("table-row", "vendor")}>
                <div className={cx("table-col", "field")}>vendor</div>
                {[...Array(compareProducts.length).keys()].map((_, index) => (
                  <div className={cx("table-col", "value")} key={index}>
                    <div className={cx("table-content")}>Selma ninethemes</div>
                  </div>
                ))}
              </div>
              <div className={cx("table-row", "color")}>
                <div className={cx("table-col", "field")}>color</div>
                {compareProducts.map((product) => {
                  if (product.optionColor.length > 0) {
                    return (
                      <div
                        className={cx("table-col", "value")}
                        key={product._id}
                      >
                        <div className={cx("table-content")}>
                          {product.optionColor
                            .map((color) => color.colorName)
                            .join(", ")}
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        className={cx("table-col", "value")}
                        key={product._id}
                      >
                        <div className={cx("table-content")}>-</div>
                      </div>
                    );
                  }
                })}
              </div>
              <div className={cx("table-row", "quick-shop")}>
                <div className={cx("table-col", "field")}>quick shop</div>
                {compareProducts.map((product) => (
                  <div className={cx("table-col", "value")} key={product._id}>
                    <div className={cx("table-content")}>
                      <Link
                        className={cx("link-btn")}
                        onClick={() => handleFindAndOpen(product._id)}
                      >
                        quick shop
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className={cx("table-row", "price")}>
                <div className={cx("table-col", "field")}>price</div>
                {compareProducts.map((product) =>
                  product.sale ? (
                    <div className={cx("table-col", "value")} key={product._id}>
                      <div className={cx("table-content", "product-price")}>
                        <del style={{ textDecoration: "line-through" }}>
                          ${Number(product.price).toFixed(2)}
                        </del>
                        <ins>${Number(product.newPrice).toFixed(2)}</ins>
                      </div>
                    </div>
                  ) : (
                    <div className={cx("table-col", "value")} key={product._id}>
                      <div
                        className={cx("table-content")}
                        style={{ fontSize: "15px" }}
                      >
                        ${Number(product.newPrice).toFixed(2)}
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className={cx("table-row", "remove")}>
                <div className={cx("table-col", "field")}></div>
                {compareProducts.map((prodduct) => (
                  <div className={cx("table-col", "value")} key={prodduct._id}>
                    <div className={cx("table-content")}>
                      <button
                        className={cx("close-btn")}
                        onClick={() => handleRemoveCompareProduct(prodduct._id)}
                      >
                        <div
                          className={cx("line")}
                          style={{ width: "12px", height: "12px" }}
                        ></div>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Compare;
