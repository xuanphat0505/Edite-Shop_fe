import { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import axios from "axios";

import { BASE_URL } from "../../config/utils";
import { toastError, toastSuccess } from "../../shared/Toastify/Toastify";
import Loader from "../../shared/Loader/Loader";

import styles from "./ChangePassword.module.scss";
const cx = classNames.bind(styles);
function ChangePassword({ setForm = {}, handleCloseForm }) {
  const [changeLoading, setChangeLoading] = useState(false);
  const [information, setInformation] = useState({
    email: "",
    newPassword: "",
    repeatPassword: "",
  });
  const handleChange = (e) => {
    setInformation((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setChangeLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/user/change`,
        JSON.stringify(information),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const result = res.data;
      if (result.success) {
        setChangeLoading(false);
        toastSuccess(result.message, 1000);
        setTimeout(() => {
          setForm("login");
        }, 1500);
      }
    } catch (error) {
      setChangeLoading(false);
      return toastError(error?.response?.data.message);
    }
  };
  return (
    <>
      <div className={cx("form-header")}>
        <h3>change your password</h3>
        <button className={cx("close-btn")} onClick={handleCloseForm}>
          close
          <div className={cx("line")}></div>
        </button>
      </div>
      <form className={cx("change-form")} onSubmit={handleSubmit}>
        <div className={cx("input-box")}>
          <input
            id="email"
            type="text"
            required
            onChange={handleChange}
            defaultValue=""
          ></input>
          <label htmlFor="email">email address</label>
        </div>
        <div className={cx("input-box")}>
          <input
            id="newPassword"
            type="password"
            required
            onChange={handleChange}
            defaultValue=""
          ></input>
          <label htmlFor="new-password">new password</label>
        </div>
        <div className={cx("input-box")}>
          <input
            id="repeatPassword"
            type="password"
            required
            onChange={handleChange}
            defaultValue=""
          ></input>
          <label htmlFor="repeat-password">repeat password</label>
        </div>
        <div className={cx("button")}>
          <button type="submit">
            {changeLoading ? (
              <Loader
                size={18}
                color="var(--background-color)"
                loading={changeLoading}
              />
            ) : (
              "change password"
            )}
          </button>
        </div>
        <div className={cx("form-footer")}>
          <p>Remember your password?</p>
          <Link onClick={() => setForm("login")}>back to login</Link>
        </div>
      </form>
    </>
  );
}

export default ChangePassword;
