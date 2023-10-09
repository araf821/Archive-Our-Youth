import Link from "next/link";
import { FC } from "react";
import { db } from "@/lib/db";
import UserPost from "./UserPost";
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
    <>
      <div className="flex flex-col gap-2 pt-8">
        <p className="text-2xl md:text-3xl">Your Posts</p>
        <hr className="border-zinc-800" />
      </div>
      {posts.length < 1 ? (
        <div className="text-zinc-400 md:text-lg">
          <p>Looks like you have not published any posts yet.</p>
          <Link href="/submit" className="text-blue-400">
            Make a new submission
          </Link>
        </div>
      ) : (
        <DynamicUserPosts posts={posts} />
      )}
    </>
  );
};

export default UserPostsSection;