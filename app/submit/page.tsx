import BackButton from "@/components/BackButton";
import PostCreationForm from "@/components/post-creation-form/PostCreationForm";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submission Portal | Digital Archive",
  description:
    "Submit your work to have displayed inside of an archive viewed by thousands of people!",
};

const SubmitPage = () => {
  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center bg-zinc-900 py-12 text-white">
      {/* <BackButton classNames="w-fit fixed left-5 top-5 md:left-12 md:top-12 xl:left-32" /> */}
      <Dialog>
        <DialogTrigger className="absolute left-5 top-5 w-32 rounded-md bg-zinc-800  px-3 py-1.5 transition hover:bg-zinc-700 md:left-12 md:top-12 xl:left-32">
          Back
        </DialogTrigger>
        <DialogContent className="max-w-md border-zinc-800 bg-zinc-900 px-4 py-8 text-zinc-200">
          <DialogHeader>
            <DialogTitle>Are you sure you want to go back?</DialogTitle>
            <DialogDescription>
              You will lose any progress you&rsquo;ve made so far.
            </DialogDescription>
          </DialogHeader>
          <hr className="border-zinc-700" />
          <div className="flex items-center justify-between gap-4">
            <DialogTrigger>
              <Button className="text-lg hover:bg-zinc-800">Cancel</Button>
            </DialogTrigger>
            <BackButton label="Go Back" />
          </div>
        </DialogContent>
      </Dialog>

    <PostCreationForm />
    </div>
  );
};
export default SubmitPage;
