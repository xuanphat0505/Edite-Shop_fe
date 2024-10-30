import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart, FaCheck } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { HiMiniArrowsRightLeft } from "react-icons/hi2";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import classNames from "classnames/bind";
import Tippy from "@tippy.js/react";

import { AxiosContext } from "../../contexts/AxiosContext/AxiosContext";
import Loader from "../Loader/Loader";

import styles from "./ProductBox2.module.scss";
const cx = classNames.bind(styles);
function ProductBox2({
  product,
  isFavorite,
  isWishListPage,
  removeFavoriteProducts = () => {},
}) {
  const {
    clicked,
    compareLoading,
    addToCartLoading,
    quickShopLoading,
    handleAddToWishList,
    handleAddToCompare,
    isInCompareList,
    handleGetProductDetail,
    handleAddToCart,
  } = useContext(AxiosContext);
  const [isActive, setIsActive] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const [optionColorName, setOptionColorName] = useState("");
  const subImageHover = product?.subImage[1];

  const handleOptionColorName = (colorName, index) => {
    setOptionColorName(colorName);
    setIsActive(index);
  };
  return (
    <div className={cx("product-box")}>
      <div
        className={cx("product-image")}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <img src={isHover ? subImageHover?.src : product.image} alt=""></img>
        <div className={cx("product-icons")}>
          <Tippy
            placement="left"
            content={<div className={cx("tootlip")}>Quick shop</div>}
          >
            <span
              className={cx("icon")}
              onClick={() => handleGetProductDetail(product._id)}
            >
              {quickShopLoading === product._id ? (
                <Loader size={17} loading={quickShopLoading === product._id} />
              ) : (
                <IoEyeOutline />
              )}
            </span>
          </Tippy>
          <Tippy
            placement="left"
            content={<div className={cx("tootlip")}>Compare</div>}
          >
            <span
              className={cx("icon")}
              onClick={() => handleAddToCompare(product._id)}
            >
              {compareLoading === product._id ? (
                <Loader size={17} loading={compareLoading} />
              ) : isInCompareList(product._id) ? (
                <FaCheck />
              ) : (
                <HiMiniArrowsRightLeft />
              )}
            </span>
          </Tippy>
        </div>
        {product.sale ? (
          <span className={cx("sale-box")}>{product.sale}%</span>
        ) : (
          <></>
        )}
      </div>
      <div className={cx("product-responsive")}>
        <Tippy
          placement="top"
          content={<div className={cx("tootlip")}>Quick view</div>}
        >
          <span onClick={() => handleGetProductDetail(product._id)}>
            {quickShopLoading === product._id ? (
              <Loader size={17} loading={quickShopLoading === product._id} />
            ) : (
              <IoEyeOutline />
            )}
          </span>
        </Tippy>
        <Tippy
          placement="top"
          content={<div className={cx("tootlip")}>Compare</div>}
        >
          <span onClick={() => handleAddToCompare(product._id)}>
            {compareLoading === product._id ? (
              <Loader size={17} loading={compareLoading} />
            ) : isInCompareList(product._id) ? (
              <FaCheck />
            ) : (
              <HiMiniArrowsRightLeft />
            )}
          </span>
        </Tippy>
      </div>
      <div className={cx("product-info")}>
        <div className={cx("main-info")}>
          <Link to={`/product/${product._id}`}>{product.name}</Link>
          <div
            className={cx("option-colors")}
            style={{
              textAlign: "left",
              marginTop: "0",
              marginBottom: "6px",
              minHeight: 0,
            }}
          >
            {product.optionColor ? (
              product.optionColor?.map((option, index) => (
                <Tippy
                  content={
                    <div className={cx("tootlip")}>{option.colorName}</div>
                  }
                  key={index}
                >
                  <span
                    className={cx("outer", isActive === index ? "active" : "")}
                    onMouseEnter={() =>
                      handleOptionColorName(option.colorName, index)
                    }
                    onClick={() =>
                      handleOptionColorName(option.colorName, index)
                    }
                  >
                    <span
                      className={cx("inner")}
                      style={{ backgroundColor: option.code }}
                    ></span>
                  </span>
                </Tippy>
              ))
            ) : (
              <></>
            )}
          </div>
          <p className={cx("product-desc")}>{product.shortDescription}</p>
        </div>
        <div className={cx("product-btns")}>
          <div className={cx("product-price", "product2-price")}>
            {product?.sale ? (
              <>
                <del>${Number(product?.price).toFixed(2)}</del>
                <ins>${Number(product?.newPrice).toFixed(2)}</ins>
              </>
            ) : (
              `$${Number(product.newPrice).toFixed(2)}`
            )}
          </div>
          <Tippy
            placement="left"
            content={<div className={cx("tootlip")}>Add to cart</div>}
          >
            <div
              className={cx("product-btn", "cart-btn", {
                clicked: clicked === product._id,
              })}
              onClick={() => handleAddToCart(product._id, 1, optionColorName)}
            >
              {addToCartLoading === product._id ? (
                <Loader size={17} loading={addToCartLoading === product._id} />
              ) : (
                <>
                  <PiShoppingCartSimpleBold style={{ fontSize: "18px" }} />
                  <span>Add to Cart</span>
                </>
              )}
            </div>
          </Tippy>
          {isWishListPage && (
            <Tippy
              placement="left"
              content={<div className={cx("tootlip")}>Remove WishList</div>}
            >
              <div
                className={cx("product-btn", "wishlist-btn")}
                onClick={() => removeFavoriteProducts(product._id)}
              >
                <FaRegTrashAlt style={{ fontSize: "18px" }} />
                <span>Remove Wishist</span>
              </div>
            </Tippy>
          )}
          {!isWishListPage && (
            <Tippy
              placement="left"
              content={
                <div className={cx("tootlip")}>
                  {isFavorite ? "Browse Wishist" : "Add to wishList"}
                </div>
              }
            >
              <div
                className={cx("product-btn", "wishlist-btn")}
                style={isFavorite ? { color: "#000" } : {}}
                onClick={() => handleAddToWishList(product._id)}
              >
                {isFavorite ? (
                  <FaHeart style={{ fontSize: "18px" }} />
                ) : (
                  <FaRegHeart style={{ fontSize: "18px" }} />
                )}
                <span>
                  {isFavorite ? "Browse Wishlist" : "Add to Wishlist"}
                </span>
              </div>
            </Tippy>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductBox2;
