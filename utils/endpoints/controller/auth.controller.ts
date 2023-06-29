import { Alert } from "@/components/Alert";
import { URLSearchParams } from "url";
import { Auth } from "../api/auth.api";

export const _login = async (
  data: URLSearchParams,
  alert: Alert,
  callback?: (alert: Alert) => void,
  setLoading?: (x: boolean) => void
) => {
  try {
    if (!window.navigator.onLine) {
      throw new Error("Network Error");
    }
    
    console.log('1')
    const res = await Auth.login(data);
    console.log('res', res)

    setLoading && setLoading(false);

    if (res.data) {
      callback &&
        callback({
          ...alert,
          title: "logged in successfully...",
          variant: "success",
          onClose: () => callback && callback(alert),
          active: true,
        });
      return res.data;
    } else {
      callback &&
        callback({
          ...alert,
          title: "Could not log in user",
          variant: "error",
          onClose: () => callback && callback(alert),
          active: true,
        });

      return;
    }
  } catch (error: any) {
    console.log(error)
    setLoading && setLoading(false);

    if (error?.message === "Network Error") {
      callback &&
        callback({
          ...alert,
          title: "You are offline",
          onClose: () => callback && callback(alert),
          variant: "error",
          active: true,
        });
    } else if (error?.response?.data?.message) {
      callback &&
        callback({
          ...alert,
          title: error?.response?.data?.message,
          onClose: () => callback && callback(alert),
          variant: "error",
          active: true,
        });
    } else {
      callback &&
        callback({
          ...alert,
          title: "Something went wrong",
          onClose: () => callback && callback(alert),
          variant: "error",
          active: true,
        });
    }

    return;
  }
};