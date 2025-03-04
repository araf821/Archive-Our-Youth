import { SignUp, ClerkLoaded } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

const RegisterPage = () => {
  return (
    <ClerkLoaded>
      <SignUp
        appearance={{
          baseTheme: dark,
        }}
      />
    </ClerkLoaded>
  );
};

export default RegisterPage;
