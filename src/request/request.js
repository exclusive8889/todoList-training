import axios from "axios";
import { logout } from "../utils/apiRequest";
import { useSelector } from "react-redux";

const axiosInstance = axios.create({
  baseURL: "https://www.task-manager.api.mvn-training.com",
});

const requestHandler = (config) => {
  const atk = localStorage.getItem("accessToken");

  // const tk1=JSON.parse(localStorage.getItem("persist:accessToken"))
  // const atk=JSON.parse(tk1.auth).accessToken
  // console.log(atk)

  config.headers = {
    Authorization: `Bearer ${atk}`,
  };
  return config;
};

const responseErrorHandler = async (error) => {
  if (error?.response?.status === 401) {
    // alert(error?.response?.data.error.message)
    // logout();
  }
  // const data= error?.response?.data;
  // const message = data?.message;

  // if (message) {
  //   throw new Error(message);
  // }
  return Promise.reject(error);
};
axiosInstance.interceptors.response.use(
  (response) => response,
  responseErrorHandler
);
axiosInstance.interceptors.request.use(requestHandler, (err) =>
  Promise.reject(err)
);

export { axiosInstance as ApiClient };
