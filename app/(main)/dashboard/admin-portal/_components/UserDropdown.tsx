"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import MoreInformationModal from "./user/ManageUserModal";
import { User } from "@prisma/client";
import Link from "next/link";

interface UserDropdownProps {
  user: User;
}

const UserDropdown = ({ user }: UserDropdownProps) => {
  // const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="">
          <MoreVertical />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[250px] space-y-1.5 border-2 border-zinc-700"
        align="end"
      >
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="justify-center"
          asChild
        >
          <Link
            href={`users/${user.id}`}
            className="w-full cursor-pointer tracking-widest focus-visible:outline-zinc-500"
          >
            More Information
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="justify-center">
          <button
            onClick={() => setIsManageOpen(true)}
            className="w-full cursor-pointer tracking-widest"
          >
            Manage User
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
      {/* <MoreInformationModal
        user={user}
        open={isMoreInfoOpen}
        onOpenChange={setIsMoreInfoOpen}
      /> */}
    </DropdownMenu>
  );
};

export default UserDropdown;
