"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { MoreVertical } from "lucide-react";
import Link from "next/link";

interface PostDropdownProps {}

const PostDropdown = ({}: PostDropdownProps) => {
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
            href={`/post/`}
            className="w-full cursor-pointer tracking-widest outline-none"
          >
            View Post
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {}}
          className="w-full cursor-pointer justify-center tracking-widest focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Manage Post
        </DropdownMenuItem>
      </DropdownMenuContent>
      {/* <ManageUserModal
        open={isManageOpen}
        onOpenChange={setIsManageOpen}
        user={user}
      /> */}
    </DropdownMenu>
  );
};

export default PostDropdown;
