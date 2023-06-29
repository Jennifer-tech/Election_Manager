import React, { memo } from "react";
import { GrFormClose } from "react-icons/gr";
import { IoIosCheckmarkCircle } from "react-icons/io";

export type Variant = "info" | "warn" | "success" | "error";

export type Alert = {
  title: string;
  variant: Variant;
  onClose?: () => void;
  active: boolean;
};

type Props = {
  alert: Alert;
};

const Alert = memo(function ({
  alert: { title, variant, onClose, active },
}: Props) {
  const borderColor =
    variant === "success"
      ? "border-green-300"
      : variant === "info"
      ? "border-blue-300"
      : variant === "error"
      ? "border-red-300"
      : "border-yellow-300";

  const bgColor =
    variant === "success"
      ? "bg-green-100"
      : variant === "info"
      ? "bg-blue-100"
      : variant === "error"
      ? "bg-red-100"
      : "bg-yellow-100";

  const icon =
    variant === "error" || variant === "warn" ? (
      <IoIosCheckmarkCircle className={`text-red-500 w-8 h-8`} />
    ) : variant === "success" ? (
      <IoIosCheckmarkCircle className={`text-green-500 w-8 h-8`} />
    ) : (
      <IoIosCheckmarkCircle className={`text-blue-500 w-8 h-8`} />
    );

  return (
    <div
      className={`p-1.5 py-3 rounded-lg ${
        active ? "flex" : "hidden"
      } items-center border ${borderColor} ${bgColor} space-x-3 md:space-x-5 w-full`}
    >
      {icon}

      <span className="text-ash-900 font-medium w-[75%]">{title}</span>

      {onClose && (
        <button
          className="justify-self-end flex justify-center items-center"
          onClick={() => onClose()}
        >
          <GrFormClose className="w-6 h-6" />
        </button>
      )}
    </div>
  );
});

export default Alert;