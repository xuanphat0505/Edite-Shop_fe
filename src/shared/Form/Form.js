import { useContext, useEffect, useState } from "react";
import { OpenContext } from "../../contexts/OpenContext/OpenContext";
import classNames from "classnames/bind";

import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import ResetPassword from "../../components/ResetPassword/ResetPassword";
import ChangePassword from "../../components/ChangePassword/ChangePassword";

import styles from "./Form.module.scss";
const cx = classNames.bind(styles);
function Form() {
  const { openForm, handleCloseForm } = useContext(OpenContext);
  const [form, setForm] = useState("login");

  useEffect(() => {
    openForm
      ? document.body.classList.add(cx("no-scroll"))
      : document.body.classList.remove(cx("no-scroll"));
  }, [openForm]);

  return (
    <>
      <div
        className={cx("overlay", openForm ? "active" : "")}
        onClick={handleCloseForm}
      ></div>
      <section className={cx("form-section", openForm ? "active" : "")}>
        <div className={cx("form-container")}>
          <div className={cx("form", "login", { active: form === "login" })}>
            <Login setForm={setForm} handleCloseForm={handleCloseForm} />
          </div>
          <div
            className={cx("form", "register", { active: form === "register" })}
          >
            <Register handleCloseForm={handleCloseForm} setForm={setForm} />
          </div>
          <div className={cx("form", "reset", { active: form === "reset" })}>
            <ResetPassword
              setForm={setForm}
              handleCloseForm={handleCloseForm}
            />
          </div>
          <div className={cx("form", "change", { active: form === "change" })}>
            <ChangePassword
              setForm={setForm}
              handleCloseForm={handleCloseForm}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Form;
