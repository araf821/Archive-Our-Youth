import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

const RegisterPage = () => {
  return (
    <SignUp
      appearance={{
        baseTheme: dark,
      }}
    />
  );
};
export default RegisterPage;
