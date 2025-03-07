import { currentUser } from "@clerk/nextjs/server";

import { db } from "./db";

export const initializeUser = async () => {
  const authorizedUser = await currentUser();

  if (!authorizedUser) {
    return;
  }

  const user = await db.user.findUnique({
    where: {
      userId: authorizedUser.id,
    },
  });

  if (user) {
    return user;
  }

  const newUser = await db.user.create({
    data: {
      userId: authorizedUser.id,
      name: `${
        authorizedUser.firstName === null
          ? "No Name"
          : authorizedUser.firstName +
            (authorizedUser.lastName ? " " + authorizedUser.lastName : "")
      }`,
      imageUrl: "/placeholder-image.png",
      email: authorizedUser.emailAddresses[0].emailAddress,
    },
  });

  return newUser;
};
