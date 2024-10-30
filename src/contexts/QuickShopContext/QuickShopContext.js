import { createContext, useState } from "react";

import { BASE_URL } from "../../config/utils";
import axios from "axios";

export const QuickShopContext = createContext();
function QuickShopProvider({ children }) {
  const [quickShopDetail, setQuickShopDetail] = useState([]);
  const handleGetProductDetail = async (productId) => {
    try {
      const res = await axios.get(`${BASE_URL}/product/${productId}`);
      const result = res.data;
      setQuickShopDetail(result.data);
    } catch (error) {
      return alert(error?.response?.data.message);
    }
  };
  return (
    <QuickShopContext.Provider
      value={{ quickShopDetail, handleGetProductDetail }}
    >
      {children}
    </QuickShopContext.Provider>
  );
}

export default QuickShopProvider;
