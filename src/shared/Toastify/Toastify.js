import { toast } from "react-toastify";

export const toastSuccess = (message, time=2000) => {
  return toast.success(message, {
    autoClose: time,
    pauseOnHover: false,
    position: "top-right",
  });
};
export const toastWarn = (message) => {
  return toast.warn(message, {
    autoClose: 2000,
    pauseOnHover: false,
    position: "top-right",
  });
};
export const toastError = (message) => {
  return toast.error(message, {
    autoClose: 2000,
    pauseOnHover: false,
    position: "top-right",
  });
};
