import { useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import classNames from "classnames/bind";
import Tippy from "@tippy.js/react";

import { OpenContext } from "../../contexts/OpenContext/OpenContext";
import { AxiosContext } from "../../contexts/AxiosContext/AxiosContext";
import Loader from "../../shared/Loader/Loader";

import styles from "./QuickShop.module.scss";
import { toastError } from "../../shared/Toastify/Toastify";
const cx = classNames.bind(styles);
function QuickShop() {
  const location = useLocation();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state?.auth?.user?.accessToken);
  const { openShop, handleCloseShop } = useContext(OpenContext);
  const { productDetail, handleAddToCart, addToCartLoading } =
    useContext(AxiosContext);

  const [countValue, setCountValue] = useState(1);
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [optionColorName, setOptionColorName] = useState("");

  useEffect(() => {
    if (productDetail && productDetail[0]?.optionColor[0]?.colorName) {
      setOptionColorName(productDetail[0]?.optionColor[0].colorName); // Update the state after productDetail is available
    }
  }, [productDetail]);
  const handleMouseEnter = (index) => {
    setOptionColorName(productDetail[0]?.optionColor[index].colorName);
    setHoveredIndex(index); // Set the index of the hovered element
  };

  const navigateToCheckOut = () => {
    if (!accessToken) {
      return toastError("You are not logged in yet");
    }
    navigate("/checkout", {
      state: {
        product: productDetail[0],
        countValue: countValue,
        subTotalPrice: Number(productDetail[0]?.newPrice) * countValue,
        colorName: optionColorName,
      },
    });
    handleCloseShop();
  };

  useEffect(() => {
    setCountValue(1);
  }, [productDetail]);

  return (
    <>
      <div
        className={cx("overlay", { active: openShop })}
        onClick={handleCloseShop}
      ></div>
      <section className={cx("quick-shop_section", { active: openShop })}>
        <div className={cx("quick-shop")}>
          <div className={cx("quick-shop_content")}>
            <div className={cx("product-header")}>
              <Link className={cx("quick-shop_image")}>
                <img src={productDetail[0]?.image} alt=""></img>
              </Link>
              <div className={cx("price-title")}>
                <Link>{productDetail[0]?.name}</Link>
                <div className={cx("price", "product-price")}>
                  {productDetail[0]?.sale ? (
                    <>
                      <del>${Number(productDetail[0]?.price).toFixed(2)}</del>
                      <ins>
                        ${Number(productDetail[0]?.newPrice).toFixed(2)}
                      </ins>
                    </>
                  ) : (
                    <span>
                      ${Number(productDetail[0]?.newPrice).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
            {productDetail[0]?.optionColor.length > 0 && (
              <>
                <div className={cx("color")}>
                  <h4>
                    color: <span>{optionColorName}</span>
                  </h4>
                </div>
                <div className={cx("option-colors", "quickshop-option_colors")}>
                  {productDetail[0]?.optionColor.map((option, index) => (
                    <Tippy
                      content={
                        <div className={cx("tootlip")} key={option._id}>
                          {option.colorName}
                        </div>
                      }
                    >
                      <span
                        className={cx("outer", "quick-shop_outer", {
                          active: hoveredIndex === index,
                        })}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onClick={() => handleMouseEnter(index)}
                      >
                        <span
                          className={cx("inner")}
                          style={{ backgroundColor: option?.code }}
                        ></span>
                      </span>
                    </Tippy>
                  ))}
                </div>
              </>
            )}

            <div className={cx("quick-shop_btns")}>
              <div className={cx("top")}>
                <div className={cx("quantity-wrap")}>
                  <button
                    onClick={() =>
                      setCountValue((prev) =>
                        prev <= 1 ? 1 : Number(prev - 1)
                      )
                    }
                  >
                    <FaMinus />
                  </button>
                  <input
                    type="number"
                    min={1}
                    value={countValue}
                    step={1}
                    onChange={(e) => setCountValue(e.target.value)}
                    defaultValue=""
                  ></input>
                  <button
                    onClick={() => setCountValue((prev) => Number(prev + 1))}
                  >
                    <FaPlus />
                  </button>
                </div>
                <button
                  className={cx("add-product")}
                  onClick={() =>
                    handleAddToCart(
                      productDetail[0]._id,
                      countValue,
                      optionColorName,
                      location.pathname === "/view-cart" ? false : true
                    )
                  }
                >
                  {addToCartLoading ? (
                    <Loader
                      size={17}
                      loading={addToCartLoading}
                      color="var(--background-color)"
                    />
                  ) : (
                    "Add to cart"
                  )}
                </button>
              </div>
              <div className={cx("bottom")}>
                <button onClick={navigateToCheckOut}>Buy it now</button>
              </div>
            </div>
            <div className={cx("view-detail")}>
              <Link to={`/product/${productDetail[0]?._id}`}>
                <span>View full detail</span>
                <FaLongArrowAltRight style={{ fontSize: "18px" }} />
              </Link>
            </div>
          </div>
          <button className={cx("quick-shop_close")} onClick={handleCloseShop}>
            <span>
              <IoClose />
            </span>
          </button>
        </div>
      </section>
    </>
  );
}

export default QuickShop;
