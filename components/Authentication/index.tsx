import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

export enum Auth_Tab {
  LOGIN = "login",
  SIGNUP = "signup",
}

export const AUTH = "auth-section";

const Authentication = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get(AUTH);

  return (
    <div className="p-10">
      {query !== Auth_Tab.SIGNUP ? <Login /> : <SignUp />}
    </div>
  );
};

export default Authentication;
