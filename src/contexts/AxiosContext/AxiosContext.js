import { createContext, useContext, useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";

import useAxiosJWT from "../../config/axiosConfig";
import { BASE_URL } from "../../config/utils";
import { OpenContext } from "../OpenContext/OpenContext";
import { toastSuccess, toastError } from "../../shared/Toastify/Toastify";
import { logoutStart, logoutSuccess, logoutFailed } from "../../redux/authSlice";
import useAxios from "../../hooks/useAxios";

export const AxiosContext = createContext();

function AxiosProvider({ children }) {
  const getAxiosJWT = useAxiosJWT();
  const axiosJWT = getAxiosJWT();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state?.auth?.user?.accessToken);
  const user = useSelector((state) => state?.auth?.user);

  const { handleCloseShop, handleOpenShop, handleOpenCompare } =
    useContext(OpenContext);

  const [findProductDetail, setFindProductDetail] = useState({});
  const { data: allProducts } = useAxios(`${BASE_URL}/product`);

  // loading when call api
  const [addToCartLoading, setAddToCartLoading] = useState(null);
  const [quickShopLoading, setQuickShopLoading] = useState(null);
  const [compareLoading, setCompareLoading] = useState(null);
  const [wishListLoading, setWishListLoading] = useState(null);
  const [updateCartLoading, setUpdateCartLoading] = useState(null);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [clicked, setClicked] = useState(null);
  //
  const [wishList, setWishList] = useState([]);
  const [wishListProduct, setWishListProducts] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [compareProducts, setCompareProducts] = useState([]);
  const [productDetail, setProductDetail] = useState([]);
  const [productsInCart, setProductsInCart] = useState([]);
  const [noteInCart, setNoteInCart] = useState("");

  const handleFindProductDetail = (id) => {
    const productDetail = allProducts.find((product) => product._id === id);
    setFindProductDetail(productDetail);
  };
  const handleLogout = async () => {
    if (!user?.accessToken) {
      return toastError("You are not logged in yet");
    }
    setLogoutLoading(true);
    dispatch(logoutStart());  
    try {
      const res = await axiosJWT.post(
        `${BASE_URL}/auth/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
          withCredentials: true,
        }
      );
      const result = res.data;
      if (result.success) {
        dispatch(logoutSuccess());
        setLogoutLoading(false);
        toastSuccess(result.message, 1000);
        setTimeout(() => {
          window.location.reload(); // Reload to reflect the logged-out state
        }, 1500);
      }
    } catch (error) {
      dispatch(logoutFailed());
      setLogoutLoading(false);
      return toastError(error?.response?.data.message);
    }
  };
  // wishlist
  const addToWishList = async (productId) => {
    if (!accessToken) {
      return toastError("You are not logged in yet");
    }
    setWishListLoading(productId);
    try {
      const res = await axiosJWT.post(
        `${BASE_URL}/wishList/add`,
        { productId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      const result = res.data;
      if (result.success) {
        setWishListLoading(null);
        setWishList((prev) => [...prev, productId]);
        return toastSuccess(result.message);
      }
    } catch (error) {
      setWishListLoading(null);
      return toastError(error?.response?.data.message);
    }
  };
  const handleAddToWishList = async (productId) => {
    await addToWishList(productId);
  };
  const getAllFavoriteProduct = async () => {
    try {
      const res = await axiosJWT.get(`${BASE_URL}/wishList/products`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      const result = res.data;
      setWishListProducts(result.data);
    } catch (error) {}
  };
  const handleRemoveFavoriteProduct = async (productId) => {
    if (!accessToken) {
      return toastError("You are not logged in yet");
    }
    try {
      const res = await axiosJWT.post(
        `${BASE_URL}/wishList/remove`,
        { productId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      const result = res.data;
      if (result.success) {
        setWishListProducts((prev) =>
          prev.filter((product) => product._id !== productId)
        );
        setWishList((prev) => prev.filter((id) => id !== productId));
        return toastSuccess(result.message);  
      }
    } catch (error) {
      return toastError(error?.response?.data?.message);
    }
  };
  const isInWishList = (productId) => {
    return wishList.includes(productId);
  };

  useEffect(() => {
    const handleGetWishList = async () => {
      try {
        const res = await axiosJWT.get(`${BASE_URL}/wishList`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        });
        // const result = res.data;
        setWishList(res.data?.data || []);
      } catch (error) {}
    };
    handleGetWishList();
  }, [accessToken]);
  useEffect(() => {
    getAllFavoriteProduct();
  }, [wishList]);

  // comapre
  const handleAddToCompare = async (productId) => {
    if (!accessToken) {
      return toastError("You are not logged in yet");
    }
    setCompareLoading(productId);
    try {
      const res = await axiosJWT.post(
        `${BASE_URL}/compare/add`,
        { productId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      const result = res.data;
      if (result.success) {
        setCompareLoading(null);
        handleOpenCompare();
        setCompareList((prev) => [...prev, productId]);
      }
    } catch (error) {
      setCompareLoading(null);
    }
  };
  const handleGetCompareProducts = async () => {
    try {
      const res = await axiosJWT.get(`${BASE_URL}/compare/get`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      const result = res.data;
      if (result) {
        setCompareProducts(result.data);
      }
    } catch (error) {}
  };
  const handleRemoveCompareProduct = async (productId) => {
    if (!accessToken) {
      return toastError("You are not logged in yet");
    }
    try {
      const res = await axiosJWT.delete(
        `${BASE_URL}/compare/remove/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      const result = res.data;
      if (result.success) {
        setUpdateCartLoading(productId);
        setCompareProducts((prev) =>
          prev.filter((product) => product._id !== productId)
        );
        setCompareList((prev) =>
          prev.filter((product) => product !== productId)
        );
      }
    } catch (error) {
      return toastError(error?.response?.data.message);
    }
  };
  const handleClearCompareList = async () => {
    if (!accessToken) {
      return toastError("You are not logged in yet");
    }
    try {
      const res = await axiosJWT.delete(`${BASE_URL}/compare/clear`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      const result = res.data;
      if (result) {
        setCompareProducts([]);
        setCompareList([]);
      }
    } catch (error) {
      return toastError(error?.response?.data.message);
    }
  };
  const isInCompareList = (productId) => {
    return compareList.includes(productId);
  };

  useEffect(() => {
    const handleGetCompareList = async () => {
      try {
        const res = await axiosJWT.get(`${BASE_URL}/compare`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        });
        const result = res.data;
        if (result.data) {
          setCompareList(result.data);
        }
      } catch (error) {}
    };
    handleGetCompareList();
  }, []);
  useEffect(() => {
    handleGetCompareProducts();
  }, [compareList]);

  // get product detail
  const handleGetProductDetail = async (id, open = true) => {
    setQuickShopLoading(id);
    try {
      const res = await axios.get(`${BASE_URL}/product/${id}`);
      const result = res.data;
      if (result.success) {
        setQuickShopLoading(null);
        setProductDetail(result.data);
        if (open) {
          handleOpenShop();
        }
      }
    } catch (error) {
      setQuickShopLoading(null);
      throw error;
    }
  };

  // add to cart
  const handleAddToCart = async (
    productId,
    count,
    colorName,
    shouldOpen = true
  ) => {
    if (!accessToken) {
      return toastError("You are not logged in yet");
    }
    setAddToCartLoading(productId);
    setClicked(productId);
    try {
      const res = await axiosJWT.post(
        `${BASE_URL}/cart/add`,
        {
          productId,
          count,
          colorName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      const result = res.data;
      if (result.success) {
        setAddToCartLoading(null);
        setClicked(null);
        getProductsInCart();
        handleCloseShop();
        toastSuccess(result.message);
      }
    } catch (error) {
      setAddToCartLoading(null);
      setClicked(null);
      return toastError(error?.response?.data.message);
    }
  };
  const handleRemoveProductInCart = async (productId) => {
    if (!accessToken) {
      return toastError("You are not logged in yet");
    }
    setUpdateCartLoading(productId);
    try {
      const res = await axiosJWT.post(
        `${BASE_URL}/cart/remove`,
        { productId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      const result = res.data;
      if (result.success) {
        setUpdateCartLoading(null);
        getProductsInCart();
      }
    } catch (error) {
      setUpdateCartLoading(null);
      return toastError(error?.response?.data.message);
    }
  };
  const handleIncreaseProductInCart = async (productId) => {
    if (!accessToken) {
      return toastError("You are not logged in yet");
    }
    setUpdateCartLoading(productId);
    try {
      const res = await axiosJWT.post(
        `${BASE_URL}/cart/increase`,
        { productId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      const result = res.data;
      if (result.success) {
        setUpdateCartLoading(null);
        getProductsInCart();
      }
    } catch (error) {
      setUpdateCartLoading(null);
      return toastError(error?.response?.data.message);
    }
  };
  const handleDecreaseProductInCart = async (productId) => {
    if (!accessToken) {
      return toastError("You are not logged in yet");
    }
    setUpdateCartLoading(productId);
    try {
      const res = await axiosJWT.post(
        `${BASE_URL}/cart/decrease`,
        { productId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      const result = res.data;
      if (result.success) {
        setUpdateCartLoading(null);
        getProductsInCart();
      }
    } catch (error) {
      setUpdateCartLoading(null);
      return toastError(error?.response?.data.message);
    }
  };
  const getProductsInCart = async () => {
    try {
      const res = await axiosJWT.get(`${BASE_URL}/cart`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      const result = res.data;
      setProductsInCart(result.data.cart);
      setNoteInCart(result.data.note);
    } catch (error) {}
  };

  useEffect(() => {
    getProductsInCart();
  }, []);

  const subTotalPrice = productsInCart.reduce((acc, item) => {
    const productPrice = parseFloat(item.productId?.newPrice);
    return acc + productPrice * item.count;
  }, 0);
  return (
    <AxiosContext.Provider
      value={{
        // loading
        addToCartLoading,
        quickShopLoading,
        compareLoading,
        wishListLoading,
        updateCartLoading,
        clicked,
        //
        wishListProduct,
        compareProducts,
        productDetail,
        productsInCart,
        noteInCart,
        subTotalPrice,
        findProductDetail,
        logoutLoading,

        isInWishList,
        handleRemoveFavoriteProduct,
        handleAddToWishList,
        handleAddToCompare,
        handleRemoveCompareProduct,
        handleClearCompareList,
        isInCompareList,
        handleGetProductDetail,
        handleAddToCart,
        handleRemoveProductInCart,
        handleIncreaseProductInCart,
        handleDecreaseProductInCart,
        getProductsInCart,
        handleFindProductDetail,
        handleLogout,
      }}
    >
      {children}
    </AxiosContext.Provider>
  );
}

export default AxiosProvider;
