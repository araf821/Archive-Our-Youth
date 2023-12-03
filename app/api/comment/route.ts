import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { CommentValidator } from "@/lib/validators/comment";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const currentUser = await getCurrentUser();
    console.log(body);

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { content, postId, replyToId, isReply } =
      CommentValidator.parse(body);

    const post = await db.post.findUnique({ where: { id: postId } });

    if (!post) {
      return new NextResponse("Post ID is not valid.", { status: 400 });
    }

    await db.comment.create({
      data: {
        content,
        postId,
        replyToId,
        isReply,
        userId: currentUser.id,
      },
    });

    revalidatePath(`/post/${post.slug}`);

    return NextResponse.json("Comment Added", { status: 200 });
  } catch (error) {
    console.log("ERROR ADDING COMMENT", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const replies = await db.comment.findMany({
      where: {
        replyToId: url.searchParams.get("commentId"),
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(replies, { status: 200 });
  } catch (error) {
    console.log("POST FETCH ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
