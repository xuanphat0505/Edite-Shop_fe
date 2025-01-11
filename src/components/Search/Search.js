import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import classNames from "classnames/bind";
import axios from "axios";

import { OpenContext } from "../../contexts/OpenContext/OpenContext";
import { BASE_URL } from "../../config/utils";
import SkeletonCard from "../../shared/SkeletonCard/SkeletonCard";

import styles from "./Search.module.scss";
import "react-loading-skeleton/dist/skeleton.css";
const cx = classNames.bind(styles);
function Search() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const { handleCloseSearch, openSearch } = useContext(OpenContext);
  const [searchInput, setSearchInput] = useState("");
  const [confirmInput, setConfirmInput] = useState("");
  const [searchResultArray, setSearchResultArray] = useState([]);
  const [searchResultText, setSearchResultText] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const clearSearchInput = () => {
    setSearchInput("");
    inputRef.current.focus();
  };
  const navigateToResultPage = () => {
    navigate("/product/result", {
      state: { products: searchResultArray, text: searchInput },
    });
    handleCloseSearch();
  };
  const handleNavigateAndReload = (link) => {
    navigate(link);
    window.location.reload();
  };
  const fetchDB = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/product/search?name=${searchInput}`
      );
      const result = res.data;
      if (!result.success) {
        setSearchResultText(result.message);
        setSearchResultArray([]);
      } else {
        setSearchResultArray(result.data);
        setSearchResultText("");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      return alert(error.response?.data?.message);
    }
  };

  useEffect(() => {
    openSearch
      ? document.body.classList.add(cx("no-scroll"))
      : document.body.classList.remove(cx("no-scroll"));
  }, [openSearch]);

  useEffect(() => {
    const delayDebounceFunc = setTimeout(() => {
      if (searchInput.trim()) {
        fetchDB();
        setConfirmInput(searchInput);
      }
    }, 1000); // Wait for 500ms after user stops typing

    return () => {
      clearTimeout(delayDebounceFunc);
    }; // Cleanup timeout if input changes
  }, [searchInput]); // Effect runs when `searchInput` changes
  return (
    <>
      <div
        className={cx("overlay", { active: openSearch })}
        onClick={handleCloseSearch}
      ></div>
      <section className={cx("search-form", { active: openSearch })}>
        <div className={cx("search-container")}>
          <div className={cx("search-header")}>
            <h1>Start typing and press Enter to search</h1>
            <button
              className={cx("close-btn", "search-close")}
              onClick={handleCloseSearch}
            >
              <div className={cx("line")}></div>
            </button>
          </div>
          <div className={cx("search-input")}>
            <form onSubmit={fetchDB}>
              <input
                ref={inputRef}
                type="text"
                placeholder="What are you looking for?"
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
              ></input>
            </form>
            <button
              onClick={clearSearchInput}
              className={cx({ active: searchInput })}
            >
              <svg>
                <path d="M12.41,11l5.29-5.29c0.39-0.39,0.39-1.02,0-1.41s-1.02-0.39-1.41,0L11,9.59L5.71,4.29c-0.39-0.39-1.02-0.39-1.41,0 s-0.39,1.02,0,1.41L9.59,11l-5.29,5.29c-0.39,0.39-0.39,1.02,0,1.41C4.49,17.9,4.74,18,5,18s0.51-0.1,0.71-0.29L11,12.41l5.29,5.29 C16.49,17.9,16.74,18,17,18s0.51-0.1,0.71-0.29c0.39-0.39,0.39-1.02,0-1.41L12.41,11z"></path>
              </svg>
            </button>
          </div>
          <div className={cx("search-title")}>
            {searchResultArray.length > 0 || searchResultText ? (
              "Search result"
            ) : (
              <></>
            )}
          </div>
          <div className={cx("search-result")}>
            {searchResultArray &&
              searchResultArray.map((result) => (
                <div className={cx("result-box")}>
                  <Link
                    to={`/product/${result._id}`}
                    className={cx("result-image")}
                  >
                    <img src={result.image} alt=""></img>
                  </Link>
                  <div className={cx("result-info")}>
                    <Link
                      onClick={() =>
                        handleNavigateAndReload(`/product/${result._id}`)
                      }
                    >
                      {result.name}
                    </Link>
                    {result.sale ? (
                      <span>
                        <del>${Number(result.price).toFixed(2)}</del>
                        <ins>${Number(result.newPrice).toFixed(2)}</ins>
                      </span>
                    ) : (
                      <span>$ {Number(result.newPrice).toFixed(2)}</span>
                    )}
                  </div>
                </div>
              ))}

            {searchResultText && (
              <div className={cx("search-result_text")}>
                <span>{searchResultText}</span>
              </div>
            )}
            {isLoading && <SkeletonCard cards={14}></SkeletonCard>}
          </div>
          <div className={cx("search-result_count")}>
            {searchResultArray.length > 0 || searchResultText ? (
              <div to="#" onClick={navigateToResultPage}>
                <span>
                  Search for "{confirmInput}" ({searchResultArray.length})
                </span>
                <span style={{ fontSize: "20px" }}>
                  <FaLongArrowAltRight />
                </span>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Search;
