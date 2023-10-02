import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { NextResponse } from "next/server";
import slugify from "slugify";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const { title, contentType, content, description, tags } = await req.json();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const post = await db.post.create({
      data: {
        title,
        contentType,
        postContent: content,
        description: contentType === "TEXT" ? "" : description,
        tags,
        userId: user.id,
        slug: slugify(title) + nanoid(5),
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log("POST CREATION ERROR: ", error);
  }
}
