import Link from "next/link";
import { FC } from "react";
import { db } from "@/lib/db";
import DynamicUserPosts from "./DynamicUserPosts";

interface UserPostsSectionProps {
  userId: string;
}

const UserPostsSection: FC<UserPostsSectionProps> = async ({ userId }) => {
  const posts = await db.post.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-4 lg:col-span-4 lg:pl-4">
      <div className="flex flex-col gap-2 max-lg:pt-8">
        <p className="text-2xl md:text-3xl lg:text-4xl">Your Posts</p>
        <hr className="border-zinc-700" />
      </div>
      {posts.length < 1 ? (
        <div className="text-zinc-400 md:text-lg">
          <p>Looks like you have not published any posts yet.</p>
          <Link href="/submit" prefetch={false} className="text-blue-400">
            Make a new submission
          </Link>
        </div>
      ) : (
        <DynamicUserPosts posts={posts} />
      )}
    </div>
  );
};

export default UserPostsSection;
