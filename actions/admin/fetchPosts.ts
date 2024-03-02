"use server";

import { db } from "@/lib/db";
import { delay } from "@/lib/utils";

export const fetchPosts = async (take: number, skip: number) => {
  await delay(2000);

  const posts = await db.post.findMany({
    take,
    skip,
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

  const postCount = await db.post.count();

  return {
    data: posts,
    hasNextPage: skip + take < postCount,
    totalPages: Math.ceil(postCount / take),
  };
};
