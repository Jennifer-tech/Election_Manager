"use client";
import { HOME_ROUTE } from "@/utils/config/urls";
import Link from "next/link";
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdHowToVote } from "react-icons/md";
import Home from "./Home";
import Statistics from "./Statistics";
import Vote from "./Vote";
import MobileSlideNav from "./MobileSlideNav";

const Navbar = () => {
  const [toggleNav, setToggleNav] = useState(false);
  return (
    <>
      <div className="z-30 md:sticky md:top-0 w-full min-h-[4rem] dark:bg-white py-3 px-6 md:px-10 flex items-center justify-between bg-white border-b shadow-md dark:border-b-white-900">
        <section className="relative flex items-center">
          <RxHamburgerMenu
            onClick={() => setToggleNav(!toggleNav)}
            className="mr-4 w-5 h-5 sm:hidden"
          />

          <Link
            href={HOME_ROUTE}
            className="relative w-7 lg:w-10 h-7 lg:h-10 outline-none flex flex-row"
          >
            <div className="flex flex-row items-center space-x-0">
              <MdHowToVote className="w-20 h-20 fill-blue-950" />
              <p className="text-lg font-medium flex flex-col leading-5 text-blue-950 md:text-xl md:leading-5">
                Election Manager
              </p>
            </div>
          </Link>
        </section>

        <section className="hidden sm:flex space-x-3 md:space-x-6 lg:space-x-8 text-shadow-200 text-sm lg:text-base font-medium">
          <Home />
          <Vote />
          <Statistics />
        </section>
      </div>
      <MobileSlideNav toggle={toggleNav} setToggle={setToggleNav} />
    </>
  );
};

export default Navbar;
