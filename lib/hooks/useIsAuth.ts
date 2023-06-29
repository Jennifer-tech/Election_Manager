"use client";

import { HOME_ROUTE } from "@/utils/config/urls";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
// import { useReadLocalStorage } from 'usehooks-ts'
import useGlobalStore from "../store/global-store";

// export const protectedPath = ["/account-settings", "/conflict"];

export const useIsAuth = () => {
  const store = useGlobalStore((state) => state.store);
  const router = useRouter();

  const isAuth = useMemo(() => {
    return !!store?.isAuthenticated;
  }, [store]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const currentUrlPath = url.pathname;

    if (currentUrlPath !== HOME_ROUTE && !isAuth) {
      router.push(HOME_ROUTE);
    }
  }, [store]);

  return [isAuth];
};
