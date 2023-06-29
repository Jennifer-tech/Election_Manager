import { STATISTICS_ROUTE } from "@/utils/config/urls";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";

const Statistics = () => {
  const path = usePathname();

  const isActivePath = useMemo(() => {
    return path === STATISTICS_ROUTE;
  }, [path]);

  return (
    <Link href={STATISTICS_ROUTE}>
      <p
        className={`text-blue-950 nav-link transition-ease ${
          isActivePath && "underline underline-offset-3"
        }`}
      >
        Statistics
      </p>
    </Link>
  );
};

export default Statistics;
