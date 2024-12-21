"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { UserType } from "@prisma/client";

export const updateUserRole = async (role: UserType, userId: string) => {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return {
      error: "You don't have access to perform this action.",
    };
  }

  const userToUpdate = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!userToUpdate) {
    return {
      error: "Could not find the user in our records.",
    };
  }

  if (userToUpdate.role === "ADMIN") {
    return {
      error: "You do not have the authority to perform this action.",
    };
  }

  await db.user.update({
    where: {
      id: userToUpdate.id,
    },
    data: {
      role,
    },
  });

  return {
    success: `${userToUpdate.name}'s role is now ${role}! Refresh for changes.`,
  };
};
