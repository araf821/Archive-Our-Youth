import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { NextResponse } from "next/server";
import slugify from "slugify";
import { nanoid } from "nanoid";
import { PostCreationValidator } from "@/lib/validators/post";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    const body = await req.json();
    const {
      title,
      contentType,
      content,
      description,
      tags,
      researchQuestions,
    } = PostCreationValidator.parse(body);

    const post = await db.post.create({
      data: {
        title,
        contentType,
        postContent: content,
        description:
          contentType === "TEXT" ? "" : description ? description : "",
        tags,
        userId: user?.id,
        slug: slugify(title) + nanoid(5),
        researchQuestions,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log("POST CREATION ERROR: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
