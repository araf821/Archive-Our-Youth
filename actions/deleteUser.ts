"use server";

import { clerkClient } from "@/lib/clerk";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";

export const deleteUser = async (
  userId: string,
  confirmationString: string,
) => {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return {
      error: "You don't have access to perform this action.",
    };
  }

  if (userId === user.id) {
    return {
      error:
        "Cannot delete yourself. Please email araf821@my.yorku.ca for this action.",
    };
  }

  const userToDelete = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!userToDelete) {
    return {
      error: "User not found.",
    };
  }

  if (userToDelete.role === "ADMIN") {
    return {
      error: "Cannot delete an admin. Please contact araf821@my.yorku.ca.",
    };
  }

  if (userToDelete.id.slice(0, 7) !== confirmationString) {
    return {
      error: "Confirmation code did not match.",
    };
  }

  try {
    await clerkClient.users.deleteUser(userToDelete.userId);
    await db.user.delete({
      where: {
        id: userToDelete.id,
      },
    });
  } catch (error) {
    console.error("ERROR DELETING USER", error);
    return {
      error: "Failed to delete user. Please try again later.",
    };
  }

  return {
    success: "User has been deleted! Refresh for changes.",
  };
};
