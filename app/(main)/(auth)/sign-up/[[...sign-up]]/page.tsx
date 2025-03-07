import { Metadata } from "next";
import { ClerkLoaded, SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

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
