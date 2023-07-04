import Alert, { type Alert as AlertType } from "@/components/Alert";
import { _createVote } from "@/utils/endpoints/controller/votes.controller";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import ModalOverlay from "../Modal/ModalOverlay";
import { Participants } from "../Participants";

enum FieldsName {
  REG_No = "reg_no",
}

interface InputFields {
  reg_no: string;
}

const ValidationSchema = yup
  .object({
    reg_no: yup.string().required("Please provide your reg no"),
  })
  .required();

type VoteProps = {
  participant: Partial<Participants[0]> | undefined;
  isOpen: boolean;
  close: () => void;
};

const Vote = ({ isOpen, close, participant }: VoteProps) => {
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

  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
  } = useForm<InputFields>({
    resolver: yupResolver(ValidationSchema),
  });

  const onSubmit: SubmitHandler<InputFields> = async (data: InputFields) => {
    setLoading(true);

    const res = await _createVote(
      {
        election_id: participant?.election_id!,
        post_id: participant?.post_id!,
        participant_id: participant?.id!,
        reg_num: Number(data.reg_no),
      },
      alert,
      setAlert,
      setLoading
    );

    console.log(res);

    if (res) {
      close();
    }

    setLoading(false);
    setTimeout(() => {
      setAlert({ ...alert, active: false });
    }, 5000);
  };

  return (
    <ModalOverlay animate="UP" close={close} isOpen={isOpen}>
      <div className="flex flex-col items-center justify-center relative self-center mx-auto bg-white h-fit w-[90%] md:w-[60%] lg:w-[45%] py-10 border shadow-md hover:shadow-lg rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="pb-3">
          <section className="relative">
            <div
              className={`overflow-hidden flex h-12 border rounded-md w-full ${
                formErrors[FieldsName.REG_No]?.message
                  ? "border-red-600"
                  : "border-shade-medium/50"
              }`}
            >
              <Controller
                name={FieldsName.REG_No}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    autoComplete="on"
                    className="px-3 input-outline-none text-base h-full w-full"
                    type="text"
                    placeholder="Enter your reg number"
                    id={FieldsName.REG_No}
                  />
                )}
              />
            </div>
            {formErrors[FieldsName.REG_No]?.message && (
              <p className="text-xs text-red-600">
                {formErrors[FieldsName.REG_No]?.message}
              </p>
            )}
          </section>

          <button ref={hiddenButtonRef} className="hidden"></button>
        </form>

        <div className="w-full text-lg text-blue-950 text-center font-medium">
          <p className="mb-5">Do you wish vote for</p>
        </div>

        <div className="w-full text-xl font-extrabold text-blue-950 mb-5 text-center">
          {participant?.name ?? ""}
        </div>

        <section className="w-full flex flex-row items-center justify-center space-x-2.5">
          <div
            onClick={() => hiddenButtonRef.current?.click()}
            className="button-outline border border-blue-950 rounded-2xl text-blue-950 w-fit px-6 lg:px-8 flex items-center py-2 lg:py-3 space-x-2 cursor-pointer hover:bg-blue-950"
          >
            <p className="text-lg text-blue-950 font-semibold hover:text-white">
              Yes
            </p>
          </div>

          <div
            onClick={() => close()}
            className="button-outline border border-blue-950 rounded-2xl text-blue-950 w-fit px-6 lg:px-8 flex items-center py-2 lg:py-3 space-x-2 cursor-pointer hover:bg-blue-950"
          >
            <p className="text-lg text-blue-950 font-semibold hover:text-white">
              No
            </p>
          </div>
        </section>

        <span className="z-30 fixed top-3 right-3">
          <Alert alert={alert} />
        </span>
      </div>
    </ModalOverlay>
  );
};

export default Vote;
