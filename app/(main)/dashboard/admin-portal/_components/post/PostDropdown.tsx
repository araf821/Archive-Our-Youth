"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Post, User } from "@prisma/client";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ManagePostModal from "./ManagePostModal";

interface PostDropdownProps {
  post: Post & { user: User | null; _count: { comments: number } };
}

const PostDropdown = ({ post }: PostDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="ml-auto">
          <MoreVertical />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[250px] space-y-1.5 border-2 border-zinc-700"
        align="end"
      >
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="focus:ring-none justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-700 focus-visible:ring-offset-2"
          asChild
        >
          <Link
            href={`/post/${post.slug}`}
            className="w-full cursor-pointer tracking-widest outline-none"
          >
            View Post
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setIsOpen(true)}
          className="w-full cursor-pointer justify-center tracking-widest focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Manage Post
        </DropdownMenuItem>
      </DropdownMenuContent>
      <ManagePostModal
        isOpen={isOpen}
        onOpenChange={() => setIsOpen(false)}
        post={post}
      />
    </DropdownMenu>
  );
};

export default PostDropdown;
