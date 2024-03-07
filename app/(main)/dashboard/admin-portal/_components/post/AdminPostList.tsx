"use client";

import AdminSinglePost from "./AdminSinglePost";
import { Skeleton } from "@/components/ui/skeleton";
import Pagination from "../Pagination";
import { FETCH_POSTS_MAX } from "@/lib/constants";
import { useCallback, useEffect, useState } from "react";
import { fetchPosts } from "@/actions/admin-fetch/fetchPosts";
import { toast } from "sonner";
import { Post, User } from "@prisma/client";

interface AdminPostListProps {
  page?: number;
}

const AdminPostList = ({ page = 1 }: AdminPostListProps) => {
  const [posts, setPosts] = useState<
    (Post & { user: User | null; _count: { comments: number } })[]
  >([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetch = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await fetchPosts(
        FETCH_POSTS_MAX,
        (page - 1) * FETCH_POSTS_MAX,
      );
      setPosts(data.data);
      setHasNextPage(data.hasNextPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error("Could not fetch posts at this time.");
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  if (isLoading) {
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
