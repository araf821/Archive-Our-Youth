import PostCreationForm from "@/components/post-creation-form/PostCreationForm";
import { initializeUser } from "@/lib/initializeUser";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit",
  description:
    "Submit your work to have displayed inside of an archive viewed by thousands of people!",
};

const SubmitPage = async () => {
  await initializeUser();

  return <PostCreationForm />;
};
export default SubmitPage;
