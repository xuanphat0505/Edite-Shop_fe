import { useContext } from "react";
import { Link } from "react-router-dom";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import classNames from "classnames/bind";
import Tippy from "@tippy.js/react";

import { AxiosContext } from "../../contexts/AxiosContext/AxiosContext";
import { OpenContext } from "../../contexts/OpenContext/OpenContext";
import ProductBox1 from "../ProductBox/ProductBox1";
import Loader from "../../shared/Loader/Loader";

import styles from "./Design2.module.scss";
const cx = classNames.bind(styles);
function Design2({ products, animate }) {
  const { handleOpenShop } = useContext(OpenContext);
  const { quickShopLoading, handleFindProductDetail } =
    useContext(AxiosContext);

  const handleFindAndOpenShop = (id) => {
    handleOpenShop();
    handleFindProductDetail(id);
  };
  return (
    <div className={cx("product-list", { animate })}>
      <div className={cx("left")}>
        <ProductBox1 product={products[0]} index={products[0]?._id} />
      </div>
      <div className={cx("right")}>
        {products.slice(1).map((product, index) => (
          <div className={cx("product")} key={index}>
            <div className={cx("product-content")}>
              <div className={cx("product-image")}>
                <div className={cx("wrapper-image")}>
                  <img src={product.image} alt=""></img>
                </div>
                <Tippy
                  content={<div className={cx("tootlip")}>Quick shop</div>}
                >
                  <span onClick={() => handleFindAndOpenShop(product._id)}>
                    {quickShopLoading === product._id ? (
                      <Loader
                        size={18}
                        loading={true}
                        color="var(--background-color)"
                      />
                    ) : (
                      <PiShoppingCartSimpleBold />
                    )}
                  </span>
                </Tippy>
              </div>
              <div className={cx("product-price")}>
                <Link to={`/product/${product._id}`}>{product.name}</Link>
                <p>${Number(product.newPrice).toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Design2;
