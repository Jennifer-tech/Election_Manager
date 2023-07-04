"use client";

import Authentication from "@/components/Authentication";
import CreateAdmin from "@/components/Modal/CreateAdmin";
import ElectionForm from "@/components/Modal/ElectionForm";
import useGlobalStore from "@/lib/store/global-store";
import { STATISTICS_ROUTE } from "@/utils/config/urls";
import Link from "next/link";
import { useState } from "react";
import { MdRemoveRedEye } from "react-icons/md";
import { RiAddLine } from "react-icons/ri";

export default function Home() {
  const [closeElectionForm, setCloseElectionForm] = useState(false);
  const [adminModal, setAdminModal] = useState(false);
  const store = useGlobalStore((state) => state.store);

  const handleClose = () => {
    setCloseElectionForm(false);
    setAdminModal(false);
  };

  return (
    <>
      {store?.isAuthenticated ? (
        <div className="p-10">
          <h1 className="text-xl md:text-3xl text-blue-950 font-semibold px-10 text-center md:text-start">
            Welcome,... 🤗
          </h1>
          <p className="italic text-blue-950 px-10 text-center md:text-start">
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

            <span onClick={() => setAdminModal(!adminModal)}>
              <div className="flex flex-col items-center justify-center h-52 my-5 md:h-80 border shadow-md hover:shadow-lg rounded-lg hover:cursor-pointer">
                <RiAddLine className="w-20 h-20 fill-blue-950" />
                <p className="text-lg text-blue-950">Create Admin</p>
              </div>
            </span>

            {/* <Link href={STATISTICS_ROUTE}>
              <div className="flex flex-col items-center justify-center h-52 my-5 md:h-80 border shadow-md hover:shadow-lg rounded-lg hover:cursor-pointer">
                <MdRemoveRedEye className="w-20 h-20 fill-blue-950" />
                <p className="text-lg text-blue-950">View Ongoing Poll</p>
              </div>
            </Link> */}
          </div>
        </div>
      ) : (
        <Authentication />
      )}

      <ElectionForm isOpen={closeElectionForm} close={handleClose} />
      <CreateAdmin  isOpen={adminModal} close={handleClose} />
    </>
  );
}
