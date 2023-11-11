import { FC, Fragment, Suspense } from "react";
import CollageItem from "./post/CollageItem";
import { db } from "@/lib/db";
import EmptyState from "./EmptyState";
import { RefreshCcw } from "lucide-react";
import { getCurrentUser } from "@/lib/getCurrentUser";
import FadeInContainer from "./FadeInContainer";

interface CollageProps {
  keyword?: string;
  sortBy?: string;
  tags?: string[];
}

const Collage: FC<CollageProps> = async ({ keyword, sortBy, tags }) => {
  const currentUser = await getCurrentUser();
  let orderBy: any = { createdAt: "desc" };
  const tagsArray = tags ? (Array.isArray(tags) ? tags : [tags]) : [];

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
          ],
        },
        tags
          ? {
              tags: {
                hasSome: tagsArray,
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
        title="No Results"
        description="No posts match the search criteria."
        link={{ label: "Clear Search", route: "/home", icon: RefreshCcw }}
      />
    );
  }

  return (
    <FadeInContainer>
      <div className="grid grid-cols-2 items-center overflow-hidden bg-zinc-900 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        <Suspense fallback="Loading...">
          {posts.map((post, index) => (
            <Fragment key={index}>
              <CollageItem key={index} post={post} currentUser={currentUser} />
            </Fragment>
          ))}
        </Suspense>
      </div>
    </FadeInContainer>
  );
};

export default Collage;
