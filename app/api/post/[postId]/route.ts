import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { NextResponse } from "next/server";

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
