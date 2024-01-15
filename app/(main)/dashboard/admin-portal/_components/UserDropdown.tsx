"use client";

import { Dialog, DialogTrigger } from "@/components/ui/Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import MoreInformationModal from "./user/MoreInformationModal";

interface UserDropdownProps {}

const UserDropdown = ({}: UserDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false);

  return (
    <DropdownMenu
      modal={false}
      // open={isDropdownOpen}
      // onOpenChange={setIsDropdownOpen}
    >
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
          <button
            onClick={() => setIsMoreInfoOpen(true)}
            className="w-full cursor-pointer tracking-widest focus-visible:outline-zinc-500"
          >
            More Information
          </button>
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
      <MoreInformationModal
        open={isMoreInfoOpen}
        onOpenChange={setIsMoreInfoOpen}
      />
    </DropdownMenu>
  );
};

export default UserDropdown;
