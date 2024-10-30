import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import classNames from "classnames/bind";

import { OpenContext } from "../../contexts/OpenContext/OpenContext";
import { AxiosContext } from "../../contexts/AxiosContext/AxiosContext";

import styles from "./CompareBox.module.scss";
const cx = classNames.bind(styles);
function CompareBox() {
  const { openCompare, handleCloseCompare } =
    useContext(OpenContext);
  const {
    handleRemoveCompareProduct,
    handleClearCompareList,
    compareProducts,
  } = useContext(AxiosContext);
  useEffect(() => {
    if (compareProducts.length === 0) {
      handleCloseCompare(); // Close the CompareBox if no products are in the list
    }
  }, [compareProducts]);
  return (
    <div className={cx("compare-popup", { active: openCompare })}>
      <div className={cx("compare-popup_container")}>
        <div className={cx("list-head")}>
          <h4>compare products</h4>
          <button onClick={handleCloseCompare}>close</button>
        </div>
        <div className={cx("list-product")}>
          {compareProducts?.length > 0 ? (
            compareProducts.map((product) => (
              <div className={cx("compare-item")} key={product._id}>
                <div className={cx("compare-image")}>
                  <Link>
                    <img src={product.image} alt=""></img>
                  </Link>
                </div>
                <span onClick={() => handleRemoveCompareProduct(product._id)}>
                  <IoCloseOutline />
                </span>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
        <div className={cx("list-btns")}>
          <button onClick={handleClearCompareList}>clear all</button>
          <Link to='/compare'>compare</Link>
        </div>
      </div>
    </div>
  );
}

export default CompareBox;
