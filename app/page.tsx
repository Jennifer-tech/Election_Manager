"use client";

import { STATISTICS_ROUTE } from "@/utils/config/urls";
import { RiAddLine } from "react-icons/ri";
import ElectionForm from "@/components/Modal/ElectionForm";
import ElectorateData from "@/components/Modal/ElectorateData";
import { BiUpload } from "react-icons/bi";
import { MdRemoveRedEye } from "react-icons/md";
import Link from "next/link";
import { useEffect, useState } from "react";
import useGlobalStore from "@/lib/store/global-store";
import Authentication from "@/components/Authentication";

export default function Home() {
  const [closeElectionForm, setCloseElectionForm] = useState(true);
  const [closeElectorateData, setCloseElectorateData] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const store = useGlobalStore((state) => state.store);

  // console.log(store.isAuthenticated);
  // useEffect(() => {
  //   setIsAuthenticated(!!store?.isAuthenticated);
  // }, []);

  const handleClose = () => {
    setCloseElectionForm(true);
    setCloseElectorateData(true);
  };

  return (
    <>
      {store?.isAuthenticated ? (
        <div className="p-10">
          <h1 className="text-xl md:text-3xl text-blue-950 font-semibold px-10">
            Welcome,... 🤗
          </h1>
          <p className="italic text-blue-950 px-10">
            Never doubt that a small group of thoughtful, concerned citizens can
            change the world.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-medium mx-auto w-[95%]">
            <span onClick={() => setCloseElectionForm(!closeElectionForm)}>
              <div className="flex flex-col items-center justify-center h-52 my-5 md:h-80 border shadow-md hover:shadow-lg rounded-lg hover:cursor-pointer">
                <RiAddLine className="w-20 h-20 fill-blue-950" />
                <p className="text-lg text-blue-950">Create Election Poll</p>
              </div>
            </span>

            <span onClick={() => setCloseElectorateData(!closeElectorateData)}>
              <div className="flex flex-col items-center justify-center h-52 my-5 md:h-80 border shadow-md hover:shadow-lg rounded-lg hover:cursor-pointer">
                <BiUpload className="w-20 h-20 fill-blue-950" />
                <p className="text-lg text-blue-950">Upload Electorate data</p>
              </div>
            </span>

            <Link href={STATISTICS_ROUTE}>
              <div className="flex flex-col items-center justify-center h-52 my-5 md:h-80 border shadow-md hover:shadow-lg rounded-lg hover:cursor-pointer">
                <MdRemoveRedEye className="w-20 h-20 fill-blue-950" />
                <p className="text-lg text-blue-950">View Ongoing Poll</p>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <Authentication />
      )}

      <ElectionForm isClose={closeElectionForm} onClose={handleClose} />
      <ElectorateData isClose={closeElectorateData} onClose={handleClose} />
    </>
  );
}
