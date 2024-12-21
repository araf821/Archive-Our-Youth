import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

const RegisterPage = () => {
  return (
    <>
      <ClerkLoading />
      <ClerkLoaded>
        <SignUp
          appearance={{
            baseTheme: dark,
          }}
        />
      </ClerkLoaded>
    </>
  );
};
export default RegisterPage;
