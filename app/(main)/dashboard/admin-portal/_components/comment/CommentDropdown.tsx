"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import DeleteCommentModal from "./DeleteCommentModal";

interface CommentDropdownProps {
  id: string;
  userId: string;
  content: string;
  postSlug: string;
  deleted?: boolean;
}

const CommentDropdown = ({
  content,
  id,
  userId,
  postSlug,
  deleted,
}: CommentDropdownProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          className="focus:ring-none justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-700 focus-visible:ring-offset-2"
          asChild
        >
          <Link
            href={`/dashboard/admin-portal/users/${userId}`}
            className="w-full cursor-pointer tracking-widest outline-none"
          >
            View User
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="focus:ring-none justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-700 focus-visible:ring-offset-2"
          asChild
        >
          <Link
            href={`/post/${postSlug}`}
            className="w-full cursor-pointer tracking-widest outline-none"
          >
            View Post
          </Link>
        </DropdownMenuItem>
        {!deleted && (
          <DropdownMenuItem
            onClick={() => setIsModalOpen(true)}
            className="focus:ring-none w-full cursor-pointer justify-center tracking-widest outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-700 focus-visible:ring-offset-2"
          >
            Delete Comment
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
      <DeleteCommentModal
        isOpen={isModalOpen}
        onOpenChange={() => setIsModalOpen(false)}
        comment={{
          id,
          content,
        }}
      />
    </DropdownMenu>
  );
};

export default CommentDropdown;
