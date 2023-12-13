import { FC, Suspense } from "react";
import CollageItem from "./post/CollageItem";
import { db } from "@/lib/db";
import EmptyState from "./EmptyState";
import { RefreshCcw } from "lucide-react";
import { getCurrentUser } from "@/lib/getCurrentUser";
import FadeInContainer from "./FadeInContainer";
import { Skeleton } from "./ui/skeleton";
import { ContentType } from "@prisma/client";

interface CollageProps {
  keyword?: string;
  sortBy?: string;
  tags?: string;
  country?: string;
  postType?: ContentType | "ANY";
  question?: string;
}

const Collage = async ({
  keyword,
  country,
  sortBy,
  tags,
  postType,
  question,
}: CollageProps) => {
  const currentUser = await getCurrentUser();
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
        postType && postType !== "ANY"
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
  });

  if ((!posts || !posts.length) && (keyword || sortBy)) {
    return (
      <EmptyState
        title="No Posts Found"
        description="No results match the search criteria."
        image="/404.svg"
        link={{ label: "Clear search", route: "/home", icon: RefreshCcw }}
      />
    );
  }

  return (
    <FadeInContainer>
      <div className="grid grid-cols-2 items-center overflow-hidden bg-zinc-900 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {posts.map((post) => (
          <CollageItem key={post.id} post={post} currentUser={currentUser} />
        ))}
      </div>
    </FadeInContainer>
  );
};

export default Collage;

Collage.Skeleton = (
  <div className="grid grid-cols-2 items-center gap-2 overflow-hidden bg-zinc-900 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
    {Array.from({ length: 15 }).map((value, index) => (
      <Skeleton key={index} className="aspect-square w-full rounded-none" />
    ))}
  </div>
);
