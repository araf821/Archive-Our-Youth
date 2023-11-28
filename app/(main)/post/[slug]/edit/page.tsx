import BackButton from "@/components/BackButton";
import EmptyState from "@/components/EmptyState";
import EditPost from "@/components/post/EditPost";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { cn } from "@/lib/utils";
import { Edit2 } from "lucide-react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { FC } from "react";

interface pageProps {
  params: {
    slug: string;
  };
}

export const metadata: Metadata = {
  title: "Edit Post",
};

const page: FC<pageProps> = async ({ params }) => {
  const { slug } = params;
  const currentUser = await getCurrentUser();

  const post = await db.post.findUnique({
    where: {
      slug,
    },
  });

  if (!post) {
    return (
      <EmptyState
        title="Post Not Found"
        description="This post may have been taken down."
        link={{ label: "Back Home", route: "/home" }}
      />
    );
  }

  if (!currentUser || post?.userId !== currentUser?.id) {
    redirect("/");
  }

  return (
    <div className="mx-auto pb-16 mt-28 max-w-screen-md px-4 text-zinc-50 sm:px-8">
      <BackButton />

      <div
        className={cn(
          "mt-8 flex w-full items-center rounded-lg border border-amber-500 min-h-[70px] h-full text-amber-500 md:text-lg",
        )}
      >
        <div className="px-4">
          <Edit2 className="h-4 w-4 md:h-5 md:w-5" />
        </div>
        <div className="h-full min-h-[70px] w-[1px] bg-amber-500"/>
        <div className="ml-4 flex flex-col">
          <p className="max-md:text-sm">Editing Post</p>
          <p className="text-xs opacity-75 sm:text-sm">
            Note that not all fields can be updated.
          </p>
        </div>
        <BackButton
          classNames={
            "ml-auto mr-2 bg-transparent pl-2 max-md:text-sm hover:bg-transparent w-fit text-rose-100/60 hover:text-rose-500"
          }
          label="Cancel"
        />
      </div>

      <EditPost post={post} />
    </div>
  );
};

export default page;
