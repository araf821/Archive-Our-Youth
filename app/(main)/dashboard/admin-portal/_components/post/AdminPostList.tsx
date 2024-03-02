import AdminSinglePost from "./AdminSinglePost";
import { Skeleton } from "@/components/ui/skeleton";
import Pagination from "../Pagination";
import { fetchPosts } from "@/actions/admin/fetchPosts";
import { FETCH_POSTS_MAX } from "@/lib/constants";

interface AdminPostListProps {
  page?: number;
}

const AdminPostList = async ({ page = 1 }: AdminPostListProps) => {
  const {
    data: posts,
    hasNextPage,
    totalPages,
  } = await fetchPosts(FETCH_POSTS_MAX, (page - 1) * FETCH_POSTS_MAX);

  if (!posts) {
    return null;
  }

  return (
    <>
      <div className="space-y-2 pb-4 pt-4">
        {posts.map((post) => (
          <AdminSinglePost key={post.id} post={post} />
        ))}
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
      />
    </>
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
      <Skeleton className="h-14 rounded-none bg-[#2f2f2f]" />
      <Skeleton className="h-14 rounded-none bg-[#2f2f2f]" />
      <Skeleton className="h-14 rounded-none bg-[#2f2f2f]" />
    </div>
  );
};
