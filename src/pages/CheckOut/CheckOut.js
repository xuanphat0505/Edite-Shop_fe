import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import classNames from "classnames/bind";
import axios from "axios";

import useAxios from "../../hooks/useAxios";
import useAxiosJWT from "../../config/axiosConfig";
import { BASE_URL } from "../../config/utils";
import { toastError } from "../../shared/Toastify/Toastify";

import styles from "./CheckOut.module.scss";
const cx = classNames.bind(styles);
function CheckOut() {
  const location = useLocation();
  const navigate = useNavigate();
  const getAxiosJWT = useAxiosJWT();
  const axiosJWT = getAxiosJWT();
  const user = useSelector((state) => state.auth.user);
  const [deliveryInfo, setDeliveryInfo] = useState({
    contact: user?.email,
    country: "",
    address: "",
    city: "",
    firstName: "",
    lastName: "",
    suite: "",
    postalCode: "",
    phone: "",
  });
  const [cities, setCities] = useState([]);
  const [textError, setTextError] = useState("");
  const [zipCodeTimeout, setZipCodeTimeout] = useState(null);
  const [shippingFee, setShippingFee] = useState(null);
  const [shippingFeeLoading, setShippingFeeLoading] = useState(false);
  const { products, product, subTotalPrice, countValue, colorName } =
    location.state || {};
  const { data: countries } = useAxios(`${BASE_URL}/cities`);

  const searchCity = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/cities/search?country=${deliveryInfo.country}`
      );
      const result = await res.data;

      setCities(result.data);
    } catch (error) {}
  };

  const fetchShippingFee = async (postalCode, country) => {
    if (!postalCode || !country) {
      setTextError("Please fill in all required fields.");
      return;
    }
    setShippingFeeLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/cities/shipping-fee`, {
        country: country,
        postalCode: postalCode,
      });
      const result = res.data;
      if (result) {
        setTextError("");
        setShippingFee(result.data);
        setShippingFeeLoading(false);
      }
    } catch (error) {
      setShippingFee(null);
      setShippingFeeLoading(false);
      setTextError(error?.response.data.message);
    }
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setDeliveryInfo((prev) => ({ ...prev, [id]: value }));
    if (id === "postalCode") {
      if (zipCodeTimeout) {
        clearTimeout(zipCodeTimeout);
      }
      const timeout = setTimeout(() => {
        fetchShippingFee(value, deliveryInfo.country);
      }, 2000);
      setZipCodeTimeout(timeout);
    }
  };
  const handleCreateOrder = async () => {
    try {
      const res = await axiosJWT.post(
        `${BASE_URL}/orders/create`,
        {
          products: products,
          totalAmount: Number(subTotalPrice) + Number(shippingFee),
          shippingInfo: deliveryInfo,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
          withCredentials: true,
        }
      );
      const result = res.data;
      if (result.success) {
        navigate(`/payment-method`, {
          state: {
            orderId: result.data._id,
            totalAmount: result.data.totalAmount,
          },
        });
      }
    } catch (error) {
      return toastError(error?.response.data.message);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.state]);

  useEffect(() => {
    if (deliveryInfo.country !== "---") {
      searchCity();
    }
  }, [deliveryInfo.country]);
  console.log(user);
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
                  type="text"
                  required
                  id="contact"
                  placeholder=" "
                  onChange={handleChange}
                  value={deliveryInfo.contact}
                ></input>
                <label htmlFor="contact">Email or mobile phone number</label>
              </div>
              <div className={cx("checkbox")}>
                <input type="checkbox" id="checkbox-1"></input>
                <label htmlFor="checkbox-1">
                  Email me with news and offers
                </label>
              </div>
            </div>
            <div className={cx("delivery", "checkout-info_box")}>
              <h2>delivery</h2>
              <div className={cx("input-box")}>
                <select id="country" onChange={handleChange} placeholder=" ">
                  {countries.map((country) => (
                    <option key={country._id} value={country.country}>
                      {country.country}
                    </option>
                  ))}
                </select>
                <label htmlFor="country">Country/Region</label>
              </div>
              {cities.length > 0 && (
                <div className={cx("input-box")}>
                  <select id="city" onChange={handleChange} placeholder=" ">
                    {cities.map((city) => (
                      <option key={city._id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="city">City</label>
                </div>
              )}
              <div className={cx("two-input")}>
                <div className={cx("input-box")}>
                  <input
                    type="text"
                    id="firstName"
                    required
                    placeholder=" "
                    onChange={handleChange}
                  ></input>
                  <label htmlFor="firstName">First name (optional)</label>
                </div>
                <div className={cx("input-box")}>
                  <input
                    type="text"
                    required
                    id="lastName"
                    placeholder=" "
                    onChange={handleChange}
                  ></input>
                  <label htmlFor="lastName">Last name</label>
                </div>
              </div>
              <div className={cx("input-box")}>
                <input
                  type="text"
                  id="address"
                  required
                  onChange={handleChange}
                  placeholder=" "
                ></input>
                <label htmlFor="address">Address</label>
              </div>
              <div className={cx("input-box")}>
                <input
                  type="text"
                  id="suite"
                  onChange={handleChange}
                  placeholder=" "
                ></input>
                <label htmlFor="suite">Apartment, suite, etc. (optional)</label>
              </div>
              <div className={cx("input-box")}>
                <input
                  type="text"
                  id="phone"
                  onChange={handleChange}
                  placeholder=" "
                ></input>
                <label htmlFor="phone">Phone number</label>
              </div>
              <div className={cx("input-box")}>
                <input
                  type="text"
                  id="postalCode"
                  required
                  placeholder=" "
                  onChange={handleChange}
                  // value={deliveryInfo.postalCode}
                ></input>
                <label htmlFor="zip-code">zip code</label>
              </div>

              {textError && (
                <span className={cx("error-text")}>
                  <p>{textError}</p>
                </span>
              )}

              <div className={cx("checkbox")}>
                <input type="checkbox" id="checkbox-2" required></input>
                <label htmlFor="checkbox-2">
                  Save this information for next time
                </label>
              </div>
            </div>
            <div className={cx("shipping", "checkout-info_box")}>
              <h2>shipping method</h2>
              <div
                className={cx("text-box", {
                  loading: shippingFeeLoading,
                  active:
                    !shippingFeeLoading &&
                    shippingFee &&
                    deliveryInfo.postalCode,
                })}
              >
                {shippingFeeLoading ? (
                  // Skeleton loading UI
                  <div className={cx("skeleton-wrapper")}>
                    <Skeleton width={80} height={16} />
                    <Skeleton width={50} height={16} />
                  </div>
                ) : !deliveryInfo.postalCode || !shippingFee ? (
                  <p>
                    Enter your shipping address to view available shipping
                    methods.
                  </p>
                ) : (
                  <>
                    <p className={cx("shipping-type")}>standard</p>
                    <span>{Number(shippingFee).toLocaleString()}₫</span>
                  </>
                )}
              </div>
            </div>
            <div className={cx("payment", "checkout-info_box")}>
              <h2>payment</h2>
              <p>All transactions are secure and encrypted.</p>
            </div>
            <button
              className={cx({
                pay:
                  deliveryInfo.postalCode && shippingFee && !shippingFeeLoading,
              })}
              onClick={handleCreateOrder}
            >
              Pay now
            </button>
          </div>
          <div className={cx("checkout-products")}>
            <div className={cx("product-header")}>
              <h2>order summary</h2>
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
                          {Number(
                            product?.productId?.newPrice
                          ).toLocaleString()}
                          ₫
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
                      <span>{Number(product?.newPrice).toLocaleString()}₫</span>
                    </div>
                  </div>
                )}
              </div>
              <div className={cx("product-text")}>
                <div className={cx("sub-total", "info-box")}>
                  <span>Subtotal * {countValue} items </span>

                  <span>{Number(subTotalPrice).toLocaleString()}₫</span>
                </div>
                <div className={cx("shipping", "info-box")}>
                  <span>Shipping</span>
                  {shippingFeeLoading ? (
                    <Skeleton width={80} height={16} />
                  ) : shippingFee && !shippingFeeLoading ? (
                    <span>{Number(shippingFee).toLocaleString()}₫</span>
                  ) : (
                    <span className={cx("special")}>
                      Enter shipping address
                    </span>
                  )}
                </div>
                <div className={cx("total-box")}>
                  <span>total</span>
                  <div className={cx("total-price")}>
                    <p className={cx("currency")}>VNĐ</p>
                    <span>
                      {(
                        Number(subTotalPrice) + Number(shippingFee)
                      ).toLocaleString()}
                      ₫
                    </span>
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
