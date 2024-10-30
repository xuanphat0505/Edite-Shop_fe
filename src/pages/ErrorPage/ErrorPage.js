import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import styles from './ErrorPage.module.scss';
const cx = classNames.bind(styles);

function ErrorPage() {
  return (
    <section className={cx("error-section")}>
      <div className={cx("error-container")}>
        <h1>404</h1>
        <h2>Oops.</h2>
        <h3>
          The page you're looking for isn't available.
          <br /> Try to search again or use the go back button below.
        </h3>
        <Link to="/">Home page</Link>
      </div>
    </section>
  );
}

export default ErrorPage;
