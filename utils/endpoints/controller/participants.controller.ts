import { Alert } from "@/components/Alert";
import { Participants } from "../api/participants.api";
import { CreateParticipantsResponse } from "../types/participants.type";

export const _createParticipant = async (
  data: FormData,
  alert: Alert,
  callback?: (alert: Alert) => void,
  setLoading?: (x: boolean) => void
): Promise<CreateParticipantsResponse | undefined> => {
  try {
    if (!window.navigator.onLine) {
      throw new Error("Network Error");
    }
    const res = await Participants.create(data);
    setLoading && setLoading(false);

    if (res.data) {
      callback &&
        callback({
          ...alert,
          title: "Participant created successfully...",
          variant: "success",
          onClose: () => callback && callback(alert),
          active: true,
        });

      return res.data;
    } else {
      callback &&
        callback({
          ...alert,
          title: "Could not create participant",
          variant: "error",
          onClose: () => callback && callback(alert),
          active: true,
        });

      return;
    }
  } catch (error: any) {
    console.log("error", error);
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
