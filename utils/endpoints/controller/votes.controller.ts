import { Alert } from "@/components/Alert";
import { CreateVotesData } from "../types/votes.type";
import { Votes } from "../api/votes.api";

export const _createVote = async (
  data: CreateVotesData,
  alert: Alert,
  callback?: (alert: Alert) => void,
  setLoading?: (x: boolean) => void
): Promise<boolean | undefined> => {
  try {
    if (!window.navigator.onLine) {
      throw new Error("Network Error");
    }

    const res = await Votes.create(data);

    setLoading && setLoading(false);

    callback &&
      callback({
        ...alert,
        title: "Voted successfully...",
        variant: "success",
        onClose: () => callback && callback(alert),
        active: true,
      });

    return true;
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
