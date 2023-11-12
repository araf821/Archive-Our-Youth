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

// export const metadata:  = {
//   title: "Post Page | Digital Archive",
// };

export async function generateMetadata({ params }: SinglePostPageParams) {
  const post = await db.post.findFirst({
    where: {
      slug: params.slug,
    },
    select: {
      title: true,
    },
  });

  if (!post) {
    return { title: "Post Page | Digital Archive" };
  }

  return {
    title: post?.title + " | Digital Archive",
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
