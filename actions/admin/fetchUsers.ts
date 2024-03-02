"use server";

import { db } from "@/lib/db";

export const fetchUsers = async (take: number, skip: number) => {
  const users = await db.user.findMany({
    take,
    skip,
    orderBy: {
      createdAt: "desc",
    },
  });

  const userCount = await db.user.count();

  return {
    data: users,
    hasNextPage: skip + take < userCount,
    totalPages: Math.ceil(userCount / take),
  };
};
