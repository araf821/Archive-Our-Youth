import { currentUser } from "@clerk/nextjs/server";

import { db } from "./db";

export const getCurrentUser = async () => {
  try {
    const authorizedUser = await currentUser();

    if (!authorizedUser) {
      return null;
    }

    const user = await db.user.findUnique({
      where: {
        userId: authorizedUser.id,
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};
