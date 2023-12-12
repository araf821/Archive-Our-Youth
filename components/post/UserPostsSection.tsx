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
    <div className="group space-y-4 lg:col-span-4 lg:pl-4">
      <div className="flex flex-col gap-2 max-lg:pt-8">
        <p className="text-2xl md:text-3xl lg:text-4xl">Your Posts</p>
        <div className="relative h-[1px] w-full bg-zinc-700">
          <span className="absolute inset-0 h-[1px] w-full scale-x-0 bg-gradient-to-r from-lime-500 via-green-500 to-lime-500 transition duration-500 group-hover:scale-x-100"></span>
        </div>
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
