import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { IoIosSearch, IoMdMenu } from "react-icons/io";
import { LuUser2 } from "react-icons/lu";
import { FiHeart, FiLogOut } from "react-icons/fi";
import { FaCartShopping } from "react-icons/fa6";
import axios from "axios";
import classNames from "classnames/bind";

import { menus } from "../../assets/data/Data";
import { OpenContext } from "../../contexts/OpenContext/OpenContext";
import { AxiosContext } from "../../contexts/AxiosContext/AxiosContext";
import {
  logoutStart,
  logoutFailed,
  logoutSuccess,
} from "../../redux/authSlice";
import { BASE_URL } from "../../config/utils";
import useAxiosJWT from "../../config/axiosConfig";
import logoImg from "../../assets/images/logo.avif";

import styles from "./NavBar.module.scss";
import { toastSuccess } from "../../shared/Toastify/Toastify";
import Loader from "../../shared/Loader/Loader";
const cx = classNames.bind(styles);
function NavBar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { handleOpenCart, handleOpenForm, handleOpenSearch, handleOpenMenu } =
    useContext(OpenContext);
  const { wishListProduct, productsInCart } = useContext(AxiosContext);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const getAxiosJWT = useAxiosJWT();
  const axiosJWT = getAxiosJWT();

  // state
  const [scroll, setScroll] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleSrcoll = () => {
    if (window.scrollY >= 100) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  const handleLogout = async () => {
    if (!user?.accessToken) {
      return alert("You are not logged in yet");
    }
    setLogoutLoading(true);
    dispatch(logoutStart());
    try {
      const res = await axiosJWT.post(
        `${BASE_URL}/auth/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
          withCredentials: true,
        }
      );
      const result = res.data;
      if (result.success) {
        dispatch(logoutSuccess());
        setLogoutLoading(false);
        toastSuccess(result.message, 1000);
        setTimeout(() => {
          window.location.reload(); // Reload to reflect the logged-out state
        }, 1500);
      }
    } catch (error) {
      dispatch(logoutFailed());
      setLogoutLoading(false);
      return alert(error?.response?.data.message);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleSrcoll);
  });

  return (
    <nav className={cx("nav-bar", scroll || !isHomePage ? "active" : "")}>
      <div className={cx("nav-container")}>
        <ul>
          {menus.map((menu, index) => (
            <li key={index}>
              <Link to={menu.path}>{menu.name}</Link>
            </li>
          ))}
        </ul>
        <span className={cx("menu-icon")} onClick={handleOpenMenu}>
          <IoMdMenu />
        </span>
        <div className={cx("logo")}>
          <Link to="/">
            <img src={logoImg} alt=""></img>
          </Link>
        </div>
        <div className={cx("icons")}>
          {user ? (
            <span onClick={handleLogout}>
              {logoutLoading ? (
                <Loader
                  size={18}
                  color="var(--background-color)"
                  loading={logoutLoading}
                />
              ) : (
                <FiLogOut />
              )}
            </span>
          ) : (
            <></>
          )}
          <span onClick={handleOpenSearch}>
            <IoIosSearch />
          </span>
          <span onClick={handleOpenForm}>
            <LuUser2 />
          </span>
          <span>
            <Link to="/wishlist">
              <FiHeart />
              <p className={cx("account")}>{wishListProduct.length}</p>
            </Link>
          </span>
          <span onClick={handleOpenCart}>
            <FaCartShopping />
            <p className={cx("account")}>{productsInCart.length}</p>
          </span>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
