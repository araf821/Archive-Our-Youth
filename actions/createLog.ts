"use server";

import { db } from "@/lib/db";
import { ACTION_TYPE, LOG_TYPE } from "@prisma/client";

interface createLogProps {
  userId: string;
  userImg: string;
  userName: string;
  actionType: ACTION_TYPE;
  logType: LOG_TYPE;
  entityId?: string;
}

const createLog = async ({
  actionType,
  logType,
  userId,
  userImg,
  userName,
  entityId,
}: createLogProps) => {
  if (logType === "USER") {
    if (actionType === "CREATE") {
      const newUser = await db.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!newUser) {
        return {
          error: "Failed to create log, could not find new user.",
        };
      }

      await db.log.create({
        data: {
          actionType,
          logType,
          userId,
          userImg,
          userName,
          description: `Joined the platform!`,
        },
      });
      return;
    }
  }

  if (logType === "POST") {
    if (actionType === "CREATE") {
      const newPost = await db.post.findUnique({
        where: {
          id: entityId,
        },
      });

      if (!newPost) {
        return {
          error: "Failed to create log, could not find the new post.",
        };
      }

      await db.log.create({
        data: {
          actionType,
          logType,
          userId,
          userImg,
          userName,
          description: `Created new post -> ${newPost.title}. Post ID: <${newPost.id}>`,
        },
      });
      return;
    }
  }

  if (logType === "COMMENT") {
    if (actionType === "CREATE") {
      const newComment = await db.comment.findUnique({
        where: {
          id: entityId,
        },
      });

      if (!newComment) {
        return {
          error: "Failed to create log, could not find the new comment.",
        };
      }

      await db.log.create({
        data: {
          actionType,
          logType,
          userId,
          userImg,
          userName,
          description: `Left a new comment on the post with the ID of <${newComment.postId}>.`,
        },
      });
      return;
    }
  }

  return {
    success: "Log created.",
  };
};

export default createLog;
