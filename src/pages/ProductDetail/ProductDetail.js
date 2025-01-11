import { useEffect, useState, useRef, useContext } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { FaMinus, FaPlus, FaCheck } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import classNames from "classnames/bind";
import Tippy from "@tippy.js/react";
import ReactImageMagnify from "react-image-magnify";

import { shareBtn, paymentImages } from "../../assets/data/Data";
import { BASE_URL } from "../../config/utils";
import { OpenContext } from "../../contexts/OpenContext/OpenContext";
import { AxiosContext } from "../../contexts/AxiosContext/AxiosContext";
import useAxiosJWT from "../../config/axiosConfig";
import productDetaiImage1 from "../../assets/images/produc-detail-1.webp";
import productDetaiImage2 from "../../assets/images/produc-detail-2.webp";
import productDetaiImage3 from "../../assets/images/produc-detail-3.webp";
import Design1 from "../../shared/Design/Design1";
import useAxios from "../../hooks/useAxios";
import MiniAddProduct from "../../components/MiniAddProduct/MiniAddProduct";
import LightBox from "../../components/LightBox/LightBox";

import styles from "./ProductDetail.module.scss";
import Loader from "../../shared/Loader/Loader";
const cx = classNames.bind(styles);
function ProductDetail() {
  const subImagesRef = useRef(null);
  const getAxiosJWT = useAxiosJWT();
  const { id } = useParams();

  // get the accessToken
  const axiosJWT = getAxiosJWT();
  const accessToken = useSelector((state) => state?.auth?.user?.accessToken);

  // get random products
  const getRandomProducts = (products, recentlyProducts, count) => {
    if (recentlyProducts.length > 0) {
      const filterProducts = products.filter(
        (product) =>
          !recentlyProducts.some((recent) => recent._id === product._id)
      );
      const shuffled = [...filterProducts].sort(() => 0.5 - Math.random()); // Shuffle the array
      return shuffled.slice(0, count); // Return the first 'count' number of products
    } else {
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }
  };

  // call api with custom hook
  const { data: products } = useAxios(`${BASE_URL}/product`);
  const { data: productDetail } = useAxios(`${BASE_URL}/product/${id}`);
  const { data: recentlyProducts, refetch } = useAxios(
    `${BASE_URL}/product/recently`,
    "get",
    0,
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    true,
    id
  );

  // useContext
  const { handleOpenQuestionPopUp, handleOpenCompare } =
    useContext(OpenContext);
  const {
    addToCartLoading,
    isInWishList,
    isInCompareList,
    handleGetProductDetail,
    handleAddToWishList,
    handleAddToCompare,
    handleAddToCart,
  } = useContext(AxiosContext);

  // function slide image and responsive
  const index = products.findIndex((product) => product._id === id);
  const isTabletView = window.innerWidth < 1023;
  const isMobileView = window.innerWidth <= 767;
  const { data: previousProduct } = useAxios(
    index <= 0 ? null : `${BASE_URL}/product/${products[index - 1]?._id}`
  );
  const { data: nextProduct } = useAxios(
    index >= products.length - 1
      ? null
      : `${BASE_URL}/product/${products[index + 1]?._id}`
  );
  const [tab, setTab] = useState(isMobileView ? [] : "desc");
  const [scroll, setScroll] = useState(false);
  const [openLightBox, setOpenLightBox] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const [countValue, setCountValue] = useState(1);
  const [optionColorName, setOptionColorName] = useState("");
  const [randomProducts, setRandomProducts] = useState([]);

  const handleAddAndOpen = (id) => {
    handleAddToCompare(id);
    handleOpenCompare();
  };
  const handleGetAndOpen = (id) => {
    handleGetProductDetail(id, false);
    handleOpenQuestionPopUp();
  };
  const handleImageClick = (imageId, index, colorName) => {
    setCurrentImageIndex(imageId);
    setOptionColorName(colorName);
    const subImagesContainer = subImagesRef.current;
    const subImage = subImagesContainer.children[index];

    if (isTabletView) {
      // Scroll horizontally if screen width is below 1023px
      const subImageOffsetLeft = subImage.offsetLeft;
      const containerWidth = subImagesContainer.offsetWidth;

      // Scroll smoothly only within the sub-images container
      subImagesContainer.scrollTo({
        left:
          subImageOffsetLeft - containerWidth / 2 + subImage.offsetWidth / 2,
        behavior: "smooth",
      });
    } else {
      // Scroll vertically if screen width is 1023px or above
      const subImageOffsetTop = subImage.offsetTop;
      const containerHeight = subImagesContainer.offsetHeight;

      // Scroll smoothly only within the sub-images container
      subImagesContainer.scrollTo({
        top:
          subImageOffsetTop - containerHeight / 2 + subImage.offsetHeight / 2,
        behavior: "smooth",
      });
    }
  };
  const handleNextImg = () => {
    setCurrentImageIndex((prev) =>
      prev === productDetail[0].subImage.length
        ? productDetail[0].subImage.length
        : prev + 1
    );
    const subImagesContainer = subImagesRef.current;
    if (isTabletView) {
      // Scroll right by the width of one sub-image

      const scrollAmount = subImagesContainer.firstChild.offsetWidth;
      subImagesContainer.scrollTo({
        left: subImagesContainer.scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    } else {
      // Scroll down by the height of one sub-image
      const scrollAmount = subImagesContainer.firstChild.offsetHeight;
      subImagesContainer.scrollTo({
        top: subImagesContainer.scrollTop + scrollAmount,
        behavior: "smooth",
      });
    }
  };
  const handlePrevImg = () => {
    setCurrentImageIndex((prev) => (prev === 1 ? 1 : prev - 1));
    const subImagesContainer = subImagesRef.current;

    if (isTabletView) {
      // Scroll up by the left of one sub-image

      const scrollAmount = subImagesContainer.firstChild.offsetWidth;
      subImagesContainer.scrollTo({
        left: subImagesContainer.scrollLeft - scrollAmount,
        behavior: "smooth",
      });
    } else {
      // Scroll up by the height of one sub-image
      const scrollAmount = subImagesContainer.firstChild.offsetHeight;
      subImagesContainer.scrollTo({
        top: subImagesContainer.scrollTop - scrollAmount,
        behavior: "smooth",
      });
    }
  };
  const handleSrcollProductMini = () => {
    if (window.scrollY >= 350) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };
  const handleToggle = (colName) => {
    if (isMobileView) {
      if (tab.includes(colName)) {
        setTab(tab.filter((name) => name !== colName));
      } else {
        setTab([...tab, colName]);
      }
    } else {
      setTab((prev) => (prev === colName ? prev : colName));
    }
  };
  const handleAddRecentlyProducts = async () => {
    try {
      await axiosJWT.post(
        `${BASE_URL}/product/recently/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      refetch();
    } catch (error) {
      return error?.response?.data.message;
    }
  };
  useEffect(() => {
    setOptionColorName(productDetail[0]?.optionColor[0]?.colorName);
  }, [productDetail]);
  useEffect(() => {
    handleAddRecentlyProducts();
    window.scrollTo({
      top: 0,
      behavior: "smooth", // This enables smooth scrolling
    });
    refetch();
    setCountValue(1);
  }, [id]);
  useEffect(() => {
    window.addEventListener("scroll", handleSrcollProductMini);
  });

  useEffect(() => {
    const newProducts = getRandomProducts(products, recentlyProducts, 4);
    setRandomProducts(newProducts);
  }, [id, products, recentlyProducts]);

  return (
    <section className={cx("product-detail_section")}>
      <div className={cx("product-detail_container")}>
        <div className={cx("product-detail_path")}>
          <div className={cx("col-left")}>
            <Link to="/">home</Link>
            <span>
              <svg width="10px" height="10px" viewBox="0 0 22 22">
                <polygon points="6,20 6,2 17,11 "></polygon>
              </svg>
            </span>
            <p>{productDetail[0]?.name}</p>
          </div>
          <div className={cx("col-right")}>
            <div className={cx("prev-next")}>
              {index === 0 ? (
                <></>
              ) : (
                <Tippy
                  content={
                    <div
                      className={cx("tootlip")}
                      style={{ textTransform: "capitalize" }}
                    >
                      {previousProduct[0]?.name}
                    </div>
                  }
                >
                  <Link to={`/product/${previousProduct[0]?._id}`}>prev</Link>
                </Tippy>
              )}
              <Tippy
                content={<div className={cx("tootlip")}>Back to Home page</div>}
              >
                <Link to="/">
                  <svg viewBox="0 0 18 18">
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
                </Link>
              </Tippy>
              {index === products.length - 1 ? (
                <div style={{ width: "30px", pointerEvents: "none" }}></div>
              ) : (
                <Tippy
                  content={
                    <div
                      className={cx("tootlip")}
                      style={{ textTransform: "capitalize" }}
                    >
                      {nextProduct[0]?.name}
                    </div>
                  }
                >
                  <Link to={`/product/${nextProduct[0]?._id}`}>next</Link>
                </Tippy>
              )}
            </div>
          </div>
        </div>
        <div className={cx("main-content")}>
          <div className={cx("product-detail_image")}>
            <div className={cx("sub-images")} ref={subImagesRef}>
              {productDetail[0]?.subImage.map((image, index) => (
                <div
                  className={cx("sub-image_box", {
                    active: image.id === currentImageIndex,
                  })}
                  key={image.id}
                  onClick={() =>
                    handleImageClick(
                      image.id,
                      index,
                      image.colorImage ? image.colorImage : optionColorName
                    )
                  }
                >
                  <img src={image.src} alt=""></img>
                </div>
              ))}
            </div>
            <div className={cx("main-image")}>
              {isMobileView ? (
                <img
                  src={productDetail[0]?.subImage[currentImageIndex - 1]?.src}
                  alt=""
                ></img>
              ) : (
                <ReactImageMagnify
                  style={{ width: "100%", height: "100%" }}
                  {...{
                    smallImage: {
                      alt: "Wristwatch by Ted Baker London",
                      isFluidWidth: true,
                      src: productDetail[0]?.subImage[currentImageIndex - 1]
                        ?.src,
                    },
                    largeImage: {
                      src: productDetail[0]?.subImage[currentImageIndex - 1]
                        ?.src,
                      width: 1200,
                      height: 1200,
                    },
                    enlargedImageContainerClassName: "large-image-container",
                    className: "small-image-container",
                  }}
                />
              )}

              <button
                className={cx("navigation-btn", "left")}
                onClick={handlePrevImg}
              >
                <svg viewBox="0 0 100 100">
                  <path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z"></path>
                </svg>
              </button>
              <button
                className={cx("navigation-btn", "right")}
                onClick={handleNextImg}
              >
                <svg viewBox="0 0 100 100">
                  <path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z"></path>
                </svg>
              </button>
              {productDetail[0]?.sale ? (
                <span className={cx("sale-box", "product-detail_sale")}>
                  {productDetail[0]?.sale}%
                </span>
              ) : (
                <></>
              )}
              <div className={cx("show-image_btn")}>
                <button onClick={() => setOpenLightBox(true)}>
                  <span className={cx("show-image_text")}>
                    Click to enlarge
                  </span>
                  <span className={cx("show-image_icon")}>
                    <svg viewBox="0 0 448 512" width="14">
                      <path d="M416 176V86.63L246.6 256L416 425.4V336c0-8.844 7.156-16 16-16s16 7.156 16 16v128c0 8.844-7.156 16-16 16h-128c-8.844 0-16-7.156-16-16s7.156-16 16-16h89.38L224 278.6L54.63 448H144C152.8 448 160 455.2 160 464S152.8 480 144 480h-128C7.156 480 0 472.8 0 464v-128C0 327.2 7.156 320 16 320S32 327.2 32 336v89.38L201.4 256L32 86.63V176C32 184.8 24.84 192 16 192S0 184.8 0 176v-128C0 39.16 7.156 32 16 32h128C152.8 32 160 39.16 160 48S152.8 64 144 64H54.63L224 233.4L393.4 64H304C295.2 64 288 56.84 288 48S295.2 32 304 32h128C440.8 32 448 39.16 448 48v128C448 184.8 440.8 192 432 192S416 184.8 416 176z"></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className={cx("product-detail_content")}>
            <h1>{productDetail[0]?.name}</h1>
            <div className={cx("product-detail_price", "product-price")}>
              {productDetail[0]?.sale ? (
                <>
                  <del>${Number(productDetail[0]?.price).toFixed(2)}</del>
                  <ins>${Number(productDetail[0]?.newPrice).toFixed(2)}</ins>
                </>
              ) : (
                `$${Number(productDetail[0]?.newPrice).toFixed(2)}`
              )}
            </div>
            <div className={cx("tax")}>Tax included.</div>
            <p>
              A discerning wardrobe consists of timeless basics. Our henley is
              unmistakably refined, subtle, and features an attractive neckline
              with a deep five-button placket.
            </p>
            {productDetail[0]?.optionColor.length > 0 ? (
              <div className={cx("option-color_container")}>
                <h4>
                  color: <span>{optionColorName}</span>
                </h4>
                <div className={cx("option-colors", "product-detail_option")}>
                  {productDetail[0]?.optionColor?.map((option) => (
                    <Tippy
                      content={
                        <div className={cx("tootlip")}>{option.colorName}</div>
                      }
                    >
                      <span
                        className={cx("outer", "product-detail_outer", {
                          active: option.optionImageId === currentImageIndex,
                        })}
                        key={option._id}
                        onClick={() =>
                          handleImageClick(
                            option.optionImageId,
                            option.optionImageId,
                            option.colorName
                          )
                        }
                      >
                        <span
                          className={cx("inner", "product-detail_inner")}
                          style={{ backgroundColor: option.code }}
                        ></span>
                      </span>
                    </Tippy>
                  ))}
                </div>
              </div>
            ) : (
              <></>
            )}

            <div className={cx("product-detail_btns")}>
              <div className={cx("quantity")}>
                <button
                  onClick={() =>
                    setCountValue((prev) =>
                      prev === 1 ? prev : Number(prev) - 1
                    )
                  }
                >
                  <FaMinus />
                </button>
                <input
                  type="number"
                  min={1}
                  step={1}
                  value={countValue}
                  onChange={(e) => setCountValue(e.target.value)}
                ></input>
                <button
                  onClick={() => setCountValue((prev) => Number(prev) + 1)}
                >
                  <FaPlus />
                </button>
              </div>
              <button
                className={cx("add-btn", "sway-btn")}
                onClick={() =>
                  handleAddToCart(
                    productDetail[0]?._id,
                    countValue,
                    optionColorName
                  )
                }
              >
                {addToCartLoading === productDetail[0]?._id ? (
                  <Loader
                    size={18}
                    color="var(--background-color)"
                    loading={addToCartLoading === productDetail[0]?._id}
                  />
                ) : (
                  <>
                    <FiShoppingCart style={{ width: "18px", height: "18px" }} />
                    <span>add to cart</span>
                  </>
                )}
              </button>
              <div className={cx("compare-heart_btns")}>
                <Link
                  className={cx("heart-btn", { active: isInWishList(id) })}
                  onClick={() => handleAddToWishList(id)}
                >
                  <span>
                    <FaHeart />
                  </span>
                </Link>
                <Link
                  className={cx("compare-btn", { active: isInCompareList(id) })}
                  onClick={() => handleAddAndOpen(id)}
                >
                  <span style={{ fontSize: "22px" }}>
                    <FaCheck />
                  </span>
                </Link>
              </div>
            </div>
            <div className={cx("product-category")}>
              Categories: <span>Funiture</span>
            </div>
            <div className={cx("share")}>
              <span>Share:</span>
              <div className={cx("social-share_btns")}>
                {shareBtn.map((btn, index) => (
                  <div className={cx("share-icon")} key={index}>
                    <Tippy
                      content={
                        <div className={cx("tootlip")}>
                          Share on {btn.tootlip}
                        </div>
                      }
                    >
                      <Link>
                        <svg viewBox={btn.viewBox}>
                          <path d={btn.path}></path>
                        </svg>
                      </Link>
                    </Tippy>
                  </div>
                ))}
              </div>
            </div>
            <div
              className={cx("ask-question")}
              onClick={() => handleGetAndOpen(productDetail[0]?._id)}
            >
              <Link>
                <svg width="20px" height="20px" viewBox="0 0 18 18">
                  <path d="M17,3H1C0.45,3,0,3.45,0,4v10c0,0.55,0.45,1,1,1h16c0.55,0,1-0.45,1-1V4C18,3.45,17.55,3,17,3z M13.46,5L9,6.91L4.54,5H13.46z M2,13V6.09l7,3l7-3V13H2z"></path>
                </svg>
                ask a question
              </Link>
            </div>
            <div className={cx("payment")}>
              {paymentImages.map((payment, index) => (
                <img src={payment.image} alt="" key={index}></img>
              ))}
            </div>
          </div>
        </div>
        <div className={cx("product-detail_tabs")}>
          <div className={cx("product-tab_header")}>
            <ul>
              <li onClick={() => handleToggle("desc")}>
                <Link className={cx({ active: tab === "desc" })}>
                  description
                </Link>
              </li>
              {productDetail[0]?.optionColor.length > 0 ? (
                <li onClick={() => handleToggle("information")}>
                  <Link className={cx({ active: tab === "information" })}>
                    additional information
                  </Link>
                </li>
              ) : (
                <></>
              )}

              <li onClick={() => handleToggle("custom")}>
                <Link className={cx({ active: tab === "custom" })}>
                  tab custom liquid
                </Link>
              </li>
            </ul>
          </div>
          <div className={cx("tab-content")}>
            <div
              className={cx("tab-box", "description", {
                active: isMobileView ? tab.includes("desc") : tab === "desc",
              })}
            >
              <Link onClick={() => handleToggle("desc")}>
                <span>description</span>
                <span>
                  <FaPlus />
                </span>
              </Link>
              <div className={cx("tab-box_content")}>
                <div className={cx("col", "col-left")}>
                  <h4>description</h4>
                  <p>
                    Finally—a white sneaker for the rest of your life. Whether
                    you’re walking, working, or simply kicking it, the versatile
                    and understated Royale Blanco is going to get you where you
                    need to go. It might even help you feel better about where
                    you are right now. Every great outfit is built from the
                    ground up. Start here.
                  </p>
                  <p>
                    Typography is the work of typesetters, compositors,
                    typographers, graphic designers, art directors, manga
                    artists, comic book artists, graffiti artists, and
                    now—anyone who arranges words, letters, numbers, and symbols
                    for publication, display, or distribution—from clerical
                    workers and newsletter writers to anyone self-publishing
                    materials
                  </p>
                </div>
                <div className={cx("col", "col-right")}>
                  <h4>details</h4>
                  <ul>
                    <li>
                      Made from full-grain leather sourced from top-rated local
                      Italian tanneries
                    </li>
                    <li>
                      Handcrafted in Italy at a best-in-class factory, a leader
                      in responsible and sustainable practices
                    </li>
                    <li>Lined with breathable soft leather</li>
                    <li>
                      Premium footbed with antimicrobial properties and extra
                      cushioning
                    </li>
                    <li>100% waxed-cotton laces</li>
                    <li>No virgin plastics ever</li>
                  </ul>
                </div>
              </div>
              <div className={cx("tab-box_images")}>
                <div className={cx("col-image")}>
                  <img src={productDetaiImage1} alt=""></img>
                </div>
                <div className={cx("col-image")}>
                  <img src={productDetaiImage2} alt=""></img>
                </div>
                <div className={cx("col-image")}>
                  <img src={productDetaiImage3} alt=""></img>
                </div>
              </div>
            </div>
            <div
              className={cx("information-colors", "tab-box", {
                active: isMobileView
                  ? tab.includes("information")
                  : tab === "information",
              })}
            >
              <Link onClick={() => handleToggle("information")}>
                <span>information</span>
                <span>
                  <FaPlus />
                </span>
              </Link>
              <div className={cx("table")}>
                <table>
                  <tbody>
                    <tr>
                      <th>color</th>
                      <td>
                        {productDetail[0]?.optionColor
                          .map((color) => color.colorName)
                          .join(", ")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div
              className={cx("tab-box", "custom", {
                active: isMobileView
                  ? tab.includes("custom")
                  : tab === "custom",
              })}
            >
              <Link onClick={() => handleToggle("custom")}>
                <span>custom</span>
                <span>
                  <FaPlus />
                </span>
              </Link>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
            <div className={cx("recent-random_products")}>
              <h3>You may also like</h3>
              <Design1 products={randomProducts} />
            </div>
            {recentlyProducts.length > 0 ? (
              <div className={cx("recent-random_products")}>
                <h3>Recent products</h3>
                <Design1 products={recentlyProducts} />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <LightBox
          openLightBox={openLightBox}
          setOpenLightBox={setOpenLightBox}
          productDetail={productDetail}
        />
        <MiniAddProduct
          scroll={scroll}
          productDetail={productDetail[0]}
          countValue={countValue}
          optionColorName={optionColorName}
          currentImageIndex={currentImageIndex}
          setCountValue={setCountValue}
          handleImageClick={handleImageClick}
        />
      </div>
    </section>
  );
}

export default ProductDetail;
