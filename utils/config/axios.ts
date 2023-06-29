import axios from "axios";

const baseURL = "https://election-api-chimaobi-cc3efd7d6eef.herokuapp.com";

const headers = {};

const axiosInstance = axios.create({
  baseURL,
  timeout: 60000,
  headers,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if ("token") {
      config.headers["Authorization"] = `Bearer ${"token"}'`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
