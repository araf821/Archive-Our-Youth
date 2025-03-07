import { Metadata } from "next";
import { ClerkLoaded, SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignInPage = () => {
  return (
    <ClerkLoaded>
      <SignIn
        appearance={{
          baseTheme: dark,
        }}
      />
    </ClerkLoaded>
  );
};
export default SignInPage;
