"use client"
import React from "react";
import { DotLoader } from "@/components/Loaders";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

enum FieldsName {
    EMAIL = "email",
  }
  
  interface InputFields {
    email: string;
  }
  
  const ValidationSchema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .matches(/@[^.]*\./)
      .required("Please enter your email"),
  });


const Login = () => {
    const { handleSubmit, resetField, control } = useForm<InputFields>({
        resolver: yupResolver(ValidationSchema),
        mode: "onSubmit",
        defaultValues: {
          [FieldsName.EMAIL]: "",
        },
      });

      const onSubmit: SubmitHandler<InputFields> = (data: InputFields) => {
        setLoading(true);
        _createEmailSub(data, alert, setAlert, setLoading);
      };

  return (
    <div className="flex min-h-[80vh] items-center justify-center w-full text-sm lg:text-base font-medium border border-green-950">
      <div className="flex flex-col items-center relative w-80 h-80 md:w-90 md:h-80 border border-red-950 shadow-md hover:shadow-lg dark:border-b-white-900 rounded-lg">
        <div className="w-full border border-green-600 text-center mt-3">
        {/* <p className="text-lg text-blue-950 text-center">Welcome to <br />SEES voting <br />Application</p> */}
          <div className="text-lg text-blue-950 font-semibold">Welcome to</div>
          <div className="text-2xl text-blue-950 font-bold">SEES Voting</div>
          <div className="text-lg text-blue-950 font-semibold">Application</div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-[85%]">
              <section
                className={`flex md:space-x-2 items-center w-full rounded-l-full rounded-r-full p-2 overflow-hidden bg-ash-200 dark:bg-gray-800 dark:text-gray-200 border}`}
              >
                <div
                  className={`flex flex-1 min-h-14 h-fit overflow-hidden w-full md:w-96 rounded-md dark:bg-gray-700`}
                >
                  <Controller
                    name={FieldsName.EMAIL}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        autoComplete="on"
                        className="input-outline-none bg-ash-200 p-2 placeholder:text-base text-base h-full w-full dark:bg-gray-800 dark:text-gray-200 dark:placeholder:text-gray-400"
                        type="email"
                        placeholder="Enter your email address here"
                        id={FieldsName.EMAIL}
                      />
                    )}
                  />
                </div>

                <button
                  type="submit"
                  className={`button-round-orange hidden md:block ${
                    loading ? "py-4 px-10" : "py-3 px-5"
                  }`}
                >
                  {loading ? <DotLoader /> : <p className="text-sm">Submit</p>}
                </button>
              </section>

              <button
                type="submit"
                className={`button-round-orange flex items-center justify-center mt-4 md:hidden w-full ${
                  loading ? "py-5" : "py-4"
                }`}
              >
                {loading ? <DotLoader /> : <p className="text-sm">Submit</p>}
              </button>
            </form>
    </div>
  );
};

export default Login;
