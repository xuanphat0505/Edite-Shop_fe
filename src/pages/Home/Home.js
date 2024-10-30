import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import classNames from "classnames/bind";
import axios from "axios";

import Banner from "../../components/Banner/Banner";
import Brands from "../../components/Brands/Brands";
import Collection from "../../components/Collection/Collection";
import Header from "../../components/Header/Header";
import NewProduct from "../../components/NewProduct/NewProduct";
import News from "../../components/News/News";
import Products from "../../components/Products/Products";
import { BASE_URL } from "../../config/utils";

import styles from "./Home.module.scss";
const cx = classNames.bind(styles);
function Home() {


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className={cx("home-section")}>
      <Header />
      <Banner />
      <Products />
      <Collection />
      <Brands />
      <NewProduct />
      <News />
    </section>
  );
}

export default Home;
