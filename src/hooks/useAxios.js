import axios from "axios";
import { useEffect, useState } from "react";

const useAxios = (
  url,
  method = "get",
  delay = 0,
  headers = {},
  withCredentials = false,
  id
) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios(url, {
        method: method,
        headers: headers,
        withCredentials: withCredentials,
      });
      const result = res.data;

      setData(result.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return error.response?.data?.message;
    }
  };
  useEffect(() => {
    if (url) {
      const timeoutId = setTimeout(() => {
        fetchData();
      }, delay);
      return () => clearTimeout(timeoutId);
    }
  }, [url, delay, id]);
  const refetch = () => {
    fetchData();
  };
  return { data, loading, refetch };
};

export default useAxios;
