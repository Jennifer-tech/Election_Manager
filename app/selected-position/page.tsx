import React from "react";
import { SELECTED_CANDIDATE } from "@/utils/config/urls";
import Image from "next/image";
import Link from "next/link";

const SelectedPosition = () => {
  const list = new Array(10).fill(0);
  //   console.log(list)
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-center m-6">
        <h1 className="text-xl font-semibold text-blue-950">
          Presidential Candidates
        </h1>
      </div>
      <Link href={SELECTED_CANDIDATE}>
        <div className="w-full grid gap-5 grid-cols-1 px-3 place-items-center cursor-pointer md:grid-cols-3 sm:grid-cols-2">
          {list.map((data, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center h-fit p-5 min-w-40 w-full border shadow-md hover:shadow-lg dark:border-b-white-900 rounded-lg"
            >
              <span className="relative w-28 h-28">
                <Image
                  src="/assets/images/avatar.jpg"
                  alt="Avatar"
                  style={{
                    objectFit: "contain",
                    objectPosition: "center",
                  }}
                  fill
                />
              </span>
              <p className="text-lg font-medium">Name</p>
              <p className="text-lg font-normal">Level</p>
            </div>
          ))}
        </div>
      </Link>
    </div>
  );
};

export default SelectedPosition;
