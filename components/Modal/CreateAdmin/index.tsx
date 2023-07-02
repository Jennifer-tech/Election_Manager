"use client";
import Alert, { type Alert as AlertType } from "@/components/Alert";
import DropdownWrapper from "@/components/DropdownWrapper";
import { DotLoader } from "@/components/Loaders";
import useGlobalStore from "@/lib/store/global-store";
import { _createAdmin } from "@/utils/endpoints/controller/admin.controller";
import { _getElections } from "@/utils/endpoints/controller/elections.controller";
import { CreateAdminResponse } from "@/utils/endpoints/types/admin.type";
import { GetElectionsResponse } from "@/utils/endpoints/types/elections.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoIosArrowDown, IoMdCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank, MdOutlineClose } from "react-icons/md";
import * as yup from "yup";
import ModalOverlay from "../ModalOverlay";

type Props = {
  isOpen: boolean;
  close: () => void;
};

enum FieldsName {
  EMAIL = "email",
  PASSWORD = "password",
  ELECTION = "election",
}

interface InputFields {
  email: string;
  password: string;
  election: string;
}

const ValidationSchema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .matches(/@[^.]*\./)
      .required("Please enter an email"),
    password: yup.string().required("Please provide a password"),
    election: yup.string().required("Please provide an election"),
  })
  .required();

