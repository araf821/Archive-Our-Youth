import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import slugify from "slugify";
import { nanoid } from "nanoid";
import { PostCreationValidator } from "@/lib/validators/post";
import { initializeUser } from "@/lib/initializeUser";

export async function POST(req: Request) {
  try {
    const user = await initializeUser();

    const body = await req.json();
    const {
      title,
      contentType,
      content,
      description,
      tags,
      researchQuestions,
      thumbnail,
      location,
    } = PostCreationValidator.parse(body);

    const post = await db.post.create({
      data: {
        title,
        contentType,
        postContent: content,
        thumbnail,
        location,
        description:
          contentType === "TEXT" ? "" : description ? description : "",
        tags,
        userId: user?.id,
        slug:
          slugify(title, {
            lower: true,
            replacement: "-",
            remove: /[:]/g,
          }) +
          "-" +
          nanoid(5),
        researchQuestions,
      },
    });

    return NextResponse.json({ slug: post.slug });
  } catch (error: any) {
    console.log("POST CREATION ERROR: ", error);

    if (error.code === "P2002") {
      return new NextResponse("Internal Error", { status: 409 });
    }

    return new NextResponse("Internal Error", { status: 500 });
  }
}
