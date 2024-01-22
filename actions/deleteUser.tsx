"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { clerkClient } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

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

  if (userToDelete.id.slice(0, 7) !== confirmationString) {
    return {
      error: "Confirmation code did not match.",
    };
  }

  try {
    await clerkClient.users.deleteUser(userToDelete.userId);
  } catch (error) {
    console.error("Clerk user deletion error", error);
    return {
      error: "Clerk failed to delete this user.",
    };
  }

  await db.user.delete({
    where: {
      id: userToDelete.id,
    },
  });

  revalidatePath("/dashboard/admin-portal/users");
  return {
    success: "User has been deleted.",
  };
};
