import { useContext, useEffect } from "react";
import classNames from "classnames/bind";

import ProductBox2 from "../../shared/ProductBox/ProductBox2";

import styles from "./WishList.module.scss";
import { AxiosContext } from "../../contexts/AxiosContext/AxiosContext";
const cx = classNames.bind(styles);
function WishList() {
  const { wishListProduct, handleRemoveFavoriteProduct,wishList } =
    useContext(AxiosContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  console.log(wishList);
  console.log(wishListProduct);
  
  
  return (
    <section className={cx("wishlist-section")}>
      <div className={cx("wishlist-container")}>
        <div className={cx("heading-container")}>
          <h1>wishlist</h1>
        </div>
        <div className={cx("wishlist-product")}>
          {wishListProduct.length > 0 ? (
            wishListProduct.map((product) => (
              <ProductBox2
                key={product._id}
                product={product}
                isWishListPage={true}
                removeFavoriteProducts={() =>
                  handleRemoveFavoriteProduct(product._id)
                }
              />
            ))
          ) : (
            <div className={cx("wishlist-image")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-heart"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <h4>Wishlist is empty. </h4>
              <p>
                You don't have any products in the wishlist yet. <br />
                You will find a lot of interesting products on our "Shop" page.
              </p>
            </div>
          )}
          {/* {products.slice(0, 2).map((product, index) => (
            <ProductBox2 key={index} product={product} />
          ))} */}
        </div>
      </div>
    </section>
  );
}

export default WishList;
