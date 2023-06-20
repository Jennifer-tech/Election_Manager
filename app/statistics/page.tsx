import React from "react";
import { ONGOING_ELECTION } from "@/utils/config/urls";
import Link from "next/link";

const Statistics = () => {
  return (
    <div className="flex flex-col mt-10">
      <Link href={ONGOING_ELECTION}>
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

export default Statistics;
