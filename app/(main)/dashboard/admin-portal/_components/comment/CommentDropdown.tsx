"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { MoreVertical } from "lucide-react";
import Link from "next/link";

interface CommentDropdownProps {}

const CommentDropdown = ({}: CommentDropdownProps) => {
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
            href={``}
            className="w-full cursor-pointer tracking-widest outline-none"
          >
            More Information
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CommentDropdown;
