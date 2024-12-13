import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignInPage = () => {
  return (
    <SignIn
      appearance={{
        baseTheme: dark,
      }}
    />
  );
};
export default SignInPage;
