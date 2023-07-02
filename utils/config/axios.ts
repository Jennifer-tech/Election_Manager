import useGlobalStore, { GLOBAL_STORE, State } from "@/lib/store/global-store";
import axios, { AxiosResponse } from "axios";
import { useReadLocalStorage } from "usehooks-ts";

const baseURL = "https://election-api-chimaobi-cc3efd7d6eef.herokuapp.com";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
};

class BadResponseFormatError extends Error {
  constructor(public response: AxiosResponse) {
    super("Malformed response");
  }
}

const axiosInstance = axios.create({
  baseURL,
  timeout: 60000,
  headers,
  // withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const store = useGlobalStore.getState().store;

    // console.log('state.store?.access_token', state?.store?.access_token)
    // if (window !== undefined) {
    //   const data = JSON.parse(localStorage.getItem(GLOBAL_STORE)!);
    //   state = data ? data as State : {}

    // }

    if (store && store?.access_token) {
      config.headers["Authorization"] = `Bearer ${store.access_token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use((response: AxiosResponse) => {
  if (response.headers["content-type"] !== "application/json") {
    throw new BadResponseFormatError(response);
  }

  try {
    response.data = JSON.parse(response.data);
    return response;
  } catch {
    throw new BadResponseFormatError(response);
  }
});

export default axiosInstance;
