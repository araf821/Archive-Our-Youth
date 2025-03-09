import { Metadata } from "next";

import { initializeUser } from "@/lib/initializeUser";
import { IntroScreen } from "@/components/post-creation-form/IntroScreen";
import PostCreationForm from "@/components/post-creation-form/PostCreationForm";

export const metadata: Metadata = {
  title: "Submit",
  description:
    "Submit your work to have displayed inside of an archive viewed by thousands of people!",
};

const SubmitPage = async () => {
  await initializeUser();

  return (
    <div className="mx-auto my-12 flex max-w-3xl flex-col space-y-8 px-4 md:my-20">
      <IntroScreen />
      <PostCreationForm />
    </div>
  );
};
export default SubmitPage;
