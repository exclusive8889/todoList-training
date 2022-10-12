import axios from "axios";
import { logout } from "../utils/apiRequest";


const axiosInstance = axios.create({
  baseURL: "https://www.task-manager.api.mvn-training.com",
});

const requestHandler = async(config) => {
  const atk = localStorage.getItem("accessToken");
  config.headers = {
    Authorization: `Bearer ${atk}`,
  };
  return config;
};

const responseErrorHandler = async (error) => {
  if (error?.response?.status === 401) {
    logout();
  }
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
