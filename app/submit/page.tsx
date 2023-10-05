import PostCreationForm from "@/components/PostCreationForm";
import { buttonVariants } from "@/components/ui/Button";
import { getCurrentUser } from "@/lib/getCurrentUser";
import Link from "next/link";

export const metadata = {
  title: "Submission Portal | Digital Collage",
  description:
    "Submit your work to have displayed inside of a collage viewed by millions of people!",
};

const SubmitPage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="relative grid h-screen place-items-center bg-zinc-900 text-white">
      <Link
        href="/collage"
        className={buttonVariants({
          className:
            "fixed left-5 top-5 bg-zinc-800 hover:bg-zinc-700 md:left-12 md:top-12 xl:left-32",
        })}
      >
        Back
      </Link>

      <PostCreationForm currentUser={currentUser} />
    </div>
  );
};
export default SubmitPage;
