import BackButton from "@/components/BackButton";
import PostCreationForm from "@/components/PostCreationForm";
import { getCurrentUser } from "@/lib/getCurrentUser";

export const metadata = {
  title: "Submission Portal | Digital Collage",
  description:
    "Submit your work to have displayed inside of a collage viewed by millions of people!",
};

const SubmitPage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="relative grid h-[100dvh] place-items-center bg-zinc-900 text-white">
      <BackButton classNames="w-fit fixed left-5 top-5 md:left-12 md:top-12 xl:left-32" />
      <PostCreationForm currentUser={currentUser} />
    </div>
  );
};
export default SubmitPage;
