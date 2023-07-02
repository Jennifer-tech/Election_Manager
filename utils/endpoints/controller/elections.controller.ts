import { Alert } from "@/components/Alert";
import { Elections } from "../api/elections.api";
import {
  CreateElectionData,
  CreateElectionResponse,
  ElectionCategoriesResponse,
  GetElectionsResponse,
} from "../types/elections.type";

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

    setLoading && setLoading(false);

    if (res.data) {
      return res.data;
    } else {
      callback &&
        callback({
          ...alert,
          title: "Could not fetch elections",
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

export const _createElection = async (
  data: CreateElectionData,
  alert: Alert,
  callback?: (alert: Alert) => void,
  setLoading?: (x: boolean) => void
): Promise<CreateElectionResponse | undefined> => {
  try {
    if (!window.navigator.onLine) {
      throw new Error("Network Error");
    }

    const res = await Elections.create(data);

    setLoading && setLoading(false);

    if (res.data) {
      callback &&
        callback({
          ...alert,
          title: "Election created successfully...",
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

export const _deleteElection = async (
  data: string | number,
  alert: Alert,
  callback?: (alert: Alert) => void,
  setLoading?: (x: boolean) => void
): Promise<boolean | undefined> => {
  try {
    if (!window.navigator.onLine) {
      throw new Error("Network Error");
    }

    const res = await Elections.deleteElection(data);

    setLoading && setLoading(false);

    callback &&
      callback({
        ...alert,
        title: "Election deleted successfully...",
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

export const _getElectionCategories = async (
  data: string | number,
  alert: Alert,
  callback?: (alert: Alert) => void,
  setLoading?: (x: boolean) => void
): Promise<ElectionCategoriesResponse | undefined> => {
  try {
    if (!window.navigator.onLine) {
      throw new Error("Network Error");
    }

    const res = await Elections.getElectionCategories(data);

    setLoading && setLoading(false);

    if (res.data) {
      return res.data;
    } else {
      callback &&
        callback({
          ...alert,
          title: "Could not fetch categories",
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
