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

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        likedComments: alreadyLiked
          ? user.likedPostIds.filter((id) => id !== commentId)
          : [...user.likedComments, commentId],
      },
    });

    await db.comment.update({
      where: {
        id: commentId,
      },
      data: {
        likes: alreadyLiked
          ? currentComment.likes === 0
            ? 0
            : currentComment.likes - 1
          : currentComment.likes + 1,
      },
    });

    return NextResponse.json(alreadyLiked ? "Like - 1" : "Like + 1", {
      status: 200,
    });
  } catch (error) {
    console.error("POST LIKE ERROR", error);
    return new NextResponse("Internal Error", { status: 200 });
  }
}
