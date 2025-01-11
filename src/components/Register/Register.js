import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames/bind";
import axios from "axios";

import { BASE_URL } from "../../config/utils";
import {
  registerStart,
  registerSuccess,
  registerFail,
} from "../../redux/authSlice";

import styles from "./Register.module.scss";
import { toastSuccess } from "../../shared/Toastify/Toastify";
const cx = classNames.bind(styles);
function Register({ setForm = {}, handleCloseForm }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerStart());
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/register`,
        JSON.stringify(user),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = res.data;
      if (result.success) {
        dispatch(registerSuccess());
        toastSuccess(result.message, 1000);
        setTimeout(() => {
          setForm("login");
        }, 1500);
      }
    } catch (error) {
      dispatch(registerFail());
      alert(error.response?.data?.message);
    }
  };

  return (
    <>
      <div className={cx("form-header")}>
        <h3>register</h3>
        <button className={cx("close-btn")} onClick={handleCloseForm}>
          close
          <div className={cx("line")}></div>
        </button>
      </div>
      <form className={cx("register-form")} onSubmit={handleSubmit}>
        <div className={cx("input-box")}>
          <input
            onChange={handleChange}
            id="firstName"
            type="text"
            required
          ></input>
          <label htmlFor="firstName">first name</label>
        </div>
        <div className={cx("input-box")}>
          <input
            onChange={handleChange}
            id="lastName"
            type="text"
            required
          ></input>
          <label htmlFor="lastName">last name</label>
        </div>
        <div className={cx("input-box")}>
          <input
            onChange={handleChange}
            id="email"
            type="text"
            required
          ></input>
          <label htmlFor="email">email address</label>
        </div>
        <div className={cx("input-box")}>
          <input
            onChange={handleChange}
            id="password"
            type="password"
            required
          ></input>
          <label htmlFor="password">password</label>
        </div>
        <div className={cx("button")}>
          <button type="submit">register</button>
        </div>
        <div className={cx("form-footer")}>
          <p>Already have an account?</p>
          <Link onClick={() => setForm("login")}>login here</Link>
        </div>
      </form>
    </>
  );
}

export default Register;
