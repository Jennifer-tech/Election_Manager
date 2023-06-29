"use client";

import { HOME_ROUTE } from "@/utils/config/urls";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useMemo } from "react";
import useGlobalStore from "../store/global-store";

// export const protectedPath = [];

export const useIsAuth = () => {
  const store = useGlobalStore((state) => state.store);
  const router = useRouter();

  const isAuth = useMemo(() => {
    return !!store?.isAuthenticated;
  }, [store]);

  useLayoutEffect(() => {
    const url = new URL(window.location.href);
    const currentUrlPath = url.pathname;

    if (currentUrlPath !== HOME_ROUTE && !isAuth) {
      router.push(HOME_ROUTE);
    }
  }, [store]);

  return [isAuth];
};
