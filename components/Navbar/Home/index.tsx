"use client";

import { HOME_ROUTE } from "@/utils/config/urls";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";

type Props = {
  callback?: () => void;
};

const Home = ({ callback }: Props) => {
  const path = usePathname();

  const isActivePath = useMemo(() => {
    return path === HOME_ROUTE;
  }, [path]);

  return (
    <Link href={HOME_ROUTE}>
      <p onClick={() => callback && callback()}
        className={`text-blue-950 nav-link transition-ease ${
          isActivePath && "underline underline-offset-3"
        }`}
      >
        Home
      </p>
    </Link>
  );
};

export default Home;
