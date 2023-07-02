import { Alert } from "@/components/Alert";
import { Posts } from "../api/post.api";
import { CreatePostData, CreatePostResponse } from "../types/post.type";

export const _createPost = async (
  data: CreatePostData,
  alert: Alert,
  callback?: (alert: Alert) => void,
  setLoading?: (x: boolean) => void
): Promise<CreatePostResponse | undefined> => {
  try {
    if (!window.navigator.onLine) {
      throw new Error("Network Error");
    }

    const res = await Posts.create(data);

    setLoading && setLoading(false);

    if (res.data) {
      callback &&
        callback({
          ...alert,
          title: "Post created successfully...",
          variant: "success",
          onClose: () => callback && callback(alert),
          active: true,
        });

      return res.data;
    } else {
      callback &&
        callback({
          ...alert,
          title: "Could not create election",
          variant: "error",
          onClose: () => callback && callback(alert),
          active: true,
        });

      return;
    }
  } catch (error: any) {
    console.log(error);
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

export const _deletePost = async (
  data: string | number,
  alert: Alert,
  callback?: (alert: Alert) => void,
  setLoading?: (x: boolean) => void
): Promise<boolean | undefined> => {
  try {
    if (!window.navigator.onLine) {
      throw new Error("Network Error");
    }

    const res = await Posts.delete(data);

    setLoading && setLoading(false);

    callback &&
      callback({
        ...alert,
        title: "Post deleted successfully...",
        variant: "success",
        onClose: () => callback && callback(alert),
        active: true,
      });

    return true;
  } catch (error: any) {
    console.log(error);
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
