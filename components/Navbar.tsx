"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import Search from "./Search";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface NavbarProps {
  user: User | null;
}

const Navbar = ({ user }: NavbarProps) => {
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);

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
      }, 300); // debounce delay
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
        "fixed top-0 z-50 h-[8vh] w-full bg-zinc-800 opacity-40 transition duration-300 hover:opacity-100",
        {
          "opacity-100": visible,
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

        <Search />

        <div className="hidden items-center gap-x-6 md:flex">
          {/* <UserButton afterSignOutUrl="/" /> */}
          <Link
            className={cn(
              "rounded-md border border-zinc-200 px-3.5 py-1.5 text-zinc-200 transition hover:bg-zinc-200 hover:text-zinc-900",
            )}
            href={user ? "/submit" : "/sign-in"}
          >
            Submit
          </Link>
          <button
            onClick={() => {}}
            className="relative aspect-square h-10 w-10 rounded-full bg-zinc-600"
          >
            <Image
              src={user?.imageUrl ?? ""}
              alt="user profile picture"
              fill
              className="rounded-full object-cover"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
