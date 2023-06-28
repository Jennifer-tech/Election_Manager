"use client";

import { HOME_ROUTE } from "@/utils/config/urls";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdHowToVote } from "react-icons/md";
import Home from "./Home";
import Statistics from "./Statistics";
import Vote from "./Vote";
import MobileSlideNav from "./MobileSlideNav";
import useGlobalStore from "@/lib/store/global-store";

const Navbar = () => {
  const [toggleNav, setToggleNav] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const store = useGlobalStore((state) => state.store);

  console.log(store.isAuthenticated);
  useEffect(() => {
    setIsAuthenticated(!!store?.isAuthenticated);
  }, []);

  return (
    <>
      <div className="relative z-30 md:sticky md:top-0 w-full min-h-[4rem] py-3 px-6 md:px-10 flex items-center justify-between bg-white border-b shadow-md dark:border-b-white-900">
        <section className="relative flex items-center">
          <RxHamburgerMenu
            onClick={() => setToggleNav(!toggleNav)}
            className="mr-4 w-5 h-5 sm:hidden"
          />

          <Link
            href={HOME_ROUTE}
            className="relative outline-none flex flex-row items-center"
          >
            <div className="flex flex-row items-center justify-center space-x-0">
              <MdHowToVote className="w-10 h-10 fill-blue-950 md:w-14 md:h-14" />
              <p className="text-base font-medium leading-4 text-blue-950 md:text-lg md:leading-5">
                Election
                <br />
                Manager
              </p>
            </div>
          </Link>
        </section>

        <section className="hidden sm:flex space-x-3 md:space-x-6 lg:space-x-8 text-sm lg:text-base font-medium">
          {store?.isAuthenticated ? (
            <>
              <Home />
              <Vote />
              <Statistics />
            </>
          ) : null}
        </section>
      </div>
      <MobileSlideNav toggle={toggleNav} setToggle={setToggleNav} />
    </>
  );
};

export default Navbar;
