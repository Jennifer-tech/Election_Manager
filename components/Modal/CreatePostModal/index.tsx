"use client";

import Alert, { type Alert as AlertType } from "@/components/Alert";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import ModalOverlay from "../ModalOverlay";
import { DotLoader } from "@/components/Loaders";
import { MdOutlineClose } from "react-icons/md";
import { _createPost } from "@/utils/endpoints/controller/post.controller";
import { CreatePostResponse } from "@/utils/endpoints/types/post.type";

enum FieldsName {
  POST = "post",
}

interface InputFields {
  post: string;
}

const ValidationSchema = yup
  .object({
    post: yup.string().required("Please provide a post title"),
  })
  .required();

type Props = {
  isOpen: boolean;
  close: () => void;
  election_id: number;
};

const CreatePostModal = ({ close, isOpen, election_id }: Props) => {
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
    const res: CreatePostResponse | undefined = await _createPost(
      {
        election_id,
        post: data.post,
      },
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
          <h1 className="text-xl font-semibold text-blue-950">CREATE POST</h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-3 bg-white border border-shade-light rounded-md px-6 py-10"
        >
          <section className="relative">
            <div
              className={`overflow-hidden flex h-12 border rounded-md w-full ${
                formErrors[FieldsName.POST]?.message
                  ? "border-red-600"
                  : "border-shade-medium/50"
              }`}
            >
              <Controller
                name={FieldsName.POST}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    autoComplete="on"
                    className="px-3 input-outline-none text-base h-full w-full"
                    type="text"
                    placeholder="Presidential"
                    id={FieldsName.POST}
                  />
                )}
              />
            </div>
            {formErrors[FieldsName.POST]?.message && (
              <p className="text-xs text-red-600">
                {formErrors[FieldsName.POST]?.message}
              </p>
            )}
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

export default CreatePostModal;
