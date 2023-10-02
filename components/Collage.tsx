import { dummyItems } from "@/lib/data";
import { FC, Fragment } from "react";
import CollageItem from "./CollageItem";
import { db } from "@/lib/db";
import EmptyState from "./EmptyState";
import { HomeIcon } from "lucide-react";

interface CollageProps {}

const Collage: FC<CollageProps> = async ({}) => {
  const posts = await db.post.findMany();

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
    <div className="grid grid-cols-2 items-center overflow-hidden bg-black sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {posts.map((item, index) => (
        <Fragment key={index}>
          <CollageItem key={index} item={item} />
        </Fragment>
      ))}
    </div>
  );
};

export default Collage;
