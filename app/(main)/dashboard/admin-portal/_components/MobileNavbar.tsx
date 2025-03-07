import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { adminNavItems } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

interface MobileNavbarProps {
  pathname: string;
}

const MobileNavbar = ({ pathname }: MobileNavbarProps) => {
  const dropdownTriggerRef = useRef<HTMLButtonElement | null>(null);
  const [contentWidth, setContentWidth] = useState(
    dropdownTriggerRef.current?.clientWidth || 300,
  );
  const pathLabel = pathname.includes("stats")
    ? "Stats"
    : pathname.includes("users")
      ? "Users"
      : pathname.includes("posts")
        ? "Posts"
        : pathname.includes("comments")
          ? "Comments"
          : pathname.includes("logs")
            ? "Logs"
            : "Select";
  useEffect(() => {
    setContentWidth(dropdownTriggerRef.current?.clientWidth || 300);
  }, [dropdownTriggerRef.current?.clientWidth]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        ref={dropdownTriggerRef}
        className="flex w-full items-center justify-between rounded-2xl border border-green-600 bg-primary/20 p-4 text-left font-medium text-green-200"
      >
        <span>{pathLabel}</span>
        <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        style={{ width: `${contentWidth}px` }}
        className="mt-1 space-y-2 border border-green-600 bg-primary/20 backdrop-blur-md"
      >
        {adminNavItems.map((item) => (
          <DropdownMenuItem
            asChild
            key={item.label}
            className={cn(
              "border border-green-500 bg-primary/30 focus-visible:bg-primary/40",
              {
                "bg-primary-dark focus-visible:bg-primary": pathname.includes(
                  item.label.toLowerCase(),
                ),
              },
            )}
          >
            <Link href={item.pathname}>{item.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileNavbar;
