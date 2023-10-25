import { FC, Fragment } from "react";
import CollageItem from "./post/CollageItem";
import { db } from "@/lib/db";
import EmptyState from "./EmptyState";
import { HomeIcon } from "lucide-react";
import { getCurrentUser } from "@/lib/getCurrentUser";
import FadeInContainer from "./FadeInContainer";

interface CollageProps {
  keyword?: string;
  sortBy?: string;
}

const Collage: FC<CollageProps> = async ({ keyword, sortBy }) => {
  const currentUser = await getCurrentUser();
  let orderBy: any = { createdAt: "desc" };

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
      ],
    },
    orderBy,
    include: { user: true },
  });

  if (!posts) {
    return (
      <EmptyState
        title="No Posts Found"
        description="Seems like something may have gone wrong on our end. Please check back later."
        link={{ label: "Back to Home", route: "/", icon: HomeIcon }}
      />
    );
  }

  return (
    <FadeInContainer>
      <div className="grid grid-cols-2 items-center overflow-hidden bg-zinc-900 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {posts.map((post, index) => (
          <Fragment key={index}>
            <CollageItem key={index} post={post} currentUser={currentUser} />
          </Fragment>
        ))}
      </div>
    </FadeInContainer>
  );
};

export default Collage;
