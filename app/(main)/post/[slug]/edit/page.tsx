import BackButton from "@/components/BackButton";
import EmptyState from "@/components/EmptyState";
import EditPost from "@/components/post/EditPost";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
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
        image="/404.svg"
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
    <div className="mx-auto max-w-screen-md px-4 pb-16 pt-8 text-zinc-50 sm:px-8">
      <BackButton />

      <div className="mt-8 rounded-md border border-warning/70 bg-warning-light/10 p-1.5 max-md:mt-6 md:p-3">
        <div className="flex flex-col gap-1 rounded-md text-warning-light">
          <div className="flex items-center gap-2">
            <Edit2 className="size-4" />
            <p className="max-md:text-sm">Editing Post</p>
          </div>
          <p className="text-xs text-warning-light/70 opacity-75 sm:text-sm">
            Note that not all fields can be updated.
          </p>
        </div>
      </div>

      <EditPost post={post} />
    </div>
  );
};

export default page;
