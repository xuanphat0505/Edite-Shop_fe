import { useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
import classNames from "classnames/bind";

import styles from "./PaymentStatus.module.scss";
const cx = classNames.bind(styles);
function PaymentStatus() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get("status");
  const orderId = searchParams.get("orderId");

  const handleContinueShopping = () => {
    navigate("/");
  };
  console.log(status);
  console.log(orderId);
  
  return (
    <section className={cx("payment-success")}>
      <div className={cx("payment-success_container")}>
        <div className={cx("payment-success_content")}>
          {status === "completed" ? (
            <>
              <div className={cx("success-icon")}>
                <FaCheckCircle />
              </div>
              <h1>Đặt hàng thành công!</h1>
              <p>Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.</p>
              <div className={cx("order-info")}>
                <p>Mã đơn hàng: {orderId}</p>
              </div>
            </>
          ) : (
            <>
              <div className={cx("error-icon")}>
                <MdError />
              </div>
              <h1>Thanh toán thất bại</h1>
              <p>Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.</p>
            </>
          )}
          <button
            className={cx("continue-btn")}
            onClick={handleContinueShopping}
          >
            Tiếp tục mua sắm
          </button>
        </div>
      </div>
    </section>
  );
}

export default PaymentStatus;
