import { SignIn, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignInPage = () => {
  return (
    <>
      <ClerkLoading />
      <ClerkLoaded>
        <SignIn
          appearance={{
            baseTheme: dark,
          }}
        />
      </ClerkLoaded>
    </>
  );
};
export default SignInPage;
