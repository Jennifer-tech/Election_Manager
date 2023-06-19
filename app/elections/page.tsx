import { ELECTION_POSITION } from "@/utils/config/urls";
import Link from "next/link";
import React from "react";

const Elections = () => {
  return (
    <div className="flex flex-col mt-10">
      <Link href={ELECTION_POSITION}>
        <div className="border border-gray-300 mx-5 mb-3 p-5 rounded-lg">
          SEES Election 2023{" "}
        </div>
      </Link>
      <div className="border border-gray-300 mx-5 mb-3 p-5 rounded-lg">
        SEES Election 2022
      </div>
      <div className="border border-gray-300 mx-5 mb-3 p-5 rounded-lg">
        SEES Election 2021
      </div>
      <div className="border border-gray-300 mx-5 mb-3 p-5 rounded-lg">
        SEES Election 2020
      </div>
    </div>
  );
};

export default Elections;
