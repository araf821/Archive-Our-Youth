import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { CommentValidator } from "@/lib/validators/comment";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { content, postId } = CommentValidator.parse(body);

    await db.comment.create({
      data: {
        content,
        postId,
        userId: currentUser.id,
      },
    });

    return NextResponse.json("Comment Added", { status: 200 });
  } catch (error) {
    console.log("ERROR ADDING COMMENT", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
