import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { PostEditValidator } from "@/lib/validators/post";

export async function PUT(
  req: Request,
  { params }: { params: { postId: string } },
) {
  try {
    const { postId } = params;
    const currentUser = await getCurrentUser();

    if (!postId) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const {
      content,
      tags,
      description,
      thumbnail,
      researchQuestions,
      location,
    } = PostEditValidator.parse(body);

    await db.post.update({
      where: { id: postId },
      data: {
        postContent: content,
        tags,
        description,
        thumbnail,
        researchQuestions,
        location,
      },
    });

    return NextResponse.json("Post Updated Successfully", { status: 200 });
  } catch (error) {
    console.log("Post update error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { postId: string } },
) {
  try {
    const { postId } = params;
    const currentUser = await getCurrentUser();

    if (!postId) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const post = await db.post.delete({
      where: {
        id: postId,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log("POST DELETION ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
