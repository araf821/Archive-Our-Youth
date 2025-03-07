"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { User } from "@prisma/client";
import { LogOut, User as UserIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";

type Props = {
  user: User;
};

const UserDropdown = ({ user }: Props) => {
  const router = useRouter();
  const { signOut } = useClerk();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          src={user.imageUrl || "/placeholder-image.png"}
          alt="profile"
          width={48}
          height={48}
          className="rounded-full border-2 border-background-surface"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[325px] space-y-2 rounded-3xl border border-background-surface p-4"
      >
        <DropdownMenuItem className="pointer-events-none flex gap-2 bg-transparent">
          <Image
            src={user.imageUrl || "/placeholder-image.png"}
            alt="profile"
            width={56}
            height={56}
            className="rounded-full border-2 border-background-surface"
          />
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-zinc-400">{user.email}</p>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push("/dashboard")}
          className="cursor-pointer p-4 font-medium focus-visible:bg-primary/50"
        >
          <UserIcon className="mr-4" />
          Dashboard
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            signOut(() => router.push("/home"));
          }}
          className="cursor-pointer p-4 font-medium focus-visible:bg-primary/50"
        >
          <LogOut className="mr-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserDropdown;
