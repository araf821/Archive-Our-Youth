"use client";

import { Post, User } from "@prisma/client";
import PostModal from "./PostModal";
import PostModalTriggerContent from "./PostModalTriggerContent";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from "@mantine/hooks";
import axios from "axios";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "../ui/skeleton";

interface InfinitePostsProps {
  initialPosts: (Post & { user: User | null })[];
  currentUser: User | null;
}
const FETCH_LIMIT = 10;

const InfinitePosts = ({ initialPosts, currentUser }: InfinitePostsProps) => {
  const lastPostRef = useRef<HTMLButtonElement>(null);
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const sortBy = searchParams.get("sortBy");
  const tags = searchParams.get("tags");
  const country = searchParams.get("country");
  const postType = searchParams.get("postType");
  const question = searchParams.get("question");

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: [
        "infinite-query",
        keyword,
        sortBy,
        tags,
        country,
        postType,
        question,
      ],
      queryFn: async ({ pageParam = 1 }) => {
        const query =
          `/api/posts?limit=${FETCH_LIMIT}&page=${pageParam}` +
          `${!!keyword ? `&keyword=${keyword}` : ""}` +
          `${!!sortBy ? `&sortBy=${sortBy}` : ""}` +
          `${!!tags ? `&tags=${tags}` : ""}` +
          `${!!country ? `&country=${country}` : ""}` +
          `${!!postType ? `&postType=${postType}` : ""}` +
          `${!!question ? `&question=${question}` : ""}`;

        const { data } = await axios.get(query);

        return data as (Post & { user: User | null })[];
      },
      getNextPageParam: (lastPage, pages) => {
        const nextPage = lastPage.length === 10 ? pages.length + 1 : undefined;

        return nextPage;
      },
      initialData: { pages: [initialPosts], pageParams: [1] },
    });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

  return (
    <div className="grid grid-cols-2 items-center gap-[2px] overflow-hidden sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {posts.map((post, index) => {
        if (index === posts.length - 1) {
          return (
            <>
              {hasNextPage && <span ref={ref} />}
              <PostModal key={post.id} post={post} currentUser={currentUser}>
                <button className="group relative aspect-square cursor-pointer overflow-hidden border-zinc-800 outline-none transition duration-500 focus-visible:z-[9999] focus-visible:outline focus-visible:outline-4 focus-visible:outline-green-600">
                  <PostModalTriggerContent
                    post={post}
                    currentUser={currentUser}
                  />
                </button>
              </PostModal>
            </>
          );
        }

        return (
          <PostModal key={post.id} post={post} currentUser={currentUser}>
            <button className="group relative aspect-square cursor-pointer overflow-hidden border-zinc-800 outline-none transition duration-500 focus-visible:z-[9999] focus-visible:outline focus-visible:outline-4 focus-visible:outline-green-600">
              <PostModalTriggerContent post={post} currentUser={currentUser} />
            </button>
          </PostModal>
        );
      })}
      {Array(10).map((_, index) => (
        <li
          key={index}
          className="aspect-square w-40 animate-pulse bg-zinc-800"
        >
          asdf
        </li>
      ))}

      {isFetchingNextPage && (
        <>
          <Skeleton className="aspect-square animate-pulse" />
          <Skeleton className="aspect-square animate-pulse" />
          <Skeleton className="aspect-square animate-pulse" />
          <Skeleton className="aspect-square animate-pulse" />
          <Skeleton className="aspect-square animate-pulse" />
          <Skeleton className="aspect-square animate-pulse" />
          <Skeleton className="aspect-square animate-pulse" />
          <Skeleton className="aspect-square animate-pulse" />
        </>
      )}
    </div>
  );
};

export default InfinitePosts;
