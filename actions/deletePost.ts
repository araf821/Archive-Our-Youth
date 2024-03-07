"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";

export const deletePost = async (
  postId: string,
  confirmationString: string,
) => {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return {
      error: "You don't have access to perform this action.",
    };
  }

  const postToDelete = await db.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!postToDelete) {
    return {
      error: "Post not found.",
    };
  }

  if (postToDelete.id.slice(0, 7) !== confirmationString) {
    return {
      error: "Confirmation code did not match.",
    };
  }

  await db.post.delete({
    where: {
      id: postToDelete.id,
    },
  });

  return {
    success: "Post has been deleted! Refresh for changes.",
  };
};