const CreateAdmin = ({ isOpen, close }: Props) => {
  const electionRef = useRef<HTMLInputElement>();
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [dropdown, setDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuper, setIsSuper] = useState(false);
  const [election, setElection] = useState<Partial<GetElectionsResponse[0]>>(
    {}
  );
  const [elections, setElections] = useState<GetElectionsResponse>([]);
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
    setValue,
    formState: { errors: formErrors },
  } = useForm<InputFields>({
    resolver: yupResolver(ValidationSchema),
  });

  const fetchElections = useCallback(async () => {
    const _elections = await _getElections(alert, setAlert);
    setElections(_elections ?? []);

    setTimeout(() => {
      setAlert({ ...alert, active: false });
    }, 5000);
  }, []);

  useEffect(() => {
    fetchElections();
  }, []);

  const onSubmit: SubmitHandler<InputFields> = async (data: InputFields) => {
    setLoading(true);
    const res: boolean | undefined = await _createAdmin(
      {
        election_id: election.id!,
        is_super: isSuper,
        password: data.password,
        email: data.email,
      },
      alert,
      setAlert,
      setLoading
    );
    
    if (res) {
      close()
    }

    setLoading(false);
    setTimeout(() => {
      setAlert({ ...alert, active: false });
    }, 5000);
  };

  useEffect(() => {
    document.addEventListener("keydown", (e) => e.key === "Escape" && close());

    return () => {
      document.removeEventListener("keydown", (e) => e.key === "Escape");
    };
  }, []);

  return (
    <ModalOverlay isOpen={isOpen} close={close} animate="UP">
      <section className="relative flex flex-col h-fit w-[80%] sm:w-[70%] md:w-[45%] lg:w-[40%] xl:w-[30%] overflow-hidden self-center mx-auto space-y-3 py-5 px-4 rounded-lg bg-white">
        <div className="w-full">
          <div
            onClick={() => close()}
            className="hover:cursor-pointer absolute top-5 right-5"
          >
            <MdOutlineClose className="w-8 h-8 text-blue-950" />
          </div>
          <div className="w-full flex justify-center">
            <h1 className="text-xl font-semibold text-blue-950">
              CREATE ADMIN
            </h1>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-3 bg-white border border-shade-light rounded-md px-6 py-10"
        >
          <section className="relative">
            <div
              className={`overflow-hidden flex h-12 border rounded-md w-full ${
                formErrors[FieldsName.EMAIL]?.message
                  ? "border-red-600"
                  : "border-shade-medium/50"
              }`}
            >
              <Controller
                name={FieldsName.EMAIL}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    autoComplete="on"
                    className="px-3 input-outline-none text-base h-full w-full"
                    type="email"
                    placeholder="Enter email address"
                    id={FieldsName.EMAIL}
                  />
                )}
              />
            </div>
            {formErrors[FieldsName.EMAIL]?.message && (
              <p className="text-xs text-red-600">
                {formErrors[FieldsName.EMAIL]?.message}
              </p>
            )}
          </section>

          <section>
            <div
              className={`relative overflow-hidden flex h-12 border rounded-md w-full ${
                formErrors[FieldsName.PASSWORD]?.message
                  ? "border-red-600"
                  : "border-shade-medium/50"
              }`}
            >
              <Controller
                name={FieldsName.PASSWORD}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="px-3 input-outline-none text-base h-full w-full"
                    type={hiddenPassword ? "password" : "text"}
                    placeholder="Enter password"
                    id={FieldsName.PASSWORD}
                  />
                )}
              />
              <span
                onClick={() => setHiddenPassword(!hiddenPassword)}
                className="absolute top-0 right-0 w-fit flex items-center h-full pr-5"
              >
                {hiddenPassword ? (
                  <AiOutlineEyeInvisible className="w-5 h-5 text-shade-medium" />
                ) : (
                  <AiOutlineEye className="w-5 h-5 text-shade-medium" />
                )}
              </span>
            </div>
            {formErrors[FieldsName.PASSWORD]?.message && (
              <p className="text-xs text-red-600">
                {formErrors[FieldsName.PASSWORD]?.message}
              </p>
            )}
          </section>

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
                render={({ field: { ref, ...rest } }) => (
                  <input
                    {...rest}
                    ref={(e) => {
                      ref(e),
                        (electionRef.current = e as HTMLInputElement),
                        setValue(
                          FieldsName.ELECTION,
                          electionRef.current?.value
                        );
                    }}
                    className="px-3 input-outline-none text-base h-full w-full"
                    type="text"
                    placeholder="- select election -"
                    id={FieldsName.ELECTION}
                  />
                )}
              />
              <span
                onClick={() => setDropdown(!dropdown)}
                className="absolute top-0 bottom-0 right-0 left-0 w-full h-full flex items-center justify-end pr-3 hover:cursor-pointer"
              >
                <IoIosArrowDown
                  className={`w-5 h-5 text-shade-medium ${
                    dropdown ? `rotate-180` : "rotate-0"
                  }`}
                />
              </span>
            </div>
            {dropdown && (
              <DropdownWrapper setDropdown={setDropdown}>
                <span
                  className={`absolute z-10 left-0 p-5 w-full flex flex-col space-y-3 bg-white rounded-md border border-shade-light shadow-xl`}
                >
                  {elections.map((election, i) => (
                    <p
                      key={i}
                      onClick={(e) => {
                        if (
                          electionRef.current &&
                          e.currentTarget.textContent
                        ) {
                          electionRef.current.value =
                            e.currentTarget.textContent;
                        }
                        setDropdown(false), setElection(election);
                      }}
                      className="hover:cursor-pointer hover:bg-primary-1 link text-sm w-full"
                    >
                      {election.title}
                    </p>
                  ))}
                </span>
              </DropdownWrapper>
            )}

            {formErrors[FieldsName.ELECTION]?.message && (
              <p className="text-xs text-red-600">
                {formErrors[FieldsName.ELECTION]?.message}
              </p>
            )}
          </section>

          <section onClick={() => setIsSuper(!isSuper)} className="flex items-center space-x-3">
            <p>is super?</p>
            <span className="w-8 pl-2 flex items-center text-sm font-semibold">
              {!isSuper ? (
                <MdOutlineCheckBoxOutlineBlank className="w-6 h-6 text-shade-medium" />
              ) : (
                <IoMdCheckbox className="w-6 h-6 text-primary-5" />
              )}
            </span>
          </section>

          {!loading ? (
            <button type="submit" className={`button w-full py-2 text-lg`}>
              Sign Up
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

export default CreateAdmin;
