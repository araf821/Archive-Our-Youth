"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useFilters } from "@/hooks/useFilters";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Menu, Search } from "lucide-react";

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
    <nav
      className={cn(
        "fixed top-0 z-50 h-[8vh] w-full -translate-y-full border-b border-zinc-800 bg-zinc-900 transition duration-300 hover:opacity-100",
        {
          "translate-y-0": visible,
        },
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-screen-2xl items-center justify-between px-4 opacity-100 md:px-8 xl:px-12">
        <Link
          href="/"
          className="text-xl font-bold text-zinc-100 transition hover:translate-x-1 md:text-2xl"
        >
          Digital Collage
        </Link>

        <div className="flex items-center gap-4 max-lg:hidden">
          <div className="flex items-center gap-1.5 rounded-full border-2 border-zinc-800 bg-zinc-800 p-2 font-karla tracking-wider text-zinc-50">
            <Link
              href={"/collage"}
              className={cn(
                "rounded-l-full rounded-r-[200rem] px-6 py-1 transition hover:bg-rose-300/10",
                {
                  "hover:slide-in- bg-gradient-to-tr from-rose-600 to-red-400 text-black shadow-[0_0_20px_2px] shadow-red-500/40 hover:cursor-default":
                    pathname === "/collage",
                },
              )}
            >
              Home
            </Link>

            <div className="h-7 border-l-[1px] border-zinc-700" />

            <Link
              href={"/about"}
              className={cn(
                "rounded-sm px-6 py-1 transition hover:bg-rose-300/10",
                {
                  "bg-gradient-to-b from-rose-600 to-red-400 text-black shadow-[0_0_20px_2px] shadow-red-500/40 hover:cursor-default hover:bg-rose-500":
                    pathname === "/about",
                },
              )}
            >
              About Us
            </Link>

            <div className="h-7 border-l-[1px] border-zinc-700" />

            <Link
              href={"/contact"}
              className={cn(
                "rounded-sm px-6 py-1 transition hover:bg-rose-300/10",
                {
                  "bg-gradient-to-b from-rose-600 to-red-400 text-black shadow-[0_0_20px_2px] shadow-red-500/40 hover:cursor-default hover:bg-rose-500":
                    pathname === "/contact",
                },
              )}
            >
              Contact
            </Link>

            <div className="h-7 border-l-[1px] border-zinc-700" />

            <Link
              href={"/dashboard"}
              className={cn(
                "rounded-l-[200rem] rounded-r-full  px-6 py-1 transition hover:bg-rose-300/10",
                {
                  "bg-gradient-to-tl from-rose-600 to-red-400 text-black shadow-[0_0_20px_2px] shadow-red-500/40 hover:cursor-default hover:bg-rose-500":
                    pathname === "/dashboard",
                },
              )}
            >
              Dashboard
            </Link>
          </div>
          {pathname === "/collage" && (
            <button
              className="rounded-full bg-zinc-800 p-3 text-white transition hover:bg-zinc-700 max-lg:hidden"
              onClick={() => {
                if (isOpen) onClose();
                else onOpen();
              }}
            >
              <Search className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          )}
        </div>

        <div className="max-lg:hidden md:items-center md:gap-x-6 lg:flex">
          <Link
            className={cn(
              "rounded-md bg-zinc-200 px-4 py-1.5 font-bold tracking-widest text-black transition duration-300 hover:bg-rose-500 hover:shadow-[0_0_20px_2px] hover:shadow-rose-500/40",
            )}
            href={user ? "/submit" : "/sign-in"}
          >
            Submit
          </Link>
          {user && <UserButton afterSignOutUrl="/" />}
        </div>

        {/* Mobile Menu */}
        <div className="items-center justify-center gap-3 rounded-md bg-zinc-800 p-2 text-white max-lg:flex lg:hidden">
          <button
            className={cn("transition", { "text-rose-500": isOpen })}
            onClick={() => {
              if (isOpen) onClose();
              else onOpen();
            }}
          >
            <Search className="h-6 w-6 md:h-6 md:w-6" />
          </button>
          <button className="transition">
            <Menu className="h-6 w-6 md:h-6 md:w-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
