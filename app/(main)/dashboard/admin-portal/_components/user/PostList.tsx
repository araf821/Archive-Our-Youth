import UserPost from "@/components/post/UserPost";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";

interface PostListProps {
  userId: string;
}

const PostList = async ({ userId }: PostListProps) => {
  const posts = await db.post.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!posts.length) {
    return null;
  }

  return (
    <div className="pt-6">
      <h2 className="text-lg font-medium md:text-xl">User&apos;s Posts</h2>
      <hr className="mt-2 border-zinc-700" />
      <div className="mt-6 space-y-6 divide-y divide-zinc-700">
        {posts.map((post) => (
          <div key={post.id} className="pt-6 first:pt-0">
            <UserPost post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;

PostList.Skeleton = function PostListSkeleton() {
  return (
    <div className="mb-8 flex flex-col gap-6">
      <Skeleton className="h-60" />
      <Skeleton className="h-60" />
      <Skeleton className="h-60" />
    </div>
  );
};
