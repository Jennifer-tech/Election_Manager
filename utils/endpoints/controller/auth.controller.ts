import { Alert } from "@/components/Alert";
// import { ContactUs } from "../api/contact-us.api";
// import { ContactUsRequestData, ContactUsResponseData } from "../types/contact-us.type";

export const _contactUs = async (
//   data: ContactUsRequestData,
  alert: Alert,
  callback?: (alert: Alert) => void,
  setLoading?: (x: boolean) => void
) => {
  try {
    if (!window.navigator.onLine) {
      throw new Error("Network Error");
    }

    // const res = await ContactUs.contactUs(data);

    setLoading && setLoading(false);

    // if (res.data) {
    //   callback &&
    //     callback({
    //       ...alert,
    //       title: "Message sent...",
    //       variant: "success",
    //       onClose: () => callback && callback(alert),
    //       active: true,
    //     });
    //   return res.data;
    // } else {
    //   callback &&
    //     callback({
    //       ...alert,
    //       title: "Could not fetch files",
    //       variant: "error",
    //       onClose: () => callback && callback(alert),
    //       active: true,
    //     });

    //   return false;
    // }
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

    return false;
  }
};