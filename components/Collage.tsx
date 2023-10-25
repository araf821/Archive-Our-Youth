import { FC, Fragment } from "react";
import CollageItem from "./post/CollageItem";
import { db } from "@/lib/db";
import EmptyState from "./EmptyState";
import { HomeIcon } from "lucide-react";
import { getCurrentUser } from "@/lib/getCurrentUser";
import FadeInContainer from "./FadeInContainer";
import axios from "axios";
import { Post, User } from "@prisma/client";

interface CollageProps {}

const Collage: FC<CollageProps> = async ({}) => {
  const currentUser = await getCurrentUser();
  const posts = await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: { user: true },
  });
  // let posts: (Post & { user: User })[] = [];
  // if (typeof window !== undefined) {
  //   posts = await axios.get(window.location.origin + "/api/post");
  // }

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
