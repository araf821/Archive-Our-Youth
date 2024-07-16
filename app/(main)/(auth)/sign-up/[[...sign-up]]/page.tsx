import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

const RegisterPage = () => {
  return <SignUp />;
};
export default RegisterPage;
