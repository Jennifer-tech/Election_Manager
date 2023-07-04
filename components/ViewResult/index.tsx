import { type Alert as AlertType } from "@/components/Alert";
import { _createElection } from "@/utils/endpoints/controller/elections.controller";
import { CreateElectionResponse } from "@/utils/endpoints/types/elections.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import ModalOverlay from "../Modal/ModalOverlay";
import { Participants } from "../Participants";
import { _createVote } from "@/utils/endpoints/controller/votes.controller";

type VoteProps = {
  participant: Partial<Participants[0]> | undefined;
  isOpen: boolean;
  close: () => void;
};

const ViewResult = ({ isOpen, close, participant }: VoteProps) => {
  const [loading, setLoading] = useState(false);
  const hiddenButtonRef = useRef<HTMLButtonElement>(null);
  const [alert, setAlert] = useState<AlertType>({
    title: "",
    variant: "warn",
    onClose: () => closeAlert(),
    active: false,
  });

  const closeAlert = () => {
    setAlert({ ...alert, active: false });
  };

  return (
    <ModalOverlay animate="UP" close={close} isOpen={isOpen}>
      <div className="flex flex-col items-center justify-center relative self-center mx-auto bg-white h-fit w-[90%] md:w-[60%] lg:w-[45%] py-10 border shadow-md hover:shadow-lg rounded-lg">
        Okay
      </div>
    </ModalOverlay>
  );
};

export default ViewResult;
