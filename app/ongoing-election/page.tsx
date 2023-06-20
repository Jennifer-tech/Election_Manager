import { SELECTED_POSITION } from "@/utils/config/urls";
import Link from "next/link";
import React from "react";

const ElectionPosition = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center mt-6">
        <h1 className="text-xl font-semibold text-blue-950">
          SEES ELECTION 2023 (ONGOING)
        </h1>
      </div>
      <div className="flex flex-col mt-10">
        <Link href={SELECTED_POSITION}>
          <div className="border border-gray-300 hover:shadow-lg mx-5 mb-3 p-5 rounded-lg cursor-pointer">
            Presidential
          </div>
        </Link>
        <div className="border border-gray-300 mx-5 mb-3 p-5 rounded-lg hover:shadow-lg cursor-pointer">
          Secretary
        </div>
        <div className="border border-gray-300 mx-5 mb-3 p-5 rounded-lg hover:shadow-lg cursor-pointer">
          Treasurer
        </div>
        <div className="border border-gray-300 mx-5 mb-3 p-5 rounded-lg hover:shadow-lg cursor-pointer">
          Financial Secretary
        </div>
      </div>
    </div>
  );
};

export default ElectionPosition;
