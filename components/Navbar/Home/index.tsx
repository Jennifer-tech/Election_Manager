"use client";

import { HOME_ROUTE } from "@/utils/config/urls";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useMemo } from "react";

const Home = () => {
  const router = useRouter();
  const path = usePathname();

  const isActivePath = useMemo(() => {
    return path === HOME_ROUTE;
  }, [router]);

  return <Link 
  href={HOME_ROUTE}
  className='text-blue-950'>Home</Link>;
};

export default Home;
