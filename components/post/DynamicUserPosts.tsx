"use client";

import { Post } from "@prisma/client";
import { FC } from "react";
import UserPost from "./UserPost";
import { AnimatePresence } from "framer-motion";

interface DynamicUserPostsProps {
  posts: Post[];
}

const DynamicUserPosts: FC<DynamicUserPostsProps> = ({ posts }) => {
  return (
    <div className="flex flex-col gap-4 pb-8">
      <AnimatePresence>
        {posts.map((post) => (
          <UserPost key={post.id} post={post} />
        ))}
      </AnimatePresence>
      <p className="my-4 text-center text-zinc-400">- End of Posts -</p>
    </div>
  );
};

export default DynamicUserPosts;
