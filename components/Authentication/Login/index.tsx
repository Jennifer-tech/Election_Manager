"use client";

import Alert, { type Alert as AlertType } from "@/components/Alert";
import { DotLoader } from "@/components/Loaders";
import useGlobalStore from "@/lib/store/global-store";
import { HOME_ROUTE } from "@/utils/config/urls";
import { _login } from "@/utils/endpoints/controller/auth.controller";
import { AuthResponse } from "@/utils/endpoints/types/auth.type";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import * as yup from "yup";
import { AUTH, Auth_Tab } from "..";

enum FieldsName {
  EMAIL = "email",
  PASSWORD = "password",
}

interface InputFields {
  email: string;
  password: string;
}

const ValidationSchema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .matches(/@[^.]*\./)
      .required("Please enter your email"),
    password: yup.string().required("Please provide your password"),
  })
  .required();

const Login = () => {
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const setStore = useGlobalStore((state) => state.setStore);
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

    const params = new URLSearchParams();
    params.append("username", data.email);
    params.append("password", data.password);

    const res: AuthResponse | undefined = await _login(
      params,
      alert,
      setAlert,
      setLoading
    );

    if (res) {
      setStore({
        store: {
          isAuthenticated: true,
          ...res,
        },
      });
    }

    setLoading(false);
    setTimeout(() => {
      setAlert({ ...alert, active: false });
    }, 5000);
  };

  return (
    <div className="flex flex-col space-y-4">
      <section className="w-fit flex flex-col mt-4 items-center space-y-1 mx-auto">
        <p className="text-2xl font-semibold text-center">
          Welcome to Election Manager!
        </p>
        <p className="text-lg font-medium text-center">Sign in to continue</p>
      </section>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-3 bg-white border border-shade-light rounded-md px-6 py-10"
      >
        <section className="pb-4 border-b border-shade-light text-2xl font-semibold">
          Log In
        </section>

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

        {!loading ? (
          <button type="submit" className={`button w-full py-2 text-lg`}>
            Log in
          </button>
        ) : (
          <button
            className={`button bg-primary-4 flex justify-center w-full py-4`}
          >
            <DotLoader />
          </button>
        )}

        <Link href={`${HOME_ROUTE}?${AUTH}=${Auth_Tab.SIGNUP}`}>
          <span className="link w-fit font-semibold text-primary-6 underline underline-offset-4">
            Sign up
          </span>
        </Link>
      </form>

      <span className="z-30 fixed top-3 right-3">
        <Alert alert={alert} />
      </span>
    </div>
  );
};

export default Login;
