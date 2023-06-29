"use client";

import { type Alert as AlertType } from "@/components/Alert";
import { DotLoader } from "@/components/Loaders";
import axiosInstance from "@/utils/config/axios";
import { _createElection } from "@/utils/endpoints/controller/elections.controller";
import { CreateElectionResponse } from "@/utils/endpoints/types/elections.type";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import * as yup from "yup";

enum FieldsName {
  ELECTION = "election",
}

interface InputFields {
  election: string;
}

const ValidationSchema = yup
  .object({
    election: yup.string().required("Please provide an election title"),
  })
  .required();

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ElectionForm = ({ isOpen, onClose }: Props) => {
  const [loading, setLoading] = useState(false);
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
    const res: CreateElectionResponse | undefined = await _createElection(
      {
        title: data.election,
      },
      alert,
      setAlert,
      setLoading
    );

    console.log(res);

    if (res) {
      onClose();
    }

    setLoading(false);
    setTimeout(() => {
      setAlert({ ...alert, active: false });
    }, 5000);
  };

  useEffect(() => {
    document.addEventListener(
      "keydown",
      (e) => e.key === "Escape" && onClose()
    );

    return () => {
      document.removeEventListener("keydown", (e) => e.key === "Escape");
    };
  }, []);

  return (
    <div
      className={`z-50 flex ${
        isOpen ? "md:flex -translate-y-full" : "md:flex"
      } justify-center items-center overflow-auto fixed top-0 bottom-0 transition-ease bg-black/60 w-full`}
    >
      <section className="relative flex flex-col h-fit w-[80%] sm:w-[70%] md:w-[45%] lg:w-[40%] xl:w-[30%] overflow-hidden space-y-3 py-5 px-4 rounded-lg bg-white">
        <div
          onClick={() => onClose()}
          className="hover:cursor-pointer absolute top-5 right-5"
        >
          <MdOutlineClose className="w-8 h-8 text-blue-950" />
        </div>
        <div className="w-full flex justify-center">
          <h1 className="text-xl font-semibold text-blue-950">ELECTION FORM</h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-3 bg-white border border-shade-light rounded-md px-6 py-10"
        >
          <section className="relative">
            <div
              className={`overflow-hidden flex h-12 border rounded-md w-full ${
                formErrors[FieldsName.ELECTION]?.message
                  ? "border-red-600"
                  : "border-shade-medium/50"
              }`}
            >
              <Controller
                name={FieldsName.ELECTION}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    autoComplete="on"
                    className="px-3 input-outline-none text-base h-full w-full"
                    type="text"
                    placeholder="SEES Election 2023"
                    id={FieldsName.ELECTION}
                  />
                )}
              />
            </div>
            {formErrors[FieldsName.ELECTION]?.message && (
              <p className="text-xs text-red-600">
                {formErrors[FieldsName.ELECTION]?.message}
              </p>
            )}
          </section>

          {/* <button
            onClick={() => onClose()}
            type="submit"
            className={`button-round-blue-950 border border-blue-950 rounded-xl w-[90%] py-3 px-5 hover:text-white hover:bg-blue-950`}
          >
            Create
          </button> */}

          {!loading ? (
            <button type="submit" className={`button w-full py-2 text-lg`}>
              Create
            </button>
          ) : (
            <button
              className={`button bg-primary-4 flex justify-center w-full py-4`}
            >
              <DotLoader />
            </button>
          )}
        </form>
      </section>
    </div>
  );
};

export default ElectionForm;
