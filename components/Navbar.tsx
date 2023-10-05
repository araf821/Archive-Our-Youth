"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import Search from "./Search";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useFilters } from "@/hooks/useFilters";
import { usePathname } from "next/navigation";

interface NavbarProps {
  user: User | null;
}

const Navbar = ({ user }: NavbarProps) => {
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);
  const { isOpen, onOpen, onClose } = useFilters();
  const pathname = usePathname();
  console.log(pathname);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        const currentScrollPos = window.scrollY;

        // The navbar stays visible if the scroll distance from the top is less than 100px
        if (currentScrollPos < 100) {
          setVisible(true);
        } else if (prevScrollPos > currentScrollPos) {
          setVisible(true);
        } else {
          setVisible(false);
        }

        setPrevScrollPos(currentScrollPos);
      }, 50); // debounce delay
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [prevScrollPos]);

  return (
    <div
      className={cn(
        "fixed top-0 z-50 h-[8vh] w-full -translate-y-full border-b border-zinc-800 bg-zinc-900 transition duration-300 hover:opacity-100",
        {
          "translate-y-0": visible,
        },
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-screen-2xl items-center justify-between px-4 opacity-100 md:px-12 lg:px-20 xl:px-32">
        <Link
          href="/"
          className="text-xl font-bold text-zinc-100 transition hover:translate-x-1 md:text-2xl"
        >
          Digital Collage
        </Link>

        <div className="hidden items-center gap-4 text-zinc-50 md:flex">
          {/* <Search /> */}
          {pathname === "/collage" && (
            <button
              onClick={() => {
                if (isOpen) onClose();
                else onOpen();
              }}
            >
              Filters
            </button>
          )}
        </div>

        <div className="max-md:hidden md:flex md:items-center md:gap-x-6">
          {/* <UserButton afterSignOutUrl="/" /> */}
          <Link
            className={cn(
              "rounded-md border border-zinc-200 px-3.5 py-1.5 text-zinc-200 transition hover:bg-zinc-200 hover:text-zinc-900",
            )}
            href={user ? "/submit" : "/sign-in"}
          >
            Submit
          </Link>
          {user && (
            <button
              onClick={() => {}}
              className="relative aspect-square h-10 w-10 rounded-full bg-zinc-600"
            >
              <Image
                src={user.imageUrl || ""}
                alt="user profile picture"
                fill
                className="rounded-full object-cover"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
