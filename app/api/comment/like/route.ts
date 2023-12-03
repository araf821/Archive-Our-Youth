import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { Comment } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { commentId } = await req.json();
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const currentComment = await db.comment.findUnique({
      where: { id: commentId },
    });

    if (!currentComment) {
      return new NextResponse("Comment not found.", { status: 400 });
    }

    let alreadyLiked = user.likedComments.includes(commentId);
    let comment: Comment;

    if (alreadyLiked) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          likedComments: user.likedPostIds.filter((id) => id !== commentId),
        },
      });

      comment = await db.comment.update({
        where: {
          id: commentId,
        },
        data: {
          likes: (currentComment.likes || 0) - 1,
        },
        include: { user: true },
      });
    } else {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          likedComments: [...user.likedPostIds, commentId],
        },
      });

      comment = await db.comment.update({
        where: {
          id: commentId,
        },
        data: {
          likes: (currentComment.likes || 0) + 1,
        },
        include: { user: true },
      });
    }

    return NextResponse.json(comment);
  } catch (error) {
    console.error("POST LIKE ERROR", error);
    return new NextResponse("Internal Error", { status: 200 });
  }
}
