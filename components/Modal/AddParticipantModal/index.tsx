"use client";

import Alert, { type Alert as AlertType } from "@/components/Alert";
import { DotLoader } from "@/components/Loaders";
import { _createParticipant } from "@/utils/endpoints/controller/participants.controller";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import { useFilePicker } from "use-file-picker";
import * as yup from "yup";
import ModalOverlay from "../ModalOverlay";

enum FieldsName {
  NAME = "name",
}

interface InputFields {
  name: string;
}

const ValidationSchema = yup
  .object({
    name: yup.string().required("Please provide a participant data"),
  })
  .required();

type Props = {
  isOpen: boolean;
  close: () => void;
  election_id: number;
  post_id: number;
};

const AddParticipantModal = ({
  close,
  isOpen,
  election_id,
  post_id,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertType>({
    title: "",
    variant: "warn",
    onClose: () => closeAlert(),
    active: false,
  });

  const [
    openFileSelector,
    { filesContent, loading: fileLoading, errors, clear, plainFiles },
  ] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: true,
    limitFilesConfig: { min: 1 },
    maxFileSize: 3, // in megabytes
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
    if (filesContent.length === 0) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("post_id", post_id.toString());
    formData.append("election_id", election_id.toString());
    formData.append("file", plainFiles[0]);

    const res: boolean | undefined =
      await _createParticipant(
        formData,
        alert,
        setAlert,
        setLoading
      );

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
      <section className="relative flex flex-col h-fit w-[80%] sm:w-[70%] md:w-[45%] lg:w-[40%] xl:w-[30%] overflow-hidden self-center mx-auto space-y-3 py-5 px-4 rounded-lg bg-white">
        <div
          onClick={() => close()}
          className="hover:cursor-pointer absolute top-5 right-5"
        >
          <MdOutlineClose className="w-8 h-8 text-blue-950" />
        </div>
        <div className="w-full flex justify-center">
          <h1 className="text-xl font-semibold text-blue-950">
            ADD PARTICIPANT
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-3 bg-white border border-shade-light rounded-md px-6 py-10"
        >
          <section className="relative">
            <div
              className={`overflow-hidden flex h-12 border rounded-md w-full ${
                formErrors[FieldsName.NAME]?.message
                  ? "border-red-600"
                  : "border-shade-medium/50"
              }`}
            >
              <Controller
                name={FieldsName.NAME}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    autoComplete="on"
                    className="px-3 input-outline-none text-base h-full w-full"
                    type="text"
                    placeholder="John Doe"
                    id={FieldsName.NAME}
                  />
                )}
              />
            </div>
            {formErrors[FieldsName.NAME]?.message && (
              <p className="text-xs text-red-600">
                {formErrors[FieldsName.NAME]?.message}
              </p>
            )}
          </section>

          <section className="relative flex space-x-3 items-center pb-5">
            <button
              onClick={() => openFileSelector()}
              className="button py-1 px-4 text-sm"
            >
              Select files{" "}
            </button>
            <p className="text-sm text-gray-700 max-w-[55%] truncate">
              {filesContent.length !== 0
                ? filesContent[0].name
                : "no file selected"}
            </p>
            <MdOutlineClose
              onClick={() => clear()}
              className="w-5 h-5 text-blue-950 hover:cursor-pointer"
            />
          </section>

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

        <span className="z-30 fixed top-3 right-3">
          <Alert alert={alert} />
        </span>
      </section>
    </ModalOverlay>
  );
};

export default AddParticipantModal;
