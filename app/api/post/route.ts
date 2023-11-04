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
      q1,
      q2,
      q3,
      q4,
      q5,
    } = PostCreationValidator.parse(body);

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

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
      },
    });

    if (q1.trim().length !== 0) {
      await db.researchQuestion.create({
        data: {
          postId: post.id,
          question: "What is the future you dream of?",
          answer: q1,
        },
      });
    }

    if (q2.trim().length !== 0) {
      await db.researchQuestion.create({
        data: {
          postId: post.id,
          question: "What does well-being mean to you right now?",
          answer: q2,
        },
      });
    }

    if (q3.trim().length !== 0) {
      await db.researchQuestion.create({
        data: {
          postId: post.id,
          question: "What would you tell your younger or older self?",
          answer: q3,
        },
      });
    }

    if (q4.trim().length !== 0) {
      await db.researchQuestion.create({
        data: {
          postId: post.id,
          question: "What's the future you dream of?",
          answer: q4,
        },
      });
    }

    if (q5.trim().length !== 0) {
      await db.researchQuestion.create({
        data: {
          postId: post.id,
          question:
            "What groups, initiatives, projects, and resources support your wellbeing and the wellbeing of the planet? What more would be helpful and of value to you right now?",
          answer: q5,
        },
      });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.log("POST CREATION ERROR: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
