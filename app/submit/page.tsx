import PostCreationForm from "@/components/PostCreationForm";
import { Button, buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SubmitPage = () => {
  return (
    <div className="relative grid h-screen place-items-center bg-zinc-900 text-white">
      <Link
        href="/"
        className={buttonVariants({
          className:
            "fixed left-5 top-5 bg-zinc-800 hover:bg-zinc-700 md:left-12 md:top-12 xl:left-32",
        })}
      >
        Back to Home
      </Link>

      <PostCreationForm />
    </div>
  );
};
export default SubmitPage;
