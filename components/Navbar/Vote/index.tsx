import { ELECTIONS } from "@/utils/config/urls";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";

type Props = {
  callback?: () => void;
};

const Vote = ({ callback }: Props) => {
  const path = usePathname();

  const isActivePath = useMemo(() => {
    return path === ELECTIONS;
  }, [path]);

  return (
    <Link href={ELECTIONS}>
      <p
        onClick={() => callback && callback()}
        className={`text-blue-950 nav-link transition-ease ${
          isActivePath && "underline underline-offset-3"
        }`}
      >
        Vote
      </p>
    </Link>
  );
};

export default Vote;
