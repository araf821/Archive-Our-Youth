"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { User } from "@prisma/client";
import Link from "next/link";
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
        className="w-[250px] space-y-1.5 border-2 border-zinc-700"
        align="end"
      >
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="focus:ring-none justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-700 focus-visible:ring-offset-2"
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
          className="w-full cursor-pointer justify-center tracking-widest focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Manage
        </DropdownMenuItem>
      </DropdownMenuContent>
      <ManageUserModal
        open={isManageOpen}
        onOpenChange={setIsManageOpen}
        user={user}
      />
    </DropdownMenu>
  );
};

export default UserDropdown;
