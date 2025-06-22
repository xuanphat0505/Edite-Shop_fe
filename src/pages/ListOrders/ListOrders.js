import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  FaCheckCircle,
  FaShoppingBag,
  FaSpinner,
  FaTruck,
  FaTimesCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import useAxiosJWT from "../../config/axiosConfig";
import { BASE_URL } from "../../config/utils";

import styles from "./ListOrders.module.scss";
const cx = classNames.bind(styles);

const getStatusIcon = (status) => {
  switch (status.toLowerCase()) {
    case "completed":
      return <FaCheckCircle />;
    case "processing":
      return <FaSpinner />;
    case "shipping":
      return <FaTruck />;
    case "cancelled":
      return <FaTimesCircle />;
    default:
      return <FaSpinner />;
  }
};

const getStatusText = (status) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "Hoàn thành";
    case "processing":
      return "Đang xử lý";
    case "shipping":
      return "Đang giao hàng";
    case "cancelled":
      return "Đã hủy";
    default:
      return status;
  }
};

function ListOrders() {
  const getAxiosJWT = useAxiosJWT();
  const axiosJWT = getAxiosJWT();
  const [orders, setOrders] = useState([]);

  const user = useSelector((state) => state?.auth?.user);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosJWT.get(`${BASE_URL}/orders`, {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        });
        const result = response.data;
        if (result.success) {
          setOrders(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, [user]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [orders]);
  return (
    <section className={cx("product-is-paid")}>
      <div className={cx("container")}>
        <div className={cx("header")}>
          <h1>Đơn Hàng Của Bạn</h1>
          <p>Xem lại các đơn hàng của bạn</p>
        </div>

        <div className={cx("orders-list")}>
          {orders.map((order) => (
            <div key={order._id} className={cx("order-card")}>
              <div className={cx("order-header")}>
                <div className={cx("order-info")}>
                  <span className={cx("order-date")}>
                    Ngày đặt hàng:{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                  <span className={cx("order-id")}>
                    Mã đơn hàng: #{order._id}
                  </span>
                </div>
                <div className={cx("order-status", order.status)}>
                  {getStatusIcon(order.status)}
                  <span>{getStatusText(order.status)}</span>
                </div>
              </div>

              <div className={cx("products-list")}>
                {order.products.map((product) => (
                  <div
                    key={product.productId._id}
                    className={cx("product-item")}
                  >
                    <div className={cx("product-image")}>
                      <img
                        src={product.productId.image}
                        alt={product.productId.name}
                      />
                    </div>
                    <div className={cx("product-details")}>
                      <h3 style={{ textTransform: "capitalize" }}>
                        {product.productId.name}
                      </h3>
                      <p className={cx("product-color")} style={{textTransform: "capitalize"}}>
                        Màu: {product.colorName || "Không có"}
                      </p>
                      <div className={cx("product-price-qty")}>
                        <span className={cx("product-price")}>
                          {Number(product.productId.newPrice).toLocaleString()}đ
                        </span>
                        <span className={cx("product-qty")}>
                          x{product.count}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={cx("order-footer")}>
                <div className={cx("payment-method")}>
                  Phương thức thanh toán:
                  <span>{order.paymentInfo?.paymentMethod?.toUpperCase()}</span>
                </div>
                <div className={cx("order-total")}>
                  <span>Tổng tiền:</span>
                  <span className={cx("total-amount")}>
                    {order.totalAmount.toLocaleString()}đ
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={cx("empty-state", { hidden: orders.length > 0 })}>
          <FaShoppingBag />
          <h2>Chưa có đơn hàng nào</h2>
          <p>Hãy khám phá các sản phẩm và bắt đầu mua sắm</p>
          <Link to="/shop" className={cx("shop-now-btn")}>
            Mua sắm ngay
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ListOrders;
