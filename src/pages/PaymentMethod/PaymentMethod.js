import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FaMoneyBillWave } from "react-icons/fa";
import { BASE_URL } from "../../config/utils";
import useAxiosJWT from "../../config/axiosConfig";
import classNames from "classnames/bind";

import { toastError } from "../../shared/Toastify/Toastify";

import styles from "./PaymentMethod.module.scss";
const cx = classNames.bind(styles);

const paymentMethods = [
  {
    id: "vnpay",
    title: "VNPay",
    description: "Thanh toán qua cổng thanh toán VNPay",
    icon: (
      <img
        src={"https://res.cloudinary.com/djmeybzjk/image/upload/v1750425941/vnpay-logo_gfxmtz.png"}
        alt="VNPay"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    ),
  },
  {
    id: "momo",
    title: "MoMo",
    description: "Thanh toán qua cổng thanh toán MoMo",
    icon: (
      <img
        src={"https://res.cloudinary.com/djmeybzjk/image/upload/v1750425940/momo-logo_ajlfo6.png"}
        alt="MoMo"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    ),
  },
  {
    id: "cod",
    title: "Thanh Toán Khi Nhận Hàng",
    description: "Thanh toán bằng tiền mặt khi nhận hàng (COD)",
    icon: <FaMoneyBillWave />,
  },
];

function PaymentMethod() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const location = useLocation();
  const getAxiosJWT = useAxiosJWT();
  const axiosJWT = getAxiosJWT();
  const { orderId, totalAmount } = location.state || {};
  const [selectedMethod, setSelectedMethod] = useState("");
  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId);
  };

  const handleCreatePayment = async () => {
    if (!selectedMethod) {
      return toastError("Vui lòng chọn phương thức thanh toán");
    }
    try {
      const res = await axiosJWT.post(
        `${BASE_URL}/payment/create`,
        {
          orderId,
          totalAmount,
          paymentMethod: selectedMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
          withCredentials: true,
        }
      );
      const result = res.data;
      if (result.success && selectedMethod !== "cod") {
        window.location.href = result.data;
      } else if (selectedMethod === "cod") {
        window.location.href = `http://localhost:3000/payment-status/result?status=completed&orderId=${orderId}`;
      }
    } catch (error) {
      return toastError(error?.response.data.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className={cx("payment-method")}>
      <div className={cx("payment-method_container")}>
        <div className={cx("payment-method_header")}>
          <h1>Chọn Phương Thức Thanh Toán</h1>
        </div>

        <div className={cx("payment-method_content")}>
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={cx("payment-method_option", {
                active: selectedMethod === method.id,
              })}
              onClick={() => handleMethodSelect(method.id)}
            >
              <div className={cx("payment-method_option-header")}>
                <div className={cx("icon")}>{method.icon}</div>
                <h3>{method.title}</h3>
              </div>
              <p className={cx("payment-method_option-description")}>
                {method.description}
              </p>
            </div>
          ))}
        </div>

        <div className={cx("payment-method_actions")}>
          <button className={cx("back-btn")} onClick={() => navigate(-1)}>
            Quay Lại
          </button>
          <button
            className={cx("continue-btn")}
            onClick={handleCreatePayment}
            disabled={!selectedMethod}
          >
            Tiếp Tục
          </button>
        </div>
      </div>
    </section>
  );
}

export default PaymentMethod;
