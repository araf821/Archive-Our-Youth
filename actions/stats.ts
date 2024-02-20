import { db } from "@/lib/db";

export const getStats = async () => {
  const userCount = await db.user.count();
  const postCount = await db.post.count();
  const commentCount = await db.comment.count();

  const textPosts = await db.post.count({
    where: {
      contentType: "TEXT",
    },
  });
  const videoPosts = await db.post.count({
    where: {
      contentType: "VIDEO",
    },
  });
  const audioPosts = await db.post.count({
    where: {
      contentType: "AUDIO",
    },
  });
  const pdfPosts = await db.post.count({
    where: {
      contentType: "PDF",
    },
  });
  const imagePosts = await db.post.count({
    where: {
      contentType: "IMAGE",
    },
  });

  const admins = await db.user.count({
    where: {
      role: "ADMIN",
    },
  });
  const members = await db.user.count({
    where: {
      role: "MEMBER",
    },
  });

  return {
    userCount,
    postCount,
    commentCount,
    textPosts,
    videoPosts,
    audioPosts,
    pdfPosts,
    imagePosts,
    admins,
    members,
  };
};
