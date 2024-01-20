"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { revalidatePath } from "next/cache";

export const deleteComment = async (
  commentId: string,
  confirmationString: string,
) => {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return {
      error: "You don't have access to perform this action.",
    };
  }

  const commentToDelete = await db.comment.findUnique({
    where: {
      id: commentId,
    },
    include: {
      _count: {
        select: {
          replies: true,
        },
      },
    },
  });

  if (!commentToDelete) {
    return {
      error: "Comment to delete could not be found.",
    };
  }

  if (commentToDelete.id.slice(0, 7) !== confirmationString) {
    return {
      error: "Confirmation code did not match.",
    };
  }

  let deletionType: "deleted" | "marked";

  if (commentToDelete._count.replies > 0) {
    await db.comment.update({
      where: {
        id: commentToDelete.id,
      },
      data: {
        deleted: true,
      },
    });
    deletionType = "marked";
  } else {
    await db.comment.delete({
      where: {
        id: commentToDelete.id,
      },
    });
    deletionType = "deleted";
  }

  revalidatePath("/dashboard/admin-portal/comments");
  return {
    success:
      deletionType === "deleted"
        ? "Comment has been deleted."
        : "Comment was marked as deleted.",
  };
};
