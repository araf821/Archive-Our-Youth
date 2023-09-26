import { auth } from "@clerk/nextjs";
import { db } from "./db";

export const currentUser = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
};
