import { SignUp } from "@clerk/nextjs";
import React from "react";

const SignUpPage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <SignUp signInUrl="/sign-in" />
    </div>
  );
};

export default SignUpPage;
