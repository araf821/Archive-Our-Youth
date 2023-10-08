import EmptyState from "@/components/EmptyState";
import PageTransitionContainer from "@/components/PageTransitionContainer";
import SinglePost from "@/components/post/SinglePost";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { FC } from "react";

interface SinglePostPage {
  params: {
    slug: string;
  };
}

export const metadata = {
  title: "Post Page | Digital Collage",
};

const page: FC<SinglePostPage> = async ({ params }) => {
  const post = await db.post.findFirst({
    where: {
      slug: params.slug,
    },
    include: { user: true },
  });

  const currentUser = await getCurrentUser();

  if (!post) {
    return (
      <EmptyState
        title="Post Not Found"
        description="The post you're looking for does not exist. It may have been taken deleted."
        link={{ label: "View All Posts", route: "/collage" }}
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
