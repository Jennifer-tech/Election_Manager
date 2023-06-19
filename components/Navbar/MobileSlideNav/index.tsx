// import { useRouter } from 'next/router';
import Home from '@/app/page';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { MdOutlineClose } from 'react-icons/md';
import Statistics from '../Statistics';
import Vote from '../Vote';

type Props = {
  toggle: boolean;
  setToggle: (x: boolean) => void;
}
const MobileSlideNav = ({ toggle, setToggle}: Props) => {
  const router = useRouter();


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
      className={`z-30 sm:hidden flex flex-col p-7 text-shadow-300 justify-between fixed transition-ease bg-white top-0 bottom-0 left-0 ${
        toggle ? "right-0" : "-translate-x-full"
      }`}
    >
      
      <div className="w-full flex flex-col space-y-10">
        <MdOutlineClose onClick={() => setToggle(false)} className="w-10 h-10" />

        <div className=" flex flex-col space-y-3">
          <Home />
          <Statistics />
          <Vote />
        </div>
      </div>
    </div>
  )
}

export default MobileSlideNav