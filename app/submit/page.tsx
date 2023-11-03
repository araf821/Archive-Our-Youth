import BackButton from "@/components/BackButton";
import PostCreationForm from "@/components/PostCreationForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submission Portal | Digital Archive",
  description:
    "Submit your work to have displayed inside of an archive viewed by thousands of people!",
};

const SubmitPage = () => {
  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center bg-zinc-900 py-12 text-white">
      <BackButton classNames="w-fit fixed left-5 top-5 md:left-12 md:top-12 xl:left-32" />
      <PostCreationForm />
    </div>
  );
};
export default SubmitPage;
