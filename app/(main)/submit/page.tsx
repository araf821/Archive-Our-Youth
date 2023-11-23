import PostCreationForm from "@/components/post-creation-form/PostCreationForm";
import { initializeUser } from "@/lib/initializeUser";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submission Portal | Archive Our Youth",
  description:
    "Submit your work to have displayed inside of an archive viewed by thousands of people!",
};

const SubmitPage = async () => {
  await initializeUser();

  return (
    <div className="grid min-h-[100dvh] pt-24 place-items-center text-white">
      <PostCreationForm />
    </div>
  );
};
export default SubmitPage;
