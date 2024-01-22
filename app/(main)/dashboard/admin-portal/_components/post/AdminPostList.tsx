import { db } from "@/lib/db";
import AdminSinglePost from "./AdminSinglePost";
import { Skeleton } from "@/components/ui/skeleton";

interface AdminPostListProps {}

const AdminPostList = async ({}: AdminPostListProps) => {
  const posts = await db.post.findMany({
    include: {
      user: true,
      _count: {
        select: {
          comments: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!posts) {
    return null;
  }

  return (
    <div className="space-y-2 pt-4">
      {posts.map((post) => (
        <AdminSinglePost key={post.id} post={post} />
      ))}
    </div>
  );
};

export default AdminPostList;

AdminPostList.Skeleton = function PostListSkeleton() {
  return (
    <div className="mt-4 flex flex-col gap-2.5">
      <Skeleton className="h-14 rounded-none bg-[#2f2f2f]" />
      <Skeleton className="h-14 rounded-none bg-[#2f2f2f]" />
      <Skeleton className="h-14 rounded-none bg-[#2f2f2f]" />
      <Skeleton className="h-14 rounded-none bg-[#2f2f2f]" />
      <Skeleton className="h-14 rounded-none bg-[#2f2f2f]" />
      <Skeleton className="h-14 rounded-none bg-[#2f2f2f]" />
      <Skeleton className="h-14 rounded-none bg-[#2f2f2f]" />
      <Skeleton className="h-14 rounded-none bg-[#2f2f2f]" />
      <Skeleton className="h-14 rounded-none bg-[#2f2f2f]" />
    </div>
  );
};
