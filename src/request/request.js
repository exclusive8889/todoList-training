import axios from "axios";
import { logout } from "../utils/apiRequest";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import { useEffect } from "react";


const axiosInstance = axios.create({
  baseURL: "https://www.task-manager.api.mvn-training.com",
});

const requestHandler = async(config) => {
  // const atk = localStorage.getItem("accessToken");
  const tk1 = JSON.parse(localStorage.getItem("persist:accessToken"));
  const atk = JSON.parse(tk1.auth).accessToken;

  useEffect(()=>{
    tk1 = JSON.parse(localStorage.getItem("persist:accessToken"));
    atk = JSON.parse(tk1.auth).accessToken;
  },[tk1])
  
  console.log(tk1)


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
