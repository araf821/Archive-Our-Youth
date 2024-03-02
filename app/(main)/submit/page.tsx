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
    <div className="flex min-h-[calc(100dvh-80px)] items-center justify-center overflow-x-hidden py-8 text-white md:py-12 lg:pt-16">
      <PostCreationForm />
    </div>
  );
};
export default SubmitPage;
