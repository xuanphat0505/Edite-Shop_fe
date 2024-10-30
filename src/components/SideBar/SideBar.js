import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import classNames from "classnames/bind";

import { menus } from "../../assets/data/Data";
import { OpenContext } from "../../contexts/OpenContext/OpenContext";

import styles from "./SideBar.module.scss";
const cx = classNames.bind(styles);
function SideBar() {
  const [activeTab, setActiveTab] = useState(0);
  const { openMenu, handleCloseMenu, handleOpenSearch, handleOpenForm } =
    useContext(OpenContext);
  return (
    <>
      <div
        className={cx("overlay", { active: openMenu })}
        onClick={handleCloseMenu}
      ></div>
      <section
        className={cx("side-bar", { active: openMenu })}
        style={{ "--active-left": `${activeTab * 50}%` }}
      >
        <button onClick={handleCloseMenu}>
          <IoMdClose />
        </button>
        <aside>
          <div className={cx("sidebar-menu")}>
            <span
              onClick={() => setActiveTab(0)}
              className={cx(activeTab === 0 ? "active" : "")}
            >
              <svg>
                <g>
                  <path d="M8,8H0V0h8V8z M2,6h4V2H2V6z"></path>
                </g>
                <g>
                  <path d="M18,8h-8V0h8V8z M12,6h4V2h-4V6z"></path>
                </g>
                <g>
                  <path d="M8,18H0v-8h8V18z M2,16h4v-4H2V16z"></path>
                </g>
                <g>
                  <path d="M18,18h-8v-8h8V18z M12,16h4v-4h-4V16z"></path>
                </g>
              </svg>
              menu
            </span>
            <span
              onClick={() => setActiveTab(1)}
              className={cx(activeTab === 1 ? "active" : "")}
            >
              <svg style={{ width: "22px", height: "22px" }}>
                <path d="M21.71,6.29l-2-2C19.52,4.11,19.27,4,19,4h-7.61l-0.44-1.32C10.81,2.28,10.43,2,10,2H2C0.9,2,0,2.9,0,4v15 c0,0.55,0.45,1,1,1h20c0.55,0,1-0.45,1-1V9V7C22,6.73,21.89,6.48,21.71,6.29z M18.59,6L20,7.41V8h-7.28l-0.67-2H18.59z M20,18H2V4 h7.28l1.77,5.32C11.19,9.72,11.57,10,12,10h8V18z"></path>
              </svg>
              categories
            </span>
          </div>
          <div className={cx("sidebar-content")}>
            <ul className={cx("sidbar-options")}>
              {menus.map((menu, index) => (
                <li key={index} onClick={handleCloseMenu}>
                  <Link to={menu.path}>{menu.name}</Link>
                </li>
              ))}
              <li onClick={handleCloseMenu}>
                <Link to="/wishlist">
                  <span>
                    <svg width="22px" height="22px" viewBox="0 0 22 22">
                      <path d="M20.26,11.3c2.31-2.36,2.31-6.18-0.02-8.53C19.11,1.63,17.6,1,16,1c0,0,0,0,0,0c-1.57,0-3.05,0.61-4.18,1.71c0,0,0,0,0,0 L11,3.41l-0.81-0.69c0,0,0,0,0,0C9.06,1.61,7.58,1,6,1C4.4,1,2.89,1.63,1.75,2.77c-2.33,2.35-2.33,6.17-0.02,8.53  c0,0,0,0.01,0.01,0.01l0.01,0.01c0,0,0,0,0,0c0,0,0,0,0,0L11,20.94l9.25-9.62c0,0,0,0,0,0c0,0,0,0,0,0L20.26,11.3 C20.26,11.31,20.26,11.3,20.26,11.3z M3.19,9.92C3.18,9.92,3.18,9.92,3.19,9.92C3.18,9.92,3.18,9.91,3.18,9.91 c-1.57-1.58-1.57-4.15,0-5.73C3.93,3.42,4.93,3,6,3c1.07,0,2.07,0.42,2.83,1.18C8.84,4.19,8.85,4.2,8.86,4.21 c0.01,0.01,0.01,0.02,0.03,0.03l1.46,1.25c0.07,0.06,0.14,0.09,0.22,0.13c0.01,0,0.01,0.01,0.02,0.01c0.13,0.06,0.27,0.1,0.41,0.1  c0.08,0,0.16-0.03,0.25-0.05c0.03-0.01,0.07-0.01,0.1-0.02c0.07-0.03,0.13-0.07,0.2-0.11c0.03-0.02,0.07-0.03,0.1-0.06l1.46-1.24 c0.01-0.01,0.02-0.02,0.03-0.03c0.01-0.01,0.03-0.01,0.04-0.02C13.93,3.42,14.93,3,16,3c0,0,0,0,0,0c1.07,0,2.07,0.42,2.83,1.18 c1.56,1.58,1.56,4.15,0,5.73c0,0,0,0.01-0.01,0.01c0,0,0,0,0,0L11,18.06L3.19,9.92z"></path>
                    </svg>
                    wishlist
                  </span>
                </Link>
              </li>
              <li onClick={handleCloseMenu}>
                <Link to="/compare">
                  <span>
                    <svg width="18px" hezight="18px" viewBox="0 0 18 18">
                      <path d="M4.29,7.71l-3-3c-0.39-0.39-0.39-1.02,0-1.41l3-3c0.39-0.39,1.02-0.39,1.41,0s0.39,1.02,0,1.41L4.41,3H14c0.55,0,1,0.45,1,1 v3c0,0.55-0.45,1-1,1s-1-0.45-1-1V5H4.41l1.29,1.29c0.39,0.39,0.39,1.02,0,1.41C5.51,7.9,5.26,8,5,8S4.49,7.9,4.29,7.71z M16.71,13.29l-3-3c-0.39-0.39-1.02-0.39-1.41,0s-0.39,1.02,0,1.41L13.59,13H5v-2c0-0.55-0.45-1-1-1s-1,0.45-1,1v3 c0,0.55,0.45,1,1,1h9.59l-1.29,1.29c-0.39,0.39-0.39,1.02,0,1.41C12.49,17.9,12.74,18,13,18s0.51-0.1,0.71-0.29l3-3 C17.1,14.32,17.1,13.68,16.71,13.29z"></path>
                    </svg>
                    compare
                  </span>
                </Link>
              </li>
              <li onClick={handleCloseMenu}>
                <Link onClick={handleOpenSearch}>
                  <span>
                    <svg width="22px" height="22px" viewBox="0 0 22 22">
                      <g>
                        <path d="M8.5,17C3.81,17,0,13.19,0,8.5C0,3.81,3.81,0,8.5,0S17,3.81,17,8.5C17,13.19,13.19,17,8.5,17z M8.5,2C4.92,2,2,4.92,2,8.5S4.92,15,8.5,15S15,12.08,15,8.5S12.08,2,8.5,2z"></path>
                      </g>
                      <g>
                        <path d="M21,22c-0.26,0-0.51-0.1-0.71-0.29l-5-5c-0.39-0.39-0.39-1.02,0-1.41s1.02-0.39,1.41,0l5,5c0.39,0.39,0.39,1.02,0,1.41C21.51,21.9,21.26,22,21,22z"></path>
                      </g>
                    </svg>
                    search
                  </span>
                </Link>
              </li>
              <li onClick={handleCloseMenu}>
                <Link onClick={handleOpenForm}>
                  <span>
                    <svg width="18px" height="18px" viewBox="0 0 18 18">
                      <g>
                        <path d="M9,8c2.21,0,4-1.79,4-4s-1.79-4-4-4S5,1.79,5,4S6.79,8,9,8z M9,2c1.1,0,2,0.9,2,2s-0.9,2-2,2S7,5.1,7,4S7.9,2,9,2z"></path>
                        <path d="M16,9h-5c-0.27,0-0.52,0.11-0.71,0.29L9,10.59L7.71,9.29C7.52,9.11,7.27,9,7,9H2c-1.1,0-2,0.9-2,2v7h18v-7 C18,9.9,17.1,9,16,9z M16,16H2v-5h4.59l1.71,1.71c0.39,0.39,1.02,0.39,1.41,0L11.41,11H16V16z"></path>
                      </g>
                    </svg>
                    login / register
                  </span>
                </Link>
              </li>
              <li className={cx("menu-help")}>
                <p>Need help?</p>
                <div className={cx("menu-infos")}>
                  <svg viewBox="0 0 22 22" style={{ top: "4px" }}>
                    <path d="M22,6.02V4c0-0.55-0.45-1-1-1H1C0.45,3,0,3.45,0,4v2.02c0,0,0,0,0,0V18c0,0.55,0.45,1,1,1h20c0.55,0,1-0.45,1-1V6.02				C22,6.02,22,6.02,22,6.02z M20,5v0.32l-9,3.6l-9-3.6V5H20z M2,17V7.48l9,3.6l9-3.6V17H2z"></path>{" "}
                  </svg>
                  edite@domain.com
                  <br />
                  <svg viewBox="0 0 22 22" style={{ top: "3px" }}>
                    <path
                      d="M21.71,15.68l-3.85-3.85c-0.38-0.38-1.04-0.38-1.41,0l-1.83,1.83c-0.76-0.35-2.2-1.13-3.67-2.6
				C9.48,9.6,8.69,8.15,8.34,7.39l1.83-1.83c0.39-0.39,0.39-1.02,0-1.41L6.32,0.29C5.93-0.1,5.3-0.1,4.91,0.29L0.29,4.91
				C0.28,4.93,0.27,4.95,0.25,4.97C0.21,5.02,0.18,5.08,0.14,5.14C0.11,5.19,0.08,5.24,0.06,5.3C0.04,5.36,0.03,5.42,0.03,5.48
				C0.02,5.55,0.01,5.62,0.01,5.69c0,0.02-0.01,0.05,0,0.07c0.03,0.23,0.87,5.77,5.67,10.57c4.8,4.8,10.33,5.63,10.57,5.67
				C16.29,22,16.34,22,16.38,22c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0.13,0,0.25-0.03,0.36-0.07c0.03-0.01,0.06-0.04,0.09-0.05
				c0.08-0.04,0.16-0.09,0.23-0.15c0.01-0.01,0.02-0.01,0.03-0.02l4.62-4.62C22.1,16.7,22.1,16.07,21.71,15.68z M16.05,19.92
				c-1.36-0.3-5.42-1.46-8.96-5.01c-3.55-3.55-4.7-7.61-5.01-8.96l3.53-3.53l2.43,2.43l-1.6,1.6C6.41,6.48,6.4,6.53,6.37,6.56
				C6.32,6.62,6.28,6.68,6.25,6.75C6.22,6.8,6.21,6.86,6.2,6.93C6.18,6.99,6.16,7.05,6.16,7.12c0,0.07,0.01,0.14,0.03,0.21
				c0.01,0.05,0,0.1,0.02,0.14c0.03,0.1,0.87,2.56,3.32,5.01c2.45,2.45,4.9,3.28,5.01,3.32c0.1,0.03,0.21,0.05,0.32,0.05
				c0.12,0,0.23-0.03,0.34-0.07c0.03-0.01,0.06-0.03,0.09-0.05c0.08-0.04,0.15-0.09,0.22-0.14c0.02-0.01,0.04-0.02,0.05-0.03l1.6-1.6
				l2.43,2.43L16.05,19.92z"
                    ></path>
                  </svg>
                  + 123.4567.889
                </div>
              </li>
            </ul>
            <div className={cx("blank")}> </div>
          </div>
        </aside>
      </section>
    </>
  );
}

export default SideBar;
