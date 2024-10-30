import { useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCheck, FaMinus, FaPlus, FaPencilAlt } from "react-icons/fa";
import { LuTrash } from "react-icons/lu";
import { toast } from "react-toastify";
import classNames from "classnames/bind";
import Tippy from "@tippy.js/react";

import { toastError } from "../../shared/Toastify/Toastify";
import { OpenContext } from "../../contexts/OpenContext/OpenContext";
import { AxiosContext } from "../../contexts/AxiosContext/AxiosContext";
import Loader from "../../shared/Loader/Loader";

import styles from "./Cart.module.scss";
const cx = classNames.bind(styles);
function Cart() {
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state?.auth?.user?.accessToken);
  const { openCart, handleCloseCart, handleOpenShop } = useContext(OpenContext);
  const {
    subTotalPrice,
    productsInCart,
    updateCartLoading,
    handleRemoveProductInCart,
    handleIncreaseProductInCart,
    handleDecreaseProductInCart,
    handleGetProductDetail,
  } = useContext(AxiosContext);

  const [checkedValue, setCheckedValue] = useState(false);

  const handleNavigateToViewCart = () => {
    navigate("/view-cart");
    handleCloseCart();
  };
  const handleNavigateToCheckout = () => {
    if (!accessToken) {
      return toastError("You are not logged in yet");
    }
    if (!checkedValue) {
      return toast.warn(
        "You must agree with the terms and conditions of sales to check out.",
        {
          position: "bottom-center",
          className: "toast-full-width",
          autoClose: 2000,
          pauseOnHover: false,
        }
      );
    }
    if (checkedValue && productsInCart.length >= 0) {
      navigate("/checkout", {
        state: {
          products: productsInCart,
          subTotalPrice: subTotalPrice,
          countValue: productsInCart?.reduce(
            (acc, item) => acc + item.count,
            0
          ),
        },
      });
      handleCloseCart();
    }
  };
  const handleGetAndOpen = (id) => {
    handleGetProductDetail(id);
    handleOpenShop();
  };
  useEffect(() => {
    openCart
      ? document.body.classList.add(cx("no-scroll"))
      : document.body.classList.remove(cx("no-scroll"));
  }, [openCart]);

  return (
    <>
      <div
        className={cx("overlay", openCart ? "active" : "")}
        onClick={handleCloseCart}
      ></div>
      <section className={cx("cart-section", openCart ? "active" : "")}>
        <div className={cx("cart-container")}>
          <aside className={cx(updateCartLoading ? "active" : "")}>
            <div className={cx("cart-header")}>
              <h3>shopping cart ({productsInCart.length})</h3>
              <button onClick={handleCloseCart} className={cx("close-btn")}>
                close
                <div className={cx("line")}></div>
              </button>
            </div>
            {productsInCart.length > 0 ? (
              <>
                <div className={cx("cart-body")}>
                  <div className={cx("cart-content")}>
                    <div className={cx("cart-list")}>
                      {productsInCart.map((product, index) => (
                        <div className={cx("cart-box")} key={index}>
                          <Link className={cx("product-image")}>
                            <img src={product?.productId?.image} alt=""></img>
                            {updateCartLoading === product.productId?._id ? (
                              <div className={cx("loader-box")}>
                                <Loader
                                  size={20}
                                  loading={
                                    updateCartLoading === product.productId?._id
                                  }
                                />
                              </div>
                            ) : (
                              <></>
                            )}
                          </Link>
                          <div className={cx("cart-desc")}>
                            <Link className={cx("name-product")}>
                              {product?.productId?.name}
                            </Link>
                            {product.colorName && (
                              <div className={cx("colorName-container")}>
                                <div className={cx("color-category")}>
                                  Color:
                                  <span>{product?.colorName}</span>
                                </div>
                                <Link
                                  className={cx("edit-item")}
                                  onClick={() =>
                                    handleGetAndOpen(product?.productId?._id)
                                  }
                                >
                                  <FaPencilAlt />
                                </Link>
                              </div>
                            )}
                            <div className={cx("price-box", "product-price")}>
                              {product?.productId?.sale ? (
                                <>
                                  <del>
                                    $
                                    {Number(product?.productId?.price).toFixed(
                                      2
                                    )}
                                  </del>
                                  <ins>
                                    $
                                    {Number(
                                      product?.productId?.newPrice
                                    ).toFixed(2)}
                                  </ins>
                                </>
                              ) : (
                                <span>
                                  $
                                  {Number(product?.productId?.newPrice).toFixed(
                                    2
                                  )}
                                </span>
                              )}
                            </div>
                            <div className={cx("cart-actions")}>
                              <div className={cx("cart-quantity")}>
                                <button
                                  className={cx("minus")}
                                  onClick={() =>
                                    handleDecreaseProductInCart(
                                      product.productId?._id
                                    )
                                  }
                                >
                                  <FaMinus />
                                </button>
                                <input
                                  type="number"
                                  step={1}
                                  min={0}
                                  inputMode="numeric"
                                  value={product.count}
                                ></input>
                                <button
                                  className={cx("plus")}
                                  onClick={() =>
                                    handleIncreaseProductInCart(
                                      product.productId?._id
                                    )
                                  }
                                >
                                  <FaPlus />
                                </button>
                              </div>
                            </div>
                            <Tippy
                              content={
                                <div className={cx("tootlip")}>
                                  Remove this item
                                </div>
                              }
                              placement="top"
                              flip={false}
                            >
                              <span
                                className={cx("remove-item")}
                                onClick={() =>
                                  handleRemoveProductInCart(
                                    product?.productId?._id
                                  )
                                }
                              >
                                <LuTrash />
                              </span>
                            </Tippy>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className={cx("cart-options")}>
                      <div className={cx("option-container")}>
                        <Tippy
                          content={
                            <div className={cx("tootlip")}>Edit Order Note</div>
                          }
                        >
                          <div className={cx("option")}>
                            <svg>
                              <path
                                d="M3,14h3c0.27,0,0.52-0.11,0.71-0.29l9-9c0.39-0.39,0.39-1.02,0-1.41l-3-3c-0.39-0.39-1.02-0.39-1.41,0l-9,9
            C2.11,9.48,2,9.73,2,10v3C2,13.55,2.45,14,3,14z M12,2.41L13.59,4L12,5.59L10.41,4L12,2.41z M4,10.41l5-5L10.59,7l-5,5H4V10.41z
             M18,16v2H0v-2H18z"
                              ></path>
                            </svg>
                          </div>
                        </Tippy>
                        <Tippy
                          content={
                            <div className={cx("tootlip")}>
                              Estimate shipping
                            </div>
                          }
                        >
                          <div className={cx("option")}>
                            <svg>
                              <path
                                id="bee-truck"
                                d="M21.71,9.29l-3-3C18.52,6.11,18.27,6,18,6h-3V3c0-0.55-0.45-1-1-1H1C0.45,2,0,2.45,0,3v14c0,0.55,0.45,1,1,1
            h1.18C2.6,19.16,3.7,20,5,20s2.4-0.84,2.82-2h5.37c0.41,1.16,1.51,2,2.82,2s2.4-0.84,2.82-2H21c0.55,0,1-0.45,1-1v-7
            C22,9.73,21.89,9.48,21.71,9.29z M2,4h11v12H7.82C7.4,14.84,6.3,14,5,14s-2.4,0.84-2.82,2H2V4z M5,18c-0.55,0-1-0.45-1-1s0.45-1,1-1
            s1,0.45,1,1S5.55,18,5,18z M16,18c-0.55,0-1-0.45-1-1s0.45-1,1-1s1,0.45,1,1S16.55,18,16,18z M20,16h-1.18c-0.41-1.16-1.51-2-2.82-2
            c-0.35,0-0.69,0.07-1,0.18V8h2.59L20,10.41V16z"
                              ></path>
                            </svg>
                          </div>
                        </Tippy>
                        <Tippy
                          content={
                            <div className={cx("tootlip")}>Add a coupon</div>
                          }
                        >
                          <div className={cx("option")}>
                            <svg>
                              <g>
                                <path
                                  d="M8,18c-0.26,0-0.51-0.1-0.71-0.29l-7-7c-0.39-0.39-0.39-1.02,0-1.41l9-9C9.48,0.11,9.73,0,10,0h7c0.55,0,1,0.45,1,1v7
              c0,0.27-0.11,0.52-0.29,0.71l-9,9C8.51,17.9,8.26,18,8,18z M2.41,10L8,15.59l8-8V2h-5.59L2.41,10z"
                                ></path>
                              </g>
                              <g>
                                <path d="M12,8c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S13.1,8,12,8z M12,6L12,6L12,6z"></path>
                              </g>
                            </svg>
                          </div>
                        </Tippy>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cx("cart-footer")}>
                  <div className={cx("total")}>
                    <strong>subtotal:</strong>
                    <span>${Number(subTotalPrice).toFixed(2)} USD</span>
                  </div>
                  <div className={cx("checkbox")}>
                    <input
                      type="checkbox"
                      id="check-box"
                      defaultValue=""
                      onChange={(e) => setCheckedValue(e.target.checked)}
                    ></input>
                    <label htmlFor="check-box">
                      I agree with the terms and conditions.
                      <i>
                        <FaCheck />
                      </i>
                    </label>
                  </div>
                  <div className={cx("cart-btns")}>
                    <button onClick={handleNavigateToViewCart}>
                      view cart
                    </button>
                    <button onClick={handleNavigateToCheckout}>
                      check out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className={cx("blank")}>
                <p>Your cart is empty.</p>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}

export default Cart;
