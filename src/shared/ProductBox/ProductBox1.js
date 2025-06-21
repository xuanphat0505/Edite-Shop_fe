import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { LuEye } from "react-icons/lu";
import { HiMiniArrowsRightLeft } from "react-icons/hi2";
import Tippy from "@tippy.js/react";
import classNames from "classnames/bind";

import { AxiosContext } from "../../contexts/AxiosContext/AxiosContext";
import { OpenContext } from "../../contexts/OpenContext/OpenContext";
import Loader from "../Loader/Loader";

import styles from "./ProductBox1.module.scss";
const cx = classNames.bind(styles);
function ProductBox1({ product, index, isFavorite, inCompareList }) {
  const {
    compareLoading,
    addToCartLoading,
    quickShopLoading,
    wishListLoading,
    isInWishList,
    isInCompareList,
    handleAddToWishList,
    handleAddToCompare,
    handleFindProductDetail,
    handleAddToCart,
  } = useContext(AxiosContext);
  const { handleOpenCompare, handleOpenShop } = useContext(OpenContext);
  const [activeOptionColor, setActiveOptionColor] = useState(0);
  const [hoverOptionImage, setHoverOptionImage] = useState(null);
  const [optionColorName, setOptionColorName] = useState("");
  const [isHover, setIsHover] = useState(false);
  const subImageHover = product?.subImage[1];
  const mainImage = product?.image;

  const getSubImageByOptionId = (optionImageId) => {
    const subImage = product?.subImage.find(
      (image) => image.id === optionImageId
    );
    return subImage ? subImage.src : null;
  };
  const handleOptionColorHover = (optionImageId, index, colorName) => {
    if (colorName !== optionColorName) {
      const subImageSrc = getSubImageByOptionId(optionImageId);
      setOptionColorName(colorName);
      setHoverOptionImage(subImageSrc);
      setActiveOptionColor(index);
    }
  };
  const handleOptionColorClick = (optionImageId, index, colorName) => {
    if (colorName !== optionColorName || activeOptionColor !== index) {
      handleOptionColorHover(optionImageId, index, colorName);
    }
  };
  const handleOptionColorLeave = () => {
    setHoverOptionImage(null); // Remove the active class when not hovering
  };
  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);

  const handleFindAndOpenShop = (id) => {
    handleOpenShop();
    handleFindProductDetail(id);
  };
  const displayedImage =
    hoverOptionImage ||
    (isHover
      ? subImageHover?.src
      : getSubImageByOptionId(
          product?.optionColor[activeOptionColor]?.optionImageId
        )) ||
    mainImage;
  return (
    <div className={cx("product-box")}>
      <div
        className={cx("product-image")}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img src={displayedImage} alt=""></img>
        <Tippy
          content={
            <div className={cx("tootlip")}>
              {isFavorite || isInWishList(index)
                ? "Browse Wishlist"
                : "Add to Wishlist"}
            </div>
          }
        >
          <span
            onClick={() => {
              if (!isInWishList(index)) {
                handleAddToWishList(product._id);
              }
            }}
            className={cx("heart-icon")}
          >
            {wishListLoading === product?._id ? (
              <Loader size={17} loading={wishListLoading === product?._id} />
            ) : isFavorite || isInWishList(index) ? (
              <FaHeart />
            ) : (
              <FaRegHeart />
            )}
          </span>
        </Tippy>
        {product?.sale ? (
          <span className={cx("sale-box")}>{product?.sale}%</span>
        ) : (
          <></>
        )}
        <div className={cx("buttons")}>
          <Tippy content={<div className={cx("tootlip")}>Add to cart</div>}>
            <div
              className={cx("btn")}
              onClick={() => handleAddToCart(product._id, 1, optionColorName)}
            >
              {addToCartLoading ? (
                <Loader loading={addToCartLoading} size={17} />
              ) : (
                <PiShoppingCartSimpleBold />
              )}
            </div>
          </Tippy>
          <Tippy content={<div className={cx("tootlip")}>Quick shop</div>}>
            <div
              className={cx("btn")}
              onClick={() => handleFindAndOpenShop(index)}
            >
              {quickShopLoading === product?._id ? (
                <Loader loading={quickShopLoading === product?._id} size={17} />
              ) : (
                <LuEye />
              )}
            </div>
          </Tippy>
          <Tippy
            content={<div className={cx("tootlip")}>Compare products</div>}
          >
            <div
              className={cx("btn")}
              onClick={() => handleAddToCompare(index)}
            >
              {compareLoading === product?._id ? (
                <Loader size={17} loading={true} />
              ) : inCompareList || isInCompareList(index) ? (
                <FaCheck onClick={handleOpenCompare} />
              ) : (
                <HiMiniArrowsRightLeft />
              )}
            </div>
          </Tippy>
        </div>
      </div>
      <div className={cx("product-info")}>
        <div className={cx("buttons", "responsive")}>
          <Tippy content={<div className={cx("tootlip")}>Add to cart</div>}>
            <div
              className={cx("btn")}
              onClick={() => handleAddToCart(product._id, 1, optionColorName)}
            >
              {addToCartLoading === product?._id ? (
                <Loader size={17} loading={addToCartLoading === product?._id} />
              ) : (
                <PiShoppingCartSimpleBold />
              )}
            </div>
          </Tippy>
          <Tippy content={<div className={cx("tootlip")}>Quick shop</div>}>
            <div
              className={cx("btn")}
              onClick={() => handleFindAndOpenShop(product._id)}
            >
              {quickShopLoading === product?._id ? (
                <Loader size={17} loading={quickShopLoading === product?._id} />
              ) : (
                <LuEye />
              )}
            </div>
          </Tippy>
          <Tippy content={<div className={cx("tootlip")}>Compare</div>}>
            <div
              className={cx("btn")}
              onClick={() => handleAddToCompare(index)}
            >
              {compareLoading === product?._id ? (
                <Loader size={17} loading={true} />
              ) : inCompareList || isInCompareList(index) ? (
                <FaCheck onClick={handleOpenCompare} />
              ) : (
                <HiMiniArrowsRightLeft />
              )}
            </div>
          </Tippy>
        </div>
        <Link to={`/product/${product?._id}`}>{product?.name}</Link>
        <div className={cx("product-price")}>
          {product?.sale ? (
            <>
              <del>{Number(product?.price).toLocaleString()}₫</del>
              <ins>{Number(product?.newPrice).toLocaleString()}₫</ins>
            </>
          ) : (
            `${Number(product?.newPrice).toLocaleString()}₫`
          )}
        </div>
        <div className={cx("option-colors")}>
          {product?.optionColor ? (
            product?.optionColor?.map((option, index) => (
              <Tippy
                key={index}
                content={
                  <div className={cx("tootlip")}>{option.colorName}</div>
                }
              >
                <span
                  className={cx("outer", {
                    active: activeOptionColor === index,
                  })}
                  onMouseEnter={() =>
                    handleOptionColorHover(
                      option?.optionImageId,
                      index,
                      option.colorName
                    )
                  }
                  onMouseLeave={handleOptionColorLeave}
                  onClick={() =>
                    handleOptionColorClick(
                      option?.optionImageId,
                      index,
                      option.colorName
                    )
                  }
                >
                  <span
                    className={cx("inner")}
                    style={{ backgroundColor: option?.code }}
                  ></span>
                </span>
              </Tippy>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductBox1;
