import BackButton from "@/components/BackButton";
import EditPost from "@/components/post/EditPost";
import { cn } from "@/lib/utils";
import { Edit2 } from "lucide-react";
import { Metadata } from "next";
import { FC } from "react";

interface pageProps {}

export const metadata: Metadata = {
  title: "Edit Post",
};

const page: FC<pageProps> = ({}) => {
  return (
    <div className="mx-auto mt-28 max-w-screen-md px-4 text-zinc-50 sm:px-8">
      <BackButton />

      <div
        className={cn(
          "mt-6 flex w-full items-center rounded-lg border border-amber-500 text-amber-500 md:text-lg",
        )}
      >
        <div className="border-r border-amber-500 p-4">
          <Edit2 className="h-5 w-5" />
        </div>
        <p className="ml-4">Editing Post</p>
        <BackButton
          classNames={
            "ml-auto mr-2 bg-transparent hover:bg-transparent w-fit text-rose-100/60 hover:text-rose-500"
          }
          label="Cancel"
        />
      </div>

      <EditPost />
    </div>
  );
};

export default page;
