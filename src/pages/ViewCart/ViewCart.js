import { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { LuTrash } from "react-icons/lu";
import { FaPencilAlt } from "react-icons/fa";
import classNames from "classnames/bind";
import Tippy from "@tippy.js/react";

import useAxiosJWT from "../../config/axiosConfig";
import Loader from "../../shared/Loader/Loader";
import { BASE_URL } from "../../config/utils";
import { OpenContext } from "../../contexts/OpenContext/OpenContext";
import { AxiosContext } from "../../contexts/AxiosContext/AxiosContext";
import { toastSuccess } from "../../shared/Toastify/Toastify";

import styles from "./ViewCart.module.scss";
const cx = classNames.bind(styles);
function ViewCart() {
  const user = useSelector((state) => state?.auth.user);
  const getAxiostJWT = useAxiosJWT();
  const axiosJWT = getAxiostJWT();
  const navigate = useNavigate();
  const {
    updateCartLoading,
    subTotalPrice,
    productsInCart,
    noteInCart,
    handleRemoveProductInCart,
    handleIncreaseProductInCart,
    handleDecreaseProductInCart,
    handleGetProductDetail,
  } = useContext(AxiosContext);
  const { handleOpenShop } = useContext(OpenContext);
  const [textNote, setTextNote] = useState(noteInCart);

  const handleNavigate = () => {
    navigate("/checkout", {
      state: {
        products: productsInCart,
        subTotalPrice: subTotalPrice,
        countValue: productsInCart?.reduce((acc, item) => acc + item.count, 0),
      },
    });
  };

  const handleUpdateCart = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosJWT.post(
        `${BASE_URL}/cart/update`,
        { note: textNote },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
          withCredentials: true,
        }
      );
      const result = res.data;
      if (result.success) {
        toastSuccess(result.message);
      }
      window.location.reload();
    } catch (error) {
      return alert(error?.response?.data.message);
    }
  };

  const handleGetAndOpen = (id) => {
    handleOpenShop();
    handleGetProductDetail(id);
  };

  useEffect(() => {
    setTextNote(noteInCart);
  }, [noteInCart]);

  return (
    <section className={cx("view-cart_section")}>
      <div className={cx("heading-container")}>
        <h1>shopping cart</h1>
      </div>
      <div className={cx("view-cart_container")}>
        <form onSubmit={handleUpdateCart}>
          <div className={cx("col-left", "col")}>
            <div className={cx("cart-header")}>
              <div className={cx("cart-title", "first-cart_title")}>
                product
              </div>
              <div className={cx("cart-title")}>price</div>
              <div className={cx("cart-title")}>quatity</div>
              <div className={cx("cart-title")}>total</div>
              <div className={cx("cart-title", "last-cart_title")}></div>
            </div>
            <div className={cx("cart-list")}>
              {productsInCart.map((product) => (
                <div
                  className={cx("cart-item", {
                    active: updateCartLoading === product.productId._id,
                  })}
                  key={product.productId._id}
                >
                  <div className={cx("image-name")}>
                    <div className={cx("cart-image")}>
                      <img src={product?.productId.image} alt=""></img>
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
                    </div>
                    <div className={cx("cart-name")}>
                      <Link
                        to={`/product/${product.productId._id}`}
                        className={cx("name")}
                      >
                        {product.productId.name}
                      </Link>
                      {product.colorName && (
                        <div
                          className={cx(
                            "colorName-container",
                            "cart-colorName"
                          )}
                        >
                          <div className={cx("color-category")}>
                            Color:
                            <span>{product.colorName}</span>
                          </div>
                          <Link
                            className={cx("edit-item")}
                            onClick={() =>
                              handleGetAndOpen(product.productId._id)
                            }
                          >
                            <FaPencilAlt />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={cx("cart-price_container", "product-price ")}>
                    {product.productId.sale ? (
                      <>
                        <del>${Number(product.productId.price).toFixed(2)}</del>
                        <ins>
                          ${Number(product.productId.newPrice).toFixed(2)}
                        </ins>
                      </>
                    ) : (
                      <span>
                        ${Number(product.productId.newPrice).toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className={cx("quantity-container")}>
                    <div className={cx("cart-quantity", "quantity")}>
                      <button
                        type="button"
                        onClick={() =>
                          handleDecreaseProductInCart(product.productId._id)
                        }
                      >
                        <FaMinus />
                      </button>
                      <input
                        type="number"
                        min={1}
                        step={1}
                        value={product.count}
                      ></input>
                      <button
                        type="button"
                        onClick={() =>
                          handleIncreaseProductInCart(product.productId._id)
                        }
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                  <div className={cx("total-container")}>
                    <span>
                      $
                      {Number(
                        product.count * product.productId.newPrice
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className={cx("remove-item_container")}>
                    <Tippy
                      content={
                        <div className={cx("tootlip")}>Remove this item</div>
                      }
                    >
                      <Link
                        onClick={() =>
                          handleRemoveProductInCart(product.productId._id)
                        }
                      >
                        <LuTrash />
                      </Link>
                    </Tippy>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={cx("col-right", "col")}>
            <div className={cx("note-coupon_container")}>
              <div className={cx("note-container")}>
                <h3>add order note</h3>
                <div className={cx("text-group")}>
                  <textarea
                    placeholder="How can we help you?"
                    value={textNote}
                    onChange={(e) => setTextNote(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className={cx("coupon-container")}>
                <h3>coupon: </h3>
                <p>Coupon code will work on checkout page</p>
                <div className={cx("input-group")}>
                  <input type="text" placeholder="Coupon code"></input>
                </div>
              </div>
              <div className={cx("subtotal-container")}>
                <div className={cx("subtotal-box")}>
                  <strong>subtotal:</strong>
                  <span>${Number(subTotalPrice)?.toFixed(2)} USD</span>
                </div>
                <p style={{ marginBottom: "10px" }}>
                  Tax included and shipping calculated at checkout
                </p>
                <div className={cx("condition-checkbox")}>
                  <input type="checkbox" id="cart-agree"></input>
                  <label htmlFor="cart-agree">
                    I agree with the terms and conditions.
                  </label>
                </div>
              </div>
              <button type="submit">update cart</button>
              <button type="button" onClick={handleNavigate}>check out</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ViewCart;
