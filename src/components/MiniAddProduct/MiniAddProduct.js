import { useContext, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import classNames from "classnames/bind";

import { AxiosContext } from "../../contexts/AxiosContext/AxiosContext";
import Loader from "../../shared/Loader/Loader";

import styles from "./MiniAddProduct.module.scss";
const cx = classNames.bind(styles);
function MiniAddProduct({
  scroll,
  productDetail,
  countValue,
  setCountValue,
  optionColorName,
  handleImageClick,
  currentImageIndex,
}) {
  const { handleAddToCart, addToCartLoading } = useContext(AxiosContext);
  const [openOptionColor, setOpenOptionColor] = useState(false);

  return (
    <div className={cx("add-product_box", { active: scroll })}>
      <div className={cx("product-mini")}>
        <div className={cx("product-mini_image")}>
          <img
            src={productDetail?.subImage[currentImageIndex - 1]?.src}
            alt=""
          ></img>
        </div>
        <div className={cx("product-mini_info")}>
          <h5>{productDetail?.name}</h5>
          <div className={cx("product-mini_price", "product-price")}>
            {productDetail?.sale ? (
              <>
                <del style={{ color: "#8686868" }}>
                  ${Number(productDetail?.price).toLocaleString()}
                </del>
                <ins>${Number(productDetail?.newPrice).toLocaleString()}</ins>
              </>
            ) : (
              `$${Number(productDetail?.newPrice).toLocaleString()}`
            )}
          </div>
        </div>
        {productDetail?.optionColor.length > 0 ? (
          <div
            className={cx("product-mini_option")}
            onClick={() => setOpenOptionColor((prev) => !prev)}
          >
            <div className={cx("option-dropdown")}>
              <span>{optionColorName}</span>
              <IoMdArrowDropdown className={cx("dropdown-icon")} />
            </div>
            <div className={cx("sub-option", { active: openOptionColor })}>
              <ul>
                {productDetail?.optionColor.map((color, index) => (
                  <li
                    key={color?._id}
                    onClick={() =>
                      handleImageClick(
                        color.optionImageId,
                        color.optionImageId,
                        color.colorName
                      )
                    }
                    className={cx(
                      optionColorName === color.colorName ? "active" : ""
                    )}
                  >
                    {color.colorName}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className={cx("product-mini_option")}></div>
        )}
      </div>
      <div className={cx("add-btns")}>
        <div className={cx("quantity", "product-mini_quantity")}>
          <button
            onClick={() =>
              setCountValue((prev) => (prev === 1 ? prev : prev - 1))
            }
          >
            <FaMinus />
          </button>
          <input type="number" min={1} step={1} value={countValue}></input>
          <button onClick={() => setCountValue((prev) => prev + 1)}>
            <FaPlus />
          </button>
        </div>
        <button
          className={cx("product-mini_btn", "sway-btn")}
          onClick={() =>
            handleAddToCart(productDetail?._id, countValue, optionColorName)
          }
        >
          {addToCartLoading === productDetail?._id ? (
            <Loader size={18} color="var(--background-color)" />
          ) : (
            "add to cart"
          )}
        </button>
      </div>
    </div>
  );
}

export default MiniAddProduct;
