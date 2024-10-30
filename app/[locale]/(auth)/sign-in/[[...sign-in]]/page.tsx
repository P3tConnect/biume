import { SignIn } from "@clerk/nextjs";
import React from "react";

const SignInPage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <SignIn />
    </div>
  );
};

export default SignInPage;
