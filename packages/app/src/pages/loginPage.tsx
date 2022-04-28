import { Sign } from "crypto";
import React, { FC } from "react";
import { SignIn } from "../components/SignIn";
import dynamic from "next/dynamic";


export const RegisterPage = () => {
  return (
    <div>
      <SignIn />
    </div>
  );
};

export default RegisterPage;
