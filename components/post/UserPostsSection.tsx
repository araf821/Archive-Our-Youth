import Link from "next/link";
import { db } from "@/lib/db";
import DynamicUserPosts from "./DynamicUserPosts";
import FadeInContainer from "../FadeInContainer";
import { Skeleton } from "../ui/skeleton";

interface UserPostsSectionProps {
  userId: string;
}

const UserPostsSection = async ({ userId }: UserPostsSectionProps) => {
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
      <FadeInContainer>
        <div className="flex flex-col gap-2 max-lg:pt-8">
          <p className="text-2xl md:text-3xl lg:text-4xl">Your Posts</p>
          <div className="relative h-[1px] w-full bg-zinc-700">
            <span className="absolute inset-0 h-[1px] w-full scale-x-0 bg-gradient-to-r from-lime-500 via-green-500 to-lime-500 transition duration-500 group-hover:scale-x-100"></span>
          </div>
        </div>
      </FadeInContainer>
      {posts.length < 1 ? (
        <FadeInContainer>
          <div className="text-zinc-400 md:text-lg">
            <p>Looks like you have not published any posts yet.</p>
            <Link href="/submit" prefetch={false} className="text-green-500">
              Make a new submission
            </Link>
          </div>
        </FadeInContainer>
      ) : (
        <DynamicUserPosts posts={posts} />
      )}
    </div>
  );
};

export default UserPostsSection;

UserPostsSection.Skeleton = function UserPostsSectionSkeleton() {
  return (
    <div className="w-full space-y-4 max-lg:pt-6 lg:col-span-4 lg:pl-4">
      <Skeleton className="h-8 w-1/4" />
      <Skeleton className="h-1 w-full" />
      <Skeleton className="h-36 w-full" />
      <Skeleton className="h-36 w-full" />
      <Skeleton className="h-36 w-full" />
      <Skeleton className="h-36 w-full" />
      <Skeleton className="h-36 w-full" />
      <Skeleton className="h-36 w-full" />
    </div>
  );
};
