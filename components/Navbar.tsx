"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { useFilters } from "@/hooks/useFilters";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Menu, Search } from "lucide-react";

interface NavbarProps {
  user: User | null;
}

export const navLinks = [
  {
    label: "Home",
    pathname: "/collage",
  },
  {
    label: "About Us",
    pathname: "/about",
  },
  {
    label: "Contact",
    pathname: "/contact",
  },
  {
    label: "Dashboard",
    pathname: "/dashboard",
  },
];

const Navbar = ({ user }: NavbarProps) => {
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);
  const { isOpen, onOpen, onClose } = useFilters();
  const pathname = usePathname();

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
            {navLinks.map((link) => (
              <Link
                key={link.pathname}
                href={link.pathname}
                className={cn(
                  "rounded-sm px-6 py-1 transition first:rounded-l-full first:rounded-r-[200rem] last:rounded-l-[200rem] last:rounded-r-full hover:bg-rose-300/10",
                  {
                    "hover:slide-in- bg-gradient-to-tr from-rose-600 to-red-400 text-black shadow-[0_0_20px_2px] shadow-red-500/40 hover:cursor-default":
                      pathname === link.pathname,
                  },
                )}
              >
                {link.label}
              </Link>
            ))}
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
          {user && <UserButton afterSignOutUrl="/collage" />}
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
