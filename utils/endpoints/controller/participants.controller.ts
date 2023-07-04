import { Alert } from "@/components/Alert";
import { Participants } from "../api/participants.api";
import {
  AddParticipantsData,
  AddParticipantsResponse,
} from "../types/participants.type";

export const _createParticipant = async (
  data: FormData,
  alert: Alert,
  callback?: (alert: Alert) => void,
  setLoading?: (x: boolean) => void
): Promise<boolean | undefined> => {
  try {
    if (!window.navigator.onLine) {
      throw new Error("Network Error");
    }
    const res = await Participants.create(data);
    setLoading && setLoading(false);

    callback &&
      callback({
        ...alert,
        title: "Participant created successfully...",
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
