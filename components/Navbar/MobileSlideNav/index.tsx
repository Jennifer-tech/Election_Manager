// import { useRouter } from 'next/router';
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
import Home from "../Home";
import Statistics from "../Statistics";
import Vote from "../Vote";

type Props = {
  toggle: boolean;
  setToggle: (x: boolean) => void;
};

const MobileSlideNav = ({ toggle, setToggle }: Props) => {
  const path = usePathname();

  useEffect(() => {
    document.addEventListener(
      "keydown",
      (e) => e.key === "Escape" && setToggle(false)
    );

    return () => {
      document.removeEventListener("keydown", (e) => e.key === "Escape");
    };
  }, []);

  return (
    <div
      className={`z-30 bg-white flex flex-col p-7 text-shadow-300 justify-between fixed transition-ease top-0 bottom-0 left-0 ${
        toggle ? "right-0" : "-translate-x-full"
      }`}
    >
      <div className="z-20 w-full flex flex-col space-y-10">
        <MdOutlineClose
          onClick={() => setToggle(false)}
          className="w-10 h-10 fill-blue-950"
        />

        <div className=" flex flex-col space-y-3 text-lg font-medium">
          <Home callback={() => setToggle(false)} />
          <Vote callback={() => setToggle(false)} />
          <Statistics callback={() => setToggle(false)} />
        </div>
      </div>
    </div>
  );
};

export default MobileSlideNav;
