import { FC, Suspense } from "react";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import CommentSection from "@/components/comments/CommentSection";
import EmptyState from "@/components/EmptyState";
import SinglePost from "@/components/post/SinglePost";

interface SinglePostPageParams {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: SinglePostPageParams) {
  const post = await db.post.findFirst({
    where: {
      slug: decodeURIComponent(params.slug),
    },
    select: {
      title: true,
    },
  });

  if (!post) {
    return { title: "Post" };
  }

  return {
    title: post.title,
  };
}

const page: FC<SinglePostPageParams> = async ({ params }) => {
  const post = await db.post.findFirst({
    where: {
      slug: decodeURIComponent(params.slug),
    },
    include: { user: true, comments: { include: { user: true } } },
  });

  const currentUser = await getCurrentUser();

  if (!post) {
    return (
      <EmptyState
        image="/404.svg"
        title="Post Not Found"
        description="The post you're looking for does not exist. It may have been taken down."
        link={{ label: "View All Posts", route: "/home" }}
      />
    );
  }

  return (
    <main className="px-4 pb-12">
      <div className="mx-auto w-full max-w-screen-md">
        <SinglePost currentUser={currentUser} post={post} />
        <Suspense fallback={<CommentSection.Skeleton />}>
          <CommentSection user={currentUser} postId={post.id} />
        </Suspense>
      </div>
    </main>
  );
};

export default page;
