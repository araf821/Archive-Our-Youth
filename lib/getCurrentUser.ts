import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

export const getCurrentUser = async () => {
  const signedInUser = await currentUser();

  if (!signedInUser) {
    return null;
  }

  const user = await db.user.findUnique({
    where: {
      userId: signedInUser.id,
    },
  });

  return user;
};
