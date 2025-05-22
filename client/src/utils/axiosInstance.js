import axios from "axios";
import { BASE_URL } from "../utils/apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem("token");
      // Optionally use React router or a global logout handler
      window.location.href = "/login";
    } else if (status === 500) {
      console.error("Internal Server Error. Please try again later.");
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timed out. Please try again.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
