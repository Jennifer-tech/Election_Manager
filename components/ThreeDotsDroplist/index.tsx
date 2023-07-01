"use client";

import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import DropdownWrapper from "../DropdownWrapper";

type Props = {
  itemId: string | number;
  actionButtons: {
    id: string | number;
    title: JSX.Element | string;
    callback: (id: string | number) => void;
  }[];
  style?: string;
};

const ThreeDotsDroplist = ({ itemId, actionButtons, style = "" }: Props) => {
  const [toggleModal, setToggleModal] = useState(false);

  return (
    <div className="z-10 relative w-fit text-shade-dark">
      <BsThreeDots
        onClick={() => setToggleModal(!toggleModal)}
        className="w-5 h-5 mx-auto text-shade-medium hover:cursor-pointer"
      />
      {toggleModal && (
        <DropdownWrapper setDropdown={setToggleModal}>
          <div
            className={`z-10 absolute top-5 right-5 transition-ease bg-white rounded-md border border-shade-light p-1.5 ${
              style ? style : "w-44"
            } flex flex-col space-y-2 text-sm`}
          >
            {actionButtons.map((actionButton, i) => (
              <span
                key={i}
                onClick={() => {
                  actionButton.callback(itemId);
                  setToggleModal(false);
                }}
                className="flex items-center space-x-2 px-3 transition-ease hover:cursor-pointer hover:bg-primary-1/50"
              >
                <p className="w-[87%]">{actionButton.title}</p>
              </span>
            ))}
          </div>
        </DropdownWrapper>
      )}
    </div>
  );
};

export default ThreeDotsDroplist;
