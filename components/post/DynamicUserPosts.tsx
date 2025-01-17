import { Post } from "@prisma/client";
import { FC, Fragment } from "react";
import UserPost from "./UserPost";

interface DynamicUserPostsProps {
  posts: Post[];
}

const DynamicUserPosts: FC<DynamicUserPostsProps> = ({ posts }) => {
  return (
    <div className="flex flex-col gap-4 pb-8">
      {posts.map((post) => (
        <Fragment key={post.id}>
          <UserPost post={post} />
          <hr className="my-2 border-border-dark" />
        </Fragment>
      ))}
      <p className="my-4 text-center text-zinc-400">- End of Posts -</p>
    </div>
  );
};

export default DynamicUserPosts;
