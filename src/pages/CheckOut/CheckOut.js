import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames/bind";

import paymentIcon from "../../assets/images/payment-icon.png";

import styles from "./CheckOut.module.scss";
const cx = classNames.bind(styles);
function CheckOut() {
  const location = useLocation();
  const [active, setActive] = useState(false);
  const { products, product, subTotalPrice, countValue, colorName } =
    location.state || {};
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.state]);

  return (
    <section className={cx("checkout-section")}>
      <div className={cx("checkout-container")}>
        <div className={cx("checkout-header")}>
          <Link to={"/"}>edite - shop</Link>
          <span>
            <Link to={"/view-cart"}>
              <svg viewBox="0 0 14 14" focusable="false" aria-hidden="true">
                <path d="M2.675 10.037 3.072 4.2h7.856l.397 5.837A2.4 2.4 0 0 1 8.932 12.6H5.069a2.4 2.4 0 0 1-2.394-2.563"></path>
                <path d="M4.9 3.5a2.1 2.1 0 1 1 4.2 0v1.4a2.1 2.1 0 0 1-4.2 0z"></path>
              </svg>
            </Link>
          </span>
        </div>
        <div className={cx("checkout-body")}>
          <div className={cx("checkout-info")}>
            <div className={cx("contact", "checkout-info_box")}>
              <h2>contact</h2>
              <div className={cx("input-box")}>
                <input
                  placeholder="Email or mobile phone number"
                  type="text"
                  required
                ></input>
              </div>
              <div className={cx("checkbox")}>
                <input type="checkbox" id="checkbox"></input>
                <label htmlFor="checkbox">Email me with news and offers</label>
              </div>
            </div>
            <div className={cx("delivery", "checkout-info_box")}>
              <h2>delivery</h2>
              <div className={cx("input-box")}>
                <select>
                  <option>poland</option>
                  <option>poland</option>
                  <option>poland</option>
                  <option>poland</option>
                </select>
                <label>Country/Region</label>
              </div>
              <div className={cx("input-box", "two-input")}>
                <input type="text" placeholder="First name (optional)"></input>
                <input type="text" placeholder="Last name" required></input>
              </div>
              <div className={cx("input-box")}>
                <input type="text" placeholder="Adress" required></input>
              </div>
              <div className={cx("input-box")}>
                <input
                  type="text"
                  placeholder="Apartment, suite, etc. (optional)"
                ></input>
              </div>
              <div className={cx("input-box", "two-input")}>
                <input type="text" placeholder="Postal code" required></input>
                <input type="text" placeholder="City" required></input>
              </div>
              <div className={cx("checkbox")}>
                <input type="checkbox" id="checkbox" required></input>
                <label htmlFor="checkbox">
                  Save this information for next time
                </label>
              </div>
            </div>
            <div className={cx("shipping", "checkout-info_box")}>
              <h2>shipping method</h2>
              <div className={cx("text-box")}>
                Enter your shipping address to view available shipping methods.
              </div>
            </div>
            <div className={cx("payment", "checkout-info_box")}>
              <h2>payment</h2>
              <p>All transactions are secure and encrypted.</p>
              <div className={cx("text-box", "text-image_box")}>
                <img src={paymentIcon} alt=""></img>
                This store can’t accept payments right now.
              </div>
            </div>
            <button>Pay now</button>
          </div>
          <div className={cx("checkout-products", { active: active })}>
            <div className={cx("product-header")}>
              <button type="button" onClick={() => setActive((prev) => !prev)}>
                {active ? "Hide" : "Show"} order summary
              </button>
            </div>
            <aside>
              <div className={cx("product-list")}>
                {products &&
                  products.map((product) => (
                    <div className={cx("product-item")}>
                      <div className={cx("product-image")}>
                        <img src={product?.productId?.image} alt=""></img>
                        <span>{product?.count}</span>
                      </div>
                      <div className={cx("product-info")}>
                        <p className={cx("name")}>{product?.productId?.name}</p>

                        {product.colorName ? (
                          <p className={cx("color-name")}>
                            {product.colorName}
                          </p>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className={cx("product-price")}>
                        <span>
                          $
                          {(
                            Number(product?.productId?.newPrice) *
                            product?.count
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                {product && (
                  <div className={cx("product-item")}>
                    <div className={cx("product-image")}>
                      <img src={product?.image} alt=""></img>
                      <span>{countValue}</span>
                    </div>
                    <div className={cx("product-info")}>
                      <p className={cx("name")}>{product?.name}</p>

                      {colorName ? (
                        <p className={cx("color-name")}>{colorName}</p>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className={cx("product-price")}>
                      <span>
                        ${(Number(product?.newPrice) * countValue).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className={cx("product-text")}>
                <div className={cx("sub-total", "info-box")}>
                  <span>Subtotal * {countValue} items </span>

                  <span>${subTotalPrice.toFixed(2)}</span>
                </div>
                <div className={cx("shipping", "info-box")}>
                  <span>Shipping</span>
                  <span className={cx("special")}>Enter shipping address</span>
                </div>
                <div className={cx("total-box")}>
                  <span>total</span>
                  <div className={cx("total-price")}>
                    <p className={cx("currency")}>USD</p>
                    <span>${subTotalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CheckOut;
