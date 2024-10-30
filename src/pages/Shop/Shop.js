import { useEffect, useState, useContext } from "react";
import { FaFilter } from "react-icons/fa";
import { IoMdArrowDropdown, IoIosClose } from "react-icons/io";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import classNames from "classnames/bind";

import { BASE_URL } from "../../config/utils";
import { subMenu } from "../../assets/data/Data";
import { AxiosContext } from "../../contexts/AxiosContext/AxiosContext";
import useAxios from "../../hooks/useAxios";
import HeadingBox from "../../shared/HeadingBox/HeadingBox";
import ProductBox2 from "../../shared/ProductBox/ProductBox2";
import ProductBox1 from "../../shared/ProductBox/ProductBox1";

import styles from "./Shop.module.scss";
const cx = classNames.bind(styles);
function Shop() {
  // state to reponsive
  const [isTablet, setIsTablet] = useState(
    window.innerWidth <= 1023 && window.innerWidth > 767
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  // state to build the front end
  const [arrangement, setArrangement] = useState("row");
  const [isOpen, setIsOpen] = useState(false);
  const [sortOption, setSortOption] = useState(
    isMobile ? "Sort" : "Alphabetically, A-Z"
  );

  // state to render products
  const [sortedProducts, setSortedProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const { data: products } = useAxios(`${BASE_URL}/product?page=${page}`);
  const { data: productCount } = useAxios(`${BASE_URL}/product/count`);
  const { isInWishList, isInCompareList } = useContext(AxiosContext);

  const handleResize = () => {
    if (window.innerWidth <= 767) {
      setIsMobile(true);
      setIsTablet(false);
    } else if (window.innerWidth > 767 && window.innerWidth <= 1023) {
      setIsMobile(false);
      setIsTablet(true);
    } else {
      setIsMobile(false);
      setIsTablet(false);
    }
  };

  const sortFunc = (type) => {
    const productCopy = [...products];
    productCopy.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (type === "Alphabetically, A-Z") {
        return a.name.localeCompare(b.name); // Sort A to Z
      }
      if (type === "Alphabetically, Z-A") {
        return b.name.localeCompare(a.name); // Sort Z to A
      }
      if (type === "Price, low to high") {
        return Number(a.newPrice) - Number(b.newPrice); // Sort by price: low to high
      }
      if (type === "Price, high to low") {
        return Number(b.newPrice) - Number(a.newPrice); // Sort by price: high to low
      }
      if (type === "Date, old to new") {
        return dateA - dateB; // sort by date : old to new
      }
      if (type === "Date, new to old") {
        return dateB - dateA; // sort by date : new to old
      }
      return 0;
    });
    setSortedProducts(productCopy);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    if (products.length > 0) {
      sortFunc(sortOption);
    }
  }, [sortOption, products]);

  useEffect(() => {
    const pages = Math.ceil(productCount / 7);
    setPageCount(pages);
  }, [productCount, pageCount]);

  const handlePageChange = (newPage) => {
    if (newPage !== page) {
      // Scroll first
      window.scrollTo(0, 0);
    }
    // Then update the page after a small delay
    setTimeout(() => {
      setPage(newPage);
    }, 300); // Adjust the delay if needed
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 
  return (
    <section className={cx("shop-section")}>
      <div className={cx("shop-container")}>
        <HeadingBox address={"shop"} heading={"products"} />
        <div className={cx("product-list")}>
          <div className={cx("filter-sort")}>
            <div className={cx("filter")}>
              <i>
                <FaFilter />
              </i>
              <span>filter by</span>
            </div>
            <ul className={cx("arrangement")}>
              {!isMobile && !isTablet && (
                <>
                  <li onClick={() => setArrangement("row")}>
                    <svg
                      style={{
                        fill: arrangement === "row" ? "" : "var(--text-color)",
                      }}
                      width="26"
                      height="26"
                    >
                      <path
                        id="list"
                        d="M25,1v24H1V1H25 M26,0H0v26h26V0L26,0z M22,7V5c0-0.55-0.45-1-1-1H5C4.45,4,4,4.45,4,5v2 c0,0.55,0.45,1,1,1h16C21.55,8,22,7.55,22,7z M22,14v-2c0-0.55-0.45-1-1-1H5c-0.55,0-1,0.45-1,1v2c0,0.55,0.45,1,1,1h16 C21.55,15,22,14.55,22,14z M22,21v-2c0-0.55-0.45-1-1-1H5c-0.55,0-1,0.45-1,1v2c0,0.55,0.45,1,1,1h16C21.55,22,22,21.55,22,21z"
                      ></path>
                    </svg>
                  </li>
                  <li onClick={() => setArrangement("grid3")}>
                    <svg
                      style={{
                        fill:
                          arrangement === "grid3" ? "" : "var(--text-color)",
                      }}
                      width="37"
                      height="26"
                    >
                      <path
                        id="_x35__col"
                        class="st2"
                        d="M11,12H4c-0.55,0-1-0.45-1-1V4c0-0.55,0.45-1,1-1h7c0.55,0,1,0.45,1,1v7 C12,11.55,11.55,12,11,12z M5,10h5V5H5V10z M22,12h-7c-0.55,0-1-0.45-1-1V4c0-0.55,0.45-1,1-1h7c0.55,0,1,0.45,1,1v7 C23,11.55,22.55,12,22,12z M16,10h5V5h-5V10z M11,23H4c-0.55,0-1-0.45-1-1v-7c0-0.55,0.45-1,1-1h7c0.55,0,1,0.45,1,1v7 C12,22.55,11.55,23,11,23z M5,21h5v-5H5V21z M22,23h-7c-0.55,0-1-0.45-1-1v-7c0-0.55,0.45-1,1-1h7c0.55,0,1,0.45,1,1v7 C23,22.55,22.55,23,22,23z M16,21h5v-5h-5V21z M33,12h-7c-0.55,0-1-0.45-1-1V4c0-0.55,0.45-1,1-1h7c0.55,0,1,0.45,1,1v7 C34,11.55,33.55,12,33,12z M27,10h5V5h-5V10z M33,23h-7c-0.55,0-1-0.45-1-1v-7c0-0.55,0.45-1,1-1h7c0.55,0,1,0.45,1,1v7 C34,22.55,33.55,23,33,23z M27,21h5v-5h-5V21z M36,1v24H1V1H36 M37,0H0v26h37V0L37,0z"
                      ></path>
                    </svg>
                  </li>
                  <li onClick={() => setArrangement("grid4")}>
                    <svg
                      style={{
                        fill:
                          arrangement === "grid4" ? "" : "var(--text-color)",
                      }}
                      width={48}
                      height={28}
                    >
                      <path
                        id="_x34__col"
                        class="st2"
                        d="M11,12H4c-0.55,0-1-0.45-1-1V4c0-0.55,0.45-1,1-1h7c0.55,0,1,0.45,1,1v7 C12,11.55,11.55,12,11,12z M5,10h5V5H5V10z M22,12h-7c-0.55,0-1-0.45-1-1V4c0-0.55,0.45-1,1-1h7c0.55,0,1,0.45,1,1v7 C23,11.55,22.55,12,22,12z M16,10h5V5h-5V10z M11,23H4c-0.55,0-1-0.45-1-1v-7c0-0.55,0.45-1,1-1h7c0.55,0,1,0.45,1,1v7 C12,22.55,11.55,23,11,23z M5,21h5v-5H5V21z M22,23h-7c-0.55,0-1-0.45-1-1v-7c0-0.55,0.45-1,1-1h7c0.55,0,1,0.45,1,1v7 C23,22.55,22.55,23,22,23z M16,21h5v-5h-5V21z M33,12h-7c-0.55,0-1-0.45-1-1V4c0-0.55,0.45-1,1-1h7c0.55,0,1,0.45,1,1v7 C34,11.55,33.55,12,33,12z M27,10h5V5h-5V10z M33,23h-7c-0.55,0-1-0.45-1-1v-7c0-0.55,0.45-1,1-1h7c0.55,0,1,0.45,1,1v7 C34,22.55,33.55,23,33,23z M27,21h5v-5h-5V21z M44,12h-7c-0.55,0-1-0.45-1-1V4c0-0.55,0.45-1,1-1h7c0.55,0,1,0.45,1,1v7 C45,11.55,44.55,12,44,12z M38,10h5V5h-5V10z M44,23h-7c-0.55,0-1-0.45-1-1v-7c0-0.55,0.45-1,1-1h7c0.55,0,1,0.45,1,1v7 C45,22.55,44.55,23,44,23z M38,21h5v-5h-5V21z M47,1v24H1V1H47 M48,0H0v26h48V0L48,0z"
                      ></path>
                    </svg>
                  </li>
                </>
              )}
              {isTablet && (
                <>
                  <li onClick={() => setArrangement("row")}>
                    <svg
                      style={{
                        fill: arrangement === "row" ? "" : "var(--text-color)",
                      }}
                      width="26"
                      height="26"
                    >
                      <path
                        id="list"
                        d="M25,1v24H1V1H25 M26,0H0v26h26V0L26,0z M22,7V5c0-0.55-0.45-1-1-1H5C4.45,4,4,4.45,4,5v2 c0,0.55,0.45,1,1,1h16C21.55,8,22,7.55,22,7z M22,14v-2c0-0.55-0.45-1-1-1H5c-0.55,0-1,0.45-1,1v2c0,0.55,0.45,1,1,1h16 C21.55,15,22,14.55,22,14z M22,21v-2c0-0.55-0.45-1-1-1H5c-0.55,0-1,0.45-1,1v2c0,0.55,0.45,1,1,1h16C21.55,22,22,21.55,22,21z"
                      ></path>
                    </svg>
                  </li>
                  <li onClick={() => setArrangement("grid2")}>
                    <svg
                      style={{
                        fill:
                          arrangement === "grid2" ? "" : "var(--text-color)",
                      }}
                      width="26"
                      height="26"
                    >
                      <path
                        id="_x36__col"
                        class="st2"
                        d="M11,12H4c-0.55,0-1-0.45-1-1V4c0-0.55,0.45-1,1-1h7c0.55,0,1,0.45,1,1v7 C12,11.55,11.55,12,11,12z M5,10h5V5H5V10z M22,12h-7c-0.55,0-1-0.45-1-1V4c0-0.55,0.45-1,1-1h7c0.55,0,1,0.45,1,1v7 C23,11.55,22.55,12,22,12z M16,10h5V5h-5V10z M11,23H4c-0.55,0-1-0.45-1-1v-7c0-0.55,0.45-1,1-1h7c0.55,0,1,0.45,1,1v7 C12,22.55,11.55,23,11,23z M5,21h5v-5H5V21z M22,23h-7c-0.55,0-1-0.45-1-1v-7c0-0.55,0.45-1,1-1h7c0.55,0,1,0.45,1,1v7 C23,22.55,22.55,23,22,23z M16,21h5v-5h-5V21z M25,1v24H1V1H25 M26,0H0v26h26V0L26,0z"
                      ></path>
                    </svg>
                  </li>
                  <li onClick={() => setArrangement("grid3")}>
                    <svg
                      style={{
                        fill:
                          arrangement === "grid3" ? "" : "var(--text-color)",
                      }}
                      width="37"
                      height="26"
                    >
                      <path
                        id="_x35__col"
                        class="st2"
                        d="M11,12H4c-0.55,0-1-0.45-1-1V4c0-0.55,0.45-1,1-1h7c0.55,0,1,0.45,1,1v7 C12,11.55,11.55,12,11,12z M5,10h5V5H5V10z M22,12h-7c-0.55,0-1-0.45-1-1V4c0-0.55,0.45-1,1-1h7c0.55,0,1,0.45,1,1v7 C23,11.55,22.55,12,22,12z M16,10h5V5h-5V10z M11,23H4c-0.55,0-1-0.45-1-1v-7c0-0.55,0.45-1,1-1h7c0.55,0,1,0.45,1,1v7 C12,22.55,11.55,23,11,23z M5,21h5v-5H5V21z M22,23h-7c-0.55,0-1-0.45-1-1v-7c0-0.55,0.45-1,1-1h7c0.55,0,1,0.45,1,1v7 C23,22.55,22.55,23,22,23z M16,21h5v-5h-5V21z M33,12h-7c-0.55,0-1-0.45-1-1V4c0-0.55,0.45-1,1-1h7c0.55,0,1,0.45,1,1v7 C34,11.55,33.55,12,33,12z M27,10h5V5h-5V10z M33,23h-7c-0.55,0-1-0.45-1-1v-7c0-0.55,0.45-1,1-1h7c0.55,0,1,0.45,1,1v7 C34,22.55,33.55,23,33,23z M27,21h5v-5h-5V21z M36,1v24H1V1H36 M37,0H0v26h37V0L37,0z"
                      ></path>
                    </svg>
                  </li>
                </>
              )}
              {isMobile && (
                <>
                  <li onClick={() => setArrangement("row")}>
                    <svg
                      style={{
                        fill: arrangement === "row" ? "" : "var(--text-color)",
                      }}
                      width="26"
                      height="26"
                    >
                      <path
                        id="list"
                        d="M25,1v24H1V1H25 M26,0H0v26h26V0L26,0z M22,7V5c0-0.55-0.45-1-1-1H5C4.45,4,4,4.45,4,5v2 c0,0.55,0.45,1,1,1h16C21.55,8,22,7.55,22,7z M22,14v-2c0-0.55-0.45-1-1-1H5c-0.55,0-1,0.45-1,1v2c0,0.55,0.45,1,1,1h16 C21.55,15,22,14.55,22,14z M22,21v-2c0-0.55-0.45-1-1-1H5c-0.55,0-1,0.45-1,1v2c0,0.55,0.45,1,1,1h16C21.55,22,22,21.55,22,21z"
                      ></path>
                    </svg>
                  </li>
                  <li onClick={() => setArrangement("grid1")}>
                    <svg
                      style={{
                        fill:
                          arrangement === "grid1" ? "" : "var(--text-color)",
                      }}
                      width={26}
                      height={26}
                    >
                      <path
                        id="_x31__col_sub"
                        class="st2"
                        d="M25,1v24H1V1H25 M26,0H0v26h26V0L26,0z M22,23H4c-0.55,0-1-0.45-1-1V4c0-0.55,0.45-1,1-1h18 c0.55,0,1,0.45,1,1v18C23,22.55,22.55,23,22,23z M5,21h16V5H5V21z"
                      ></path>
                    </svg>
                  </li>
                </>
              )}
            </ul>
            <div className={cx("sort")}>
              <div
                className={cx("drop-down")}
                onClick={() => setIsOpen((prev) => !prev)}
              >
                <span>{isMobile ? "Sort" : sortOption}</span>

                <IoMdArrowDropdown />
              </div>
              <div className={cx("sub-menu", isOpen ? "open" : "")}>
                <div className={cx("sub-header")}>
                  <span>sort by:</span>
                  <i>
                    <IoIosClose onClick={() => setIsOpen(false)} />
                  </i>
                </div>
                <ul>
                  {subMenu.map((sub, index) => (
                    <li
                      key={index}
                      onClick={() => setSortOption(sub.option)}
                      className={cx(sortOption === sub.option ? "active" : "")}
                    >
                      {sub.option}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div
            className={cx("products", {
              "products-row": arrangement === "row",
              "products-grid1": arrangement === "grid1",
              "products-grid2": arrangement === "grid2",
              "products-grid3": arrangement === "grid3",
              "products-grid4": arrangement === "grid4",
            })}
          >
            {sortedProducts.map((product) => {
              if (arrangement !== "row") {
                return (
                  <ProductBox1
                    product={product}
                    key={product._id}
                    index={product._id}
                    isFavorite={isInWishList(product._id)}
                    inCompareList={isInCompareList(product._id)}
                  />
                );
              } else {
                return (
                  <ProductBox2
                    product={product}
                    key={product._id}
                    isMobile={isMobile}
                    isFavorite={isInWishList(product._id)}
                  />
                );
              }
            })}
          </div>
        </div>
        <div className={cx("pagination")}>
          {page === 0 ? (
            <></>
          ) : (
            <span
              className={cx("btn", "prev")}
              onClick={() => handlePageChange(page - 1)}
            >
              <MdArrowLeft style={{ fontSize: "20px" }} />
              prev
            </span>
          )}

          <ul>
            {[...Array(pageCount).keys()].map((number) => (
              <li onClick={() => handlePageChange(number)} key={number}>
                <span className={cx(page === number ? "active" : "")}>
                  {number + 1}
                </span>
              </li>
            ))}
          </ul>
          {page === pageCount - 1 ? (
            <></>
          ) : (
            <span
              className={cx("btn", "next")}
              onClick={() => handlePageChange(page + 1)}
            >
              next
              <MdArrowRight style={{ fontSize: "20px" }} />
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

export default Shop;
