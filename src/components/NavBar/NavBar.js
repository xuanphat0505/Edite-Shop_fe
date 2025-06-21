import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { IoIosSearch, IoMdMenu } from "react-icons/io";
import { LuUser2 } from "react-icons/lu";
import { FiHeart, FiLogOut } from "react-icons/fi";
import { FaCartShopping, FaClipboardList } from "react-icons/fa6";
import classNames from "classnames/bind";

import { menus } from "../../assets/data/Data";
import { OpenContext } from "../../contexts/OpenContext/OpenContext";
import { AxiosContext } from "../../contexts/AxiosContext/AxiosContext";
import Loader from "../../shared/Loader/Loader";

import styles from "./NavBar.module.scss";
const cx = classNames.bind(styles);
function NavBar() {
  const user = useSelector((state) => state.auth.user);
  const { handleOpenCart, handleOpenForm, handleOpenSearch, handleOpenMenu } =
    useContext(OpenContext);
  const { wishListProduct, productsInCart, handleLogout, logoutLoading } =
    useContext(AxiosContext);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // state
  const [scroll, setScroll] = useState(false);

  const handleSrcoll = () => {
    if (window.scrollY >= 100) {
      setScroll(true);
    } else {
      setScroll(false);
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
            <img src={"https://res.cloudinary.com/djmeybzjk/image/upload/v1750425940/logo_tl8g1q.avif"} alt=""></img>
          </Link>
        </div>
        <div className={cx("icons")}>
          {user ? (
            <>
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
              <span>
                <Link to="/orders">
                  <FaClipboardList />
                </Link>
              </span>
            </>
          ) : (
            <span onClick={handleOpenForm}>
              <LuUser2 />
            </span>
          )}
          <span onClick={handleOpenSearch}>
            <IoIosSearch />
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
