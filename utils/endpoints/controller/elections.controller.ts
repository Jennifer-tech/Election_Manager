import { Alert } from "@/components/Alert";
import { Auth } from "../api/auth.api";
import { Elections } from "../api/elections.api";
import { Users } from "../api/users.api";
import { AuthData } from "../types/auth.type";
import { GetElectionsResponse } from "../types/elections.type";

export const _getElections = async (
  alert: Alert,
  callback?: (alert: Alert) => void,
  setLoading?: (x: boolean) => void
): Promise<GetElectionsResponse | void> => {
  try {
    if (!window.navigator.onLine) {
      throw new Error("Network Error");
    }

    const res = await Elections.getElections();
    console.log(res)

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
          title: "Could not create user",
          variant: "error",
          onClose: () => callback && callback(alert),
          active: true,
        });

      return;
    }
  } catch (error: any) {
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