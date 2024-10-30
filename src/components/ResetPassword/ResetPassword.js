import { Link } from "react-router-dom";
import { useState } from "react";
import classNames from "classnames/bind";
import axios from "axios";

import { BASE_URL } from "../../config/utils";
import { toastError, toastSuccess } from "../../shared/Toastify/Toastify";
import Loader from "../../shared/Loader/Loader";

import styles from "./ResetPassword.module.scss";
const cx = classNames.bind(styles);
function ResetPassword({ handleCloseForm, setForm = {} }) {
  const [email, setEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setResetLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/user/reset`,
        { email },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const result = res.data;
      if (result.success) {
        setResetLoading(false);
        toastSuccess(result.message, 1000);
        setTimeout(() => {
          setForm("login");
        }, 1500);
      }
    } catch (error) {
      setResetLoading(false);
      return toastError(error?.response?.data.message);
    }
  };
  return (
    <>
      <div className={cx("form-header")}>
        <h3>reset your password</h3>
        <button className={cx("close-btn")} onClick={handleCloseForm}>
          close
          <div className={cx("line")}></div>
        </button>
      </div>
      <form className={cx("reset-password_form")} onSubmit={handleSubmit}>
        <p style={{ marginBottom: "25px" }}>
          Lost your password? Please enter your email address. You will receive
          a random password to login in website.
        </p>
        <div className={cx("input-box")}>
          <input
            type="email"
            required
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className={cx("button")}>
          <button type="submit">
            {resetLoading ? (
              <Loader
                size={18}
                loading={resetLoading}
                color="var(--background-color)"
              />
            ) : (
              "reset password"
            )}
          </button>
        </div>
        <div className={cx("form-footer")}>
          <p>Remember your password?</p>
          <Link onClick={() => setForm("login")}>Back to login</Link>
        </div>
      </form>
    </>
  );
}

export default ResetPassword;
