import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import classNames from "classnames/bind";
import axios from "axios";

import { BASE_URL } from "../../config/utils";
import { loginStart, loginSuccess, loginFailed } from "../../redux/authSlice";
import GoogleIcon from "../../assets/images/google-icon.png";
import { toastError, toastSuccess } from "../../shared/Toastify/Toastify";
import Loader from "../../shared/Loader/Loader";

import styles from "./Login.module.scss";
const cx = classNames.bind(styles);
function Login({ setForm = {}, handleCloseForm }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state?.auth?.isLoading);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginGoogleLoading, setLoginGoogleLoading] = useState(false);
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    setLoginLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/login`,
        JSON.stringify(user),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const result = res.data;
      if (result.success) {
        dispatch(loginSuccess(result.data));
        toastSuccess(result.message, 1000);
        setLoginLoading(false);
        setTimeout(() => {
          window.location.reload(); // Reload to reflect the logged-out state
        }, 1500);
      }
    } catch (error) {
      dispatch(loginFailed());
      setLoginLoading(false);
      return toastError(error.response?.data?.message);
    }
  };
  const googleLogin = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      dispatch(loginStart());
      setLoginGoogleLoading(true);
      try {
        const res = await axios.post(
          `${BASE_URL}/auth/google-login`,
          {
            code: credentialResponse.code,
          },
          { withCredentials: true }
        );
        const result = res.data;
        if (result.success) {
          dispatch(loginSuccess(result.data));
          toastSuccess(result.message, 1000);
          setLoginGoogleLoading(false);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      } catch (error) {
        dispatch(loginFailed());
        setLoginGoogleLoading(false);
        return toastError(error.response?.data?.message);
      }
    },
    onError: (error) => {
      return toastError(error);
    },
    flow: "auth-code",
  });
  return (
    <>
      <div className={cx("form-header")}>
        <h3>login</h3>
        <button onClick={handleCloseForm} className={cx("close-btn")}>
          close
          <div className={cx("line")}></div>
        </button>
      </div>
      <form className={cx("login-form")} onSubmit={handleSubmit}>
        <div className={cx("input-box")}>
          <input
            onChange={handleChange}
            defaultValue=""
            id="email"
            type="text"
            required
          ></input>
          <label htmlFor="email">email address</label>
        </div>
        <div className={cx("input-box")}>
          <input
            onChange={handleChange}
            defaultValue=""
            id="password"
            type="password"
            required
          ></input>
          <label htmlFor="password">password</label>
        </div>
        <div className={cx("button")}>
          <button type="submit">
            {loginLoading ? (
              <Loader
                size={18}
                color="var(--background-color)"
                loading={isLoading}
              />
            ) : (
              "sign in"
            )}
          </button>
        </div>
        <div className={cx("line")}>
          <span>or</span>
        </div>
        <div className={cx("button")}>
          <button onClick={googleLogin} type="button">
            {loginGoogleLoading ? (
              <Loader
                size={18}
                color="var(--background-color)"
                loading={loginGoogleLoading}
              />
            ) : (
              <>
                <span>sign in with google</span>
                <img src={GoogleIcon} alt="google-icon" />
              </>
            )}
          </button>
        </div>
        <div className={cx("form-footer")}>
          <p>Lost password?</p>
          <div className={cx("option-btn")}>
            <Link onClick={() => setForm("reset")}>forgot password</Link>
            <p>/</p>
            <Link onClick={() => setForm("change")} style={{ margin: 0 }}>
              change password
            </Link>
          </div>
        </div>
        <div className={cx("button")}>
          <Link onClick={() => setForm("register")}>create an account</Link>
        </div>
      </form>
    </>
  );
}

export default Login;
