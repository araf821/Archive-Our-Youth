import EmptyState from "@/components/EmptyState";
import PageTransitionContainer from "@/components/PageTransitionContainer";
import SinglePost from "@/components/post/SinglePost";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { notFound } from "next/navigation";
import { FC } from "react";

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
    return { title: "View Post | Archive Our Youth" };
  }

  return {
    title: post?.title + " | Archive Our Youth",
  };
}

const page: FC<SinglePostPageParams> = async ({ params }) => {
  const post = await db.post.findFirst({
    where: {
      slug: decodeURIComponent(params.slug),
    },
    include: { user: true },
  });

  const currentUser = await getCurrentUser();

  if (!post) {
    return (
      <EmptyState
        title="Post Not Found"
        description="The post you're looking for does not exist. It may have been taken down."
        link={{ label: "View All Posts", route: "/home" }}
      />
    );
  }

  return (
    <main className="mx-auto w-full max-w-screen-md">
      <PageTransitionContainer>
        <SinglePost currentUser={currentUser} post={post} />
      </PageTransitionContainer>
    </main>
  );
};

export default page;
