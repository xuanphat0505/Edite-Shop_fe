import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";

import { BASE_URL } from "../../config/utils";
import { toastError, toastSuccess } from "../../shared/Toastify/Toastify";
import useAxiosJWT from "../../config/axiosConfig";
import icon1 from "../../assets/images/contact/icon-1.webp";
import icon2 from "../../assets/images/contact/icon-2.webp";
import icon3 from "../../assets/images/contact/icon-3.webp";
import Map from "../../shared/Map/Map";
import Loader from "../../shared/Loader/Loader";

import styles from "./Contact.module.scss";
const cx = classNames.bind(styles);
function Contact() {
  const accessToken = useSelector((state) => state?.auth?.user?.accessToken);
  const getAxiosJWT = useAxiosJWT();
  const axiosJWT = getAxiosJWT();
  const [contactLoading, setContactLoading] = useState(false);
  const [contact, setContact] = useState({
    name: "",
    message: "",
    email: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const handleChange = (e) => {
    setContact((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    if (!accessToken) {
      return toastError("You are not logged in yet");
    }
    e.preventDefault();
    setContactLoading(true);
    try {
      const res = await axiosJWT.post(
        `${BASE_URL}/message`,
        JSON.stringify(contact),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const result = res.data;
      if (result.success) {
        setIsSuccess(true);
        setContactLoading(false);
        return toastSuccess(result.message);
      }
    } catch (error) {
      setContactLoading(false);
      return toastError(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className={cx("contact-section")}>
      <div className={cx("contact-container")}>
        <div className={cx("contact-heading")}>
          <p className={cx("tag")}>our contacts</p>
          <h3>we're here to help you</h3>
          <h4>
            Got a project in mind? We'd love to hear about it. Take five minutes
            to fill out our <br /> project form so that we can get to know you
            and understand your project.
          </h4>
        </div>
        <div className={cx("contact-icons")}>
          <div className={cx("icon-box")}>
            <div className={cx("icon-img")}>
              <img src={icon1} alt=""></img>
            </div>
            <p className={cx("tag")}>visit us daily</p>
            <p className={cx("address")}>27 Division St, New York, 10002</p>
          </div>
          <div className={cx("icon-box")}>
            <div className={cx("icon-img")}>
              <img src={icon2} alt=""></img>
            </div>
            <p className={cx("tag")}>phone us 24/7</p>
            <p className={cx("address")}>+8 (123) 456 789</p>
          </div>
          <div className={cx("icon-box")}>
            <div className={cx("icon-img")}>
              <img src={icon3} alt=""></img>
            </div>
            <p className={cx("tag")}>mail us 24/7</p>
            <p className={cx("address")}> support@gate.com</p>
          </div>
        </div>
        <div className={cx("map-form")}>
          <Map />
          <div className={cx("form")}>
            {isSuccess ? (
              <div className={cx("form-notification")}>
                <h3>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    role="presentation"
                    class="icon icon-success"
                    viewBox="0 0 13 13"
                  >
                    <path
                      d="M6.5 12.35C9.73087 12.35 12.35 9.73086 12.35 6.5C12.35 3.26913 9.73087 0.65 6.5 0.65C3.26913 0.65 0.65 3.26913 0.65 6.5C0.65 9.73086 3.26913 12.35 6.5 12.35Z"
                      fill="var(--bee-success-color)"
                      stroke="white"
                      stroke-width="0.7"
                    ></path>
                    <path
                      d="M5.53271 8.66357L9.25213 4.68197"
                      stroke="white"
                    ></path>
                    <path
                      d="M4.10645 6.7688L6.13766 8.62553"
                      stroke="white"
                    ></path>
                  </svg>
                  Thanks for contacting us. We'll get back to you as soon as
                  possible.
                </h3>
              </div>
            ) : (
              <></>
            )}
            <p className={cx("tag")}>get in touch</p>
            <h3>send us a message</h3>
            <p className={cx("sub-heading")}>
              Enter your details and message below and we'll get in touch asap
            </p>
            <form onSubmit={handleSubmit}>
              <div className={cx("textarea-box")}>
                <textarea
                  rows={20}
                  id="message"
                  required
                  placeholder=" "
                  onChange={handleChange}
                ></textarea>
                <label>your message</label>
              </div>
              <div className={cx("input-group")}>
                <div className={cx("input-box")}>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder=" "
                    onChange={handleChange}
                  ></input>
                  <label>your name*</label>
                </div>
                <div className={cx("input-box")}>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder=" "
                    onChange={handleChange}
                  ></input>
                  <label>your email*</label>
                </div>
              </div>
              <div className={cx("btn-box")}>
                <button type="submit">
                  {contactLoading ? (
                    <Loader
                      size={18}
                      color="var(--background-color)"
                      loading={contactLoading}
                    />
                  ) : (
                    "Send a Message"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
