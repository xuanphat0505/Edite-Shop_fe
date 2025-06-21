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
// Mock data
const mockOrders = [
  {
    id: "1",
    date: "2024-03-20",
    status: "completed",
    paymentMethod: "VNPay",
    products: [
      {
        id: "1",
        name: "Nike Air Max 2024",
        image:
          "https://static.nike.com/a/images/t_default/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png",
        price: 2990000,
        quantity: 2,
        color: "Black/White",
      },
      {
        id: "2",
        name: "Nike Dri-FIT T-Shirt",
        image:
          "https://static.nike.com/a/images/t_default/7c472175-e47a-4078-8a69-d6cffaf6f726/sportswear-t-shirt-zmMkxS.png",
        price: 590000,
        quantity: 1,
        color: "Blue",
      },
    ],
    totalAmount: 6570000,
  },
  {
    id: "2",
    date: "2024-03-19",
    status: "processing",
    paymentMethod: "MoMo",
    products: [
      {
        id: "3",
        name: "Adidas Ultraboost",
        image:
          "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg",
        price: 4200000,
        quantity: 1,
        color: "Core Black",
      },
    ],
    totalAmount: 4200000,
  },
  {
    id: "3",
    date: "2024-03-18",
    status: "shipping",
    paymentMethod: "COD",
    products: [
      {
        id: "4",
        name: "Puma RS-X",
        image:
          "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1350,h_1350/global/368845/02/sv01/fnd/IND/fmt/png/RS-X-Efekt-Unisex-Sneakers",
        price: 2800000,
        quantity: 1,
        color: "White/Red",
      },
    ],
    totalAmount: 2800000,
  },
  {
    id: "4",
    date: "2024-03-17",
    status: "cancelled",
    paymentMethod: "VNPay",
    products: [
      {
        id: "5",
        name: "Adidas Stan Smith",
        image:
          "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/68ae7ea7849b43eca70aac1e00f5146d_9366/Stan_Smith_Shoes_White_FX5502_01_standard.jpg",
        price: 2500000,
        quantity: 1,
        color: "White/Green",
      },
    ],
    totalAmount: 2500000,
  },
];

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
                  <span>{order.paymentInfo.paymentMethod.toUpperCase()}</span>
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
