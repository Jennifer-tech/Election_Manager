"use client";
import React, { useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
import { RiAddLine } from "react-icons/ri";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
// interface IFormInput {
//   electionName: string
//   year: number
//   addCategories: string
// }

const ElectorateData = ({ isOpen, onClose }: Props) => {
  useEffect(() => {
    document.addEventListener(
      "keydown",
      (e) => e.key === "Escape" && onClose()
    );

    return () => {
      document.removeEventListener("keydown", (e) => e.key === "Escape");
    };
  }, []);
  return (
    <div className="flex flex-col">
      {/* <div className="flex justify-center mt-6">
        <h1 className="text-xl font-semibold text-blue-950">ELECTION FORM</h1>
      </div> */}
      <div
        className={`z-50 flex ${
          isOpen ? " md:flex -translate-y-full" : "md:flex"
        } justify-center items-center overflow-auto fixed top-0 bottom-0 transition-ease bg-black/60 w-full`}
      >
        <section className="relative flex flex-col h-fit w-[80%] sm:w-[70%] md:w-[45%] lg:w-[40%] xl:w-[30%] overflow-hidden space-y-3 py-5 px-4 rounded-lg bg-white">
          <div className="w-full">
            <div
              onClick={() => onClose()}
              className="hover:cursor-pointer absolute top-5 right-5"
            >
              <MdOutlineClose className="w-8 h-8 text-blue-950" />
            </div>
            <div className="w-full flex justify-center">
              <h1 className="text-xl font-semibold text-blue-950">
                ELECTION FORM
              </h1>
            </div>
          </div>

          <div className="w-full flex flex-col space-y-5 items-center py-7 text-blue-950 ">
            <form className="w-full flex flex-col text-left space-y-4">

              <label htmlFor="chooseElection" className="text-gray-400 focus-within:text-gray-600">
                  {/* <select>
                      <option value="presidential">Presidential</option>
                      <option value="secretary">Secretary</option>
                      <option value="treasurer">Treasurer</option>
                  </select> */}
              {/* <input
                className="w-full border border-gray-300 rounded-lg outline-none p-2"
                name="chooseElection"
                id="chooseElection"
                placeholder="Choose election"
              /> */}
              </label>

              <label htmlFor="year" className="text-gray-400 focus-within:text-gray-600">
              <input
                className="w-full border border-gray-300 rounded-lg outline-none p-2"
                name="year"
                id="year"
                placeholder="Input data eg Reg No"
              />
              </label>

              <label htmlFor="addCategories" className="relative flex-row text-gray-400 focus-within:text-gray-600 block items-center justify-center">
              <RiAddLine className="flex w-6 h-6 fill-gray-400 absolute top-2 left-2" />
              <input
                className="w-full border border-gray-300 rounded-lg outline-none p-2 pl-8 space-y-4 block"
                name="addCategories"
                id="addCategories"
                placeholder="Add Categories"
              />
              </label>

            </form>
              {/* <div className="w-full flex justify-center">
                <input className="border border-blue-950 rounded-lg px-4 py-2 hover:text-white hover:bg-blue-950 cursor-pointer" type="submit" placeholder="Create"/>
              </div> */}
            {/* <p className="font-semibold text-xl pb-2">Congratulations!</p>
            <p className="text-center text-ash-900 dark:text-ash-300 pb-2">
              You have been added to the waitlist successfully.
            </p> */}

            <button
              onClick={() => onClose()}
              type="submit"
              className={`button-round-blue-950 border border-blue-950 rounded-xl w-[90%] py-3 px-5 hover:text-white hover:bg-blue-950`}
            >
              Create
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ElectorateData;
