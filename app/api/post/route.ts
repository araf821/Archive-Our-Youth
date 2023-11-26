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
    } = PostCreationValidator.parse(body);

    console.log(body);
    

    const post = await db.post.create({
      data: {
        title,
        contentType,
        postContent: content,
        thumbnail,
        description:
          contentType === "TEXT" ? "" : description ? description : "",
        tags,
        userId: user?.id,
        slug:
          slugify(title, {
            lower: true,
            replacement: "-",
            remove: /[:]/g,
          }) + nanoid(5),
        researchQuestions,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log("POST CREATION ERROR: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
