import { GLOBAL_STORE, State } from "@/lib/store/global-store";
import axios from "axios";
import { useReadLocalStorage } from "usehooks-ts";

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
    const store = useReadLocalStorage<State>(GLOBAL_STORE)?.store
    if (store && store.access_token) {
      config.headers["Authorization"] = `Bearer ${store.access_token}'`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
