"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useIntersection } from "@mantine/hooks";
import { Post, User } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

import { Skeleton } from "../ui/skeleton";
import PostModal from "./PostModal";

interface InfinitePostsProps {
  initialPosts: (Post & { user: User | null })[];
  currentUser: User | null;
}
const FETCH_LIMIT = 33;

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
        const nextPage =
          lastPage.length === FETCH_LIMIT ? pages.length + 1 : undefined;
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
    <div
      className="grid grid-cols-2 items-center gap-0.5 overflow-hidden sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      data-grid-cols="lg:5 xl:6"
    >
      {posts.map((post, index) => {
        // Add position data attributes
        const lgColPosition = index % 5;
        const xlColPosition = index % 6;
        const lgRowPosition = Math.floor(index / 5);
        const xlRowPosition = Math.floor(index / 6);
        const lgIsLastRow =
          lgRowPosition === Math.floor((posts.length - 1) / 5);
        const xlIsLastRow =
          xlRowPosition === Math.floor((posts.length - 1) / 6);
        const lgIsFirstRow = lgRowPosition === 0;
        const xlIsFirstRow = xlRowPosition === 0;

        const positionProps = {
          "data-lg-pos": lgColPosition,
          "data-xl-pos": xlColPosition,
          "data-lg-last-row": lgIsLastRow ? "true" : "false",
          "data-xl-last-row": xlIsLastRow ? "true" : "false",
          "data-lg-first-row": lgIsFirstRow ? "true" : "false",
          "data-xl-first-row": xlIsFirstRow ? "true" : "false",
        };

        if (index === posts.length - 2) {
          return (
            <>
              {hasNextPage && !isFetchingNextPage && <span ref={ref} />}
              <PostModal
                key={post.id}
                post={post}
                currentUser={currentUser}
                {...positionProps}
              />
            </>
          );
        }

        return (
          <PostModal
            key={post.id}
            post={post}
            currentUser={currentUser}
            {...positionProps}
          />
        );
      })}
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
          <Skeleton className="aspect-square animate-pulse" />
          <Skeleton className="aspect-square animate-pulse" />
        </>
      )}
    </div>
  );
};

export default InfinitePosts;
