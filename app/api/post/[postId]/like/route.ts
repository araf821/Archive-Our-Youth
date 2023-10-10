import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { Post } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { postId: string } },
) {
  try {
    const currentUser = await getCurrentUser();
    const { postId } = params;

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!postId) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const currentPost = await db.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!currentPost) {
      return new NextResponse("Post not found", { status: 404 });
    }

    let alreadyLiked = currentUser.likedPostIds.includes(postId);
    let post: Post;

    if (alreadyLiked) {
      await db.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          likedPostIds: currentUser.likedPostIds.filter((id) => id !== postId),
        },
      });

      post = await db.post.update({
        where: {
          id: postId,
        },
        data: {
          likes: (currentPost.likes || 0) - 1,
        },
        include: { user: true },
      });
    } else {
      await db.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          likedPostIds: [...currentUser.likedPostIds, postId],
        },
      });

      post = await db.post.update({
        where: {
          id: postId,
        },
        data: {
          likes: (currentPost.likes || 0) + 1,
        },
        include: { user: true },
      });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.log("POST LIKE ERROR: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
