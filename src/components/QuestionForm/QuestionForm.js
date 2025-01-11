import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import classNames from "classnames/bind";

import { AxiosContext } from "../../contexts/AxiosContext/AxiosContext";
import { OpenContext } from "../../contexts/OpenContext/OpenContext";
import { BASE_URL } from "../../config/utils";
import { toastError } from "../../shared/Toastify/Toastify";
import { toast } from "react-toastify";
import Loader from "../../shared/Loader/Loader";
import useAxiosJWT from "../../config/axiosConfig";

import styles from "./QuestionForm.module.scss";
const cx = classNames.bind(styles);
function QuestionForm() {
  const accessToken = useSelector((state) => state?.auth?.user?.accessToken);
  const { handleCloseQuestionPopUp, openQuestionPopUp } =
    useContext(OpenContext);
  const { findProductDetail } = useContext(AxiosContext);
  const getAxiosJWT = useAxiosJWT();
  const axiosJWT = getAxiosJWT();
  const [questionLoading, setQuestionLoading] = useState(false);
  const [questionForm, setQuestionForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleChange = (e) => {
    setQuestionForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    if (!accessToken) {
      return toastError("You are not logged in yet");
    }
    e.preventDefault();
    setQuestionLoading(true);
    try {
      const res = await axiosJWT.post(
        `${BASE_URL}/question`,
        JSON.stringify(questionForm),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      const result = res.data;
      if (result.data) {
        setQuestionLoading(false);
        handleCloseQuestionPopUp();
        setTimeout(() => {
          return toast.success(result.message, {
            position: "bottom-center",
            className: "toast-full-width",
            autoClose: 3000,
            pauseOnHover: false,
          });
        }, 1000);
      }
    } catch (error) {
      setQuestionLoading(false);
      return toastError(error?.response?.data.message);
    }
  };

  useEffect(() => {
    openQuestionPopUp
      ? document.body.classList.add(cx("no-scroll"))
      : document.body.classList.remove(cx("no-scroll"));
  }, [openQuestionPopUp]);

  return (
    <>
      <div
        className={cx("overlay", { active: openQuestionPopUp })}
        onClick={handleCloseQuestionPopUp}
      ></div>
      <section
        className={cx("question-form_section", { active: openQuestionPopUp })}
      >
        <div className={cx("question-form_container")}>
          <div className={cx("question-form_header")}>
            <div className={cx("product-image")}>
              <img src={findProductDetail?.image} alt=""></img>
            </div>
            <div className={cx("product-infos")}>
              <h4>{findProductDetail?.name}</h4>
              <div className={cx("price", "product-price")}>
                {findProductDetail?.sale ? (
                  <>
                    <del style={{ textDecoration: "line-through" }}>
                      ${Number(findProductDetail?.price).toFixed(2)}
                    </del>
                    <ins>${Number(findProductDetail?.newPrice).toFixed(2)}</ins>
                  </>
                ) : (
                  <span>${Number(findProductDetail?.newPrice).toFixed(2)}</span>
                )}
              </div>
            </div>
          </div>
          <div className={cx("question-form_form")}>
            <h3>Ask a Question</h3>
            <form onSubmit={handleSubmit}>
              <div className={cx("input-box")}>
                <input
                  type="text"
                  placeholder="Your name*"
                  id="name"
                  required
                  defaultValue=""
                  onChange={handleChange}
                ></input>
              </div>
              <div className={cx("input-box")}>
                <input
                  type="email"
                  placeholder="Email address*"
                  id="email"
                  required
                  defaultValue=""
                  onChange={handleChange}
                ></input>
              </div>
              <div className={cx("input-box")}>
                <input
                  type="tel"
                  placeholder="Your phone number*"
                  id="phoneNumber"
                  required
                  defaultValue=""
                  onChange={handleChange}
                ></input>
              </div>
              <div className={cx("input-box")}>
                <textarea
                  type="text"
                  placeholder="Your message"
                  id="message"
                  required
                  defaultValue=""
                  onChange={handleChange}
                  rows="3"
                ></textarea>
              </div>
              <button type="submit">
                {questionLoading ? (
                  <Loader
                    size={18}
                    color="var(--background-color)"
                    loading={questionLoading}
                  />
                ) : (
                  "Send a message"
                )}
              </button>
            </form>
          </div>
          <span className={cx("close-icon")} onClick={handleCloseQuestionPopUp}>
            <IoClose />
          </span>
        </div>
      </section>
    </>
  );
}

export default QuestionForm;
