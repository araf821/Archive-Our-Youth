"use client";

import { useState } from "react";
import Link from "next/link";
import { User } from "@prisma/client";
import { MoreVertical } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

import ManageUserModal from "./user/ManageUserModal";

interface UserDropdownProps {
  user: User;
}

const UserDropdown = ({ user }: UserDropdownProps) => {
  const [isManageOpen, setIsManageOpen] = useState(false);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="ml-auto">
          <MoreVertical />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[250px] space-y-1.5 border-2 border-background-surface"
        align="end"
      >
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="focus:ring-none justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background-surface focus-visible:ring-offset-2"
          asChild
        >
          <Link
            href={`users/${user.id}`}
            className="w-full cursor-pointer tracking-widest outline-none"
          >
            More Information
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setIsManageOpen(true)}
          className="focus-visible:ring-ring w-full cursor-pointer justify-center tracking-widest focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          Manage
        </DropdownMenuItem>
      </DropdownMenuContent>
      <ManageUserModal
        open={isManageOpen}
        onOpenChange={() => setIsManageOpen(false)}
        user={user}
      />
    </DropdownMenu>
  );
};

export default UserDropdown;
