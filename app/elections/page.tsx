"use client";

import { ELECTION_POSITION } from "@/utils/config/urls";
import { _getElections } from "@/utils/endpoints/controller/elections.controller";
import { GetElectionsResponse } from "@/utils/endpoints/types/elections.type";
// import { Metadata } from "next";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Alert, { type Alert as AlertType } from "@/components/Alert";

// export const metaData: Metadata = {
//   title: "ELECTIONS - ELECTION MANAGER",
// };

const Elections = () => {
  const [toggle, setToggle] = useState(false);
  const [elections, setElections] = useState<GetElectionsResponse>([]);
  const [alert, setAlert] = useState<AlertType>({
    title: "",
    variant: "warn",
    onClose: () => closeAlert(),
    active: false,
  });

  const closeAlert = () => {
    setAlert({ ...alert, active: false });
  };

  const fetchElections = useCallback(async () => {
    const elections = await _getElections(alert, setAlert);
    setElections(elections ?? []);

    setTimeout(() => {
      setAlert({ ...alert, active: false });
    }, 5000);
  }, []);
  console.log("elections", elections);

  useEffect(() => {
    fetchElections();
  }, []);

  return (
    <div className="flex flex-col mt-10">
      {elections.map((election, i) => (
        <span
          key={i}
          className="border border-gray-300 mx-auto w-[95%] mb-3 p-5 rounded-lg hover:shadow-lg cursor-pointer"
        >
          <div className="hover:link w-full">
            <Link href={ELECTION_POSITION}>{election.title}</Link>
          </div>

          <BsThreeDots onClick={() => setToggle(!toggle)} />
        </span>
      ))}

      <span className="border border-gray-300 mx-auto w-[95%] mb-3 p-5 rounded-lg hover:shadow-lg cursor-pointer flex items-center justify-between">
        <Link href={ELECTION_POSITION}>
          <div className="w-[80%] truncate border">SEES Election</div>
        </Link>

        <span className="p-1 hover:bg-slate-300 rounded-md">
          <BsThreeDots />
        </span>
      </span>

      <span className="z-30 fixed top-3 right-3">
        <Alert alert={alert} />
      </span>
    </div>
  );
};

export default Elections;
