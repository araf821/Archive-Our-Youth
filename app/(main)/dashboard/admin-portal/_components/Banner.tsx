"use client";

import SignOutButton from "@/components/SignOutButton";
import { User } from "@prisma/client";
import { X } from "lucide-react";
import { useState } from "react";

interface BannerProps {
  user: User;
}

const Banner = ({ user }: BannerProps) => {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div className="mt-4 flex items-center justify-between gap-2 rounded-md border border-green-400 bg-green-400/10 p-2">
      <div className="flex-1">
        <p className="md:text-lg">
          Currently logged in as{" "}
          <span className="font-semibold">{user.name}</span>. You have the{" "}
          <span className="font-semibold">ADMIN</span> role.
        </p>
        <div className="flex gap-1 text-sm text-zinc-400">
          <p>Not {user.name}?</p>
          <SignOutButton />
        </div>
      </div>
      <button
        onClick={() => setClosed(true)}
        className="self-start text-zinc-400"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};
export default Banner;
