import { NextResponse } from "next/server";
import { ContentType } from "@prisma/client";
import { ZodError } from "zod";

import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const { searchParams } = url;

    // Infinite query params
    const page = searchParams.get("page")!;
    const limit = searchParams.get("limit")!;

    // Search query params
    const keyword = searchParams.get("keyword");
    const sortBy = searchParams.get("sortBy");
    const tags = searchParams.get("tags");
    const country = searchParams.get("country");
    const postType = searchParams.get("postType") as ContentType;
    const question = searchParams.get("question");

    let orderBy: any = { createdAt: "desc" };
    const tagsArray = tags ? tags.split(",") : [];

    switch (sortBy) {
      case "most-popular":
        orderBy = {
          likes: "desc",
        };
        break;
      case "least-popular":
        orderBy = { likes: "asc" };
        break;
      case "latest":
        orderBy = { createdAt: "desc" };
        break;
      case "oldest":
        orderBy = { createdAt: "asc" };
        break;
      default:
        orderBy = { createdAt: "desc" };
    }

    const posts = await db.post.findMany({
      where: {
        AND: [
          {
            OR: [
              keyword
                ? {
                    title: {
                      contains: keyword,
                      mode: "insensitive",
                    },
                  }
                : {},
              country
                ? {
                    location: {
                      equals: country,
                      mode: "insensitive",
                    },
                  }
                : {},
            ],
          },
          postType
            ? {
                contentType: {
                  equals: postType,
                },
              }
            : {},
          tags
            ? {
                tags: {
                  hasSome: tagsArray,
                },
              }
            : {},
          question && question !== "any"
            ? {
                researchQuestions: {
                  hasSome: [question],
                },
              }
            : {},
        ],
      },
      orderBy,
      include: { user: true },
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse("Invalid query provided.", { status: 400 });
    }

    return new NextResponse("Internal error! Couldn't fetch posts.", {
      status: 500,
    });
  }
}
