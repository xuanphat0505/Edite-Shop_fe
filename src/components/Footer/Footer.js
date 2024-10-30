import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiMapPin, FiPhone } from "react-icons/fi";
import { MdMailOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import Tippy from "@tippy.js/react";
import classNames from "classnames/bind";

import { menu, socials } from "../../assets/data/Data";
import { BASE_URL } from "../../config/utils";
import { toastError, toastSuccess } from "../../shared/Toastify/Toastify";
import { updateSubscriptionStatus } from "../../redux/authSlice";
import useAxiosJWT from "../../config/axiosConfig";

import styles from "./Footer.module.scss";
const cx = classNames.bind(styles);
function Footer() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user);

  const [email, setEmail] = useState("");
  const [activeCols, setActiveCols] = useState([]);

  const getAxiosJWT = useAxiosJWT();
  const axiosJWT = getAxiosJWT();
  const handleToggle = (colName) => {
    if (activeCols.includes(colName)) {
      setActiveCols(activeCols.filter((name) => name !== colName));
    } else {
      setActiveCols([...activeCols, colName]);
    }
  };
  const handleSubcribe = async (e) => {
    e.preventDefault();
    if (!user) {
      return toastError("You are not logged in yet");
    }
    try {
      const res = await axiosJWT.post(
        `${BASE_URL}/user/subcribe`,
        { email },
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
        toastSuccess(result.message);
        dispatch(updateSubscriptionStatus(true));
        setTimeout(() => {
          window.location.reload(); // Reload to reflect the logged-out state
        }, 1500);
      }
    } catch (error) {
      return toastError(error?.response?.data.message);
    }
  };

  return (
    <footer>
      <div className={cx("footer-info")}>
        <div
          className={cx(
            "contact",
            "info-col",
            activeCols.includes("contact") ? "active" : ""
          )}
        >
          <div
            className={cx("col-header")}
            onClick={() => handleToggle("contact")}
          >
            <h3>contact</h3>
            <span
              style={
                activeCols.includes("contact")
                  ? { transform: "rotate(45deg)" }
                  : {}
              }
            >
              <FaPlus />
            </span>
          </div>
          <div className={cx("content")}>
            <p>
              <i>
                <FiMapPin />
              </i>
              <span>345 Spear St, San Francisco, CA 94105</span>
            </p>
            <p>
              <i>
                <FiPhone />
              </i>
              <span>0123-456-789</span>
            </p>
            <p>
              <i>
                <MdMailOutline />
              </i>
              <span>sales@yourcompany.com</span>
            </p>
          </div>
        </div>
        <div
          className={cx(
            "opening-time",
            "info-col",
            activeCols.includes("opening") ? "active" : ""
          )}
        >
          <div
            className={cx("col-header")}
            onClick={() => handleToggle("opening")}
          >
            <h3>opening time</h3>
            <span
              style={
                activeCols.includes("opening")
                  ? { transform: "rotate(45deg)" }
                  : {}
              }
            >
              <FaPlus />
            </span>
          </div>
          <div className={cx("content")}>
            <p>
              <span>Mon - Fri: 8AM - 9PM</span>
            </p>
            <p>
              <span>Sat: 9AM - 8PM</span>
            </p>
            <p>
              <span>Sun: Closed</span>
            </p>
          </div>
        </div>
        <div
          className={cx(
            "newsletter",
            "info-col",
            activeCols.includes("news") ? "active" : ""
          )}
        >
          <div
            className={cx("col-header")}
            onClick={() => handleToggle("news")}
          >
            <h3>newsletter</h3>
            <span
              style={
                activeCols.includes("news")
                  ? { transform: "rotate(45deg)" }
                  : {}
              }
            >
              <FaPlus />
            </span>
          </div>
          <div className={cx("content")}>
            <p>
              <span>Join our list and get 15% off your first purchase!</span>
            </p>
            <form onSubmit={handleSubcribe}>
              <div className={cx("input-box")}>
                <input
                  placeholder="Your email address"
                  required
                  defaultValue=""
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                <button type="submit">subcribe</button>
              </div>
              {user?.subscribe && (
                <div className={cx("subcribe-success")}>
                  <svg width="18" viewBox="0 0 448 512">
                    <path d="M443.3 100.7C449.6 106.9 449.6 117.1 443.3 123.3L171.3 395.3C165.1 401.6 154.9 401.6 148.7 395.3L4.686 251.3C-1.562 245.1-1.562 234.9 4.686 228.7C10.93 222.4 21.06 222.4 27.31 228.7L160 361.4L420.7 100.7C426.9 94.44 437.1 94.44 443.3 100.7H443.3z"></path>
                  </svg>
                  Thanks for subscribing
                </div>
              )}

              <p>*Don't worry we don't spam</p>
            </form>
          </div>
        </div>
      </div>
      <div className={cx("footer-center")}>
        <ul className={cx("col")}>
          <li>{menu[0]}</li>
          <li>{menu[1]}</li>
          <li>{menu[2]}</li>
        </ul>
        <ul className={cx("col")}>
          <li>{menu[3]}</li>
          <li>{menu[4]}</li>
          <li>{menu[5]}</li>
        </ul>
        <ul className={cx("col")}>
          <li>{menu[6]}</li>
          <li>{menu[7]}</li>
          <li>{menu[8]}</li>
        </ul>
        <ul className={cx("col")}>
          <li>{menu[9]}</li>
          <li>{menu[10]}</li>
          <li>{menu[11]}</li>
        </ul>
        <ul className={cx("col")}>
          <li>{menu[12]}</li>
          <li>{menu[13]}</li>
          <li>{menu[14]}</li>
        </ul>
        <ul className={cx("col")}>
          <li>{menu[15]}</li>
          <li>{menu[16]}</li>
          <li>{menu[17]}</li>
        </ul>
      </div>
      <div className={cx("footer-copyright")}>
        <div className={cx("copy-right")}>
          All Rights Reserved © 2024 Edite store
        </div>
        <ul className={cx("socials")}>
          {socials.map((social, index) => (
            <li key={index}>
              <Tippy
                content={<div className={cx("tootlip")}>{social.tootlip}</div>}
              >
                <i>
                  <social.icon />
                </i>
              </Tippy>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
