"use client"
// import Image from "next/image";
import { HOME_ROUTE } from "@/utils/config/urls";
import { RiAddLine } from "react-icons/ri";
import ElectionForm from "@/components/Modal/ElectionForm";
import ElectorateData from "@/components/Modal/ElectorateData";
import { BiUpload } from "react-icons/bi";
import { MdRemoveRedEye } from "react-icons/md";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [closeElectionForm, setCloseElectionForm] = useState(true)
  const [closeElectorateData, setCloseElectorateData] = useState(true)

  const handleClose = () => {
    setCloseElectionForm(true);
    setCloseElectorateData(true);
  }
  return (
    <>
      <div className="flex items-center py-3 px-5 lg:px-36 md:px-28">
        <h1 className="text-3xl text-blue-950 font-semibold">
          Welcome Chimaobi,
        </h1>
      </div>

      <div className="flex flex-col items-center w-full my-5 sm:flex space-x-3 md:space-x-12 md:flex md:flex-row md:w-full md:justify-center lg:space-x-10 text-shadow-200 text-sm lg:text-base font-medium">
        <span
          onClick={() => setCloseElectionForm(!closeElectionForm)}
        >
          <div className="flex flex-col items-center justify-center relative h-60 w-80 my-5 md:w-80 md:h-80 border shadow-md hover:shadow-lg dark:border-b-white-900 rounded-lg">
            <RiAddLine className="w-20 h-20 fill-blue-950" />
            <p className="text-lg text-blue-950">Create Election Poll</p>
          </div>
        </span>
        <span
          onClick={() => setCloseElectorateData(!closeElectorateData)}
        >
          <div className="flex flex-col items-center justify-center relative h-60 w-80 my-5 md:w-80 md:h-80 border shadow-md hover:shadow-lg dark:border-b-white-900 rounded-lg">
            <BiUpload className="w-20 h-20 fill-blue-950" />
            <p className="text-lg text-blue-950">Upload Electorate data</p>
          </div>
        </span>
        <span
          onClick={() => setCloseElectionForm(!closeElectionForm)}
        >
          <div className="flex flex-col items-center justify-center relative h-60 w-80 my-5 md:w-80 md:h-80 border shadow-md hover:shadow-lg dark:border-b-white-900 rounded-lg">
            <MdRemoveRedEye className="w-20 h-20 fill-blue-950" />
            <p className="text-lg text-blue-950">View Ongoing Poll</p>
          </div>
        </span>
      </div>
      <ElectionForm isClose={closeElectionForm} onClose={handleClose} />
      <ElectorateData isClose={closeElectorateData} onClose={handleClose} />
    </>
  );
}
