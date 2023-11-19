"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { useFilters } from "@/hooks/useFilters";
import { usePathname, useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import { useModal } from "@/hooks/useModal";
import { kobata } from "@/app/fonts";

interface NavbarProps {
  user: User | null;
}

const Navbar = ({ user }: NavbarProps) => {
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);
  const { isOpen, onOpen, onClose } = useFilters();
  const { onOpen: onOpenModal } = useModal();
  const pathname = usePathname();
  const router = useRouter();

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
        "fixed inset-x-0 top-0 z-50 h-20 w-full -translate-y-full border-b border-zinc-800 bg-zinc-900 transition duration-300 hover:opacity-100",
        {
          "translate-y-0": visible,
        },
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-screen-2xl items-center justify-between px-4 opacity-100 md:px-8 xl:px-12">
        <Link
          href="/"
          className={`${kobata.className} flex items-center text-xl text-zinc-100 transition hover:translate-x-1 md:text-2xl`}
        >
          Archive Our Youth
          <span className="ml-2 bg-red-600 px-1 py-0.5 font-sans text-xs">
            BETA
          </span>
        </Link>

        <NavLinks />

        <div className="max-lg:hidden md:items-center md:gap-x-6 lg:flex">
          <button
            className={cn(
              "group relative px-4 py-1 text-lg font-bold tracking-widest text-white transition duration-300 hover:text-black",
            )}
            onClick={() => {
              if (user) {
                router.push("/submit");
              } else {
                onOpenModal("submitAuthModal");
              }
            }}
          >
            <span className="absolute inset-x-0 top-0 h-[50%] origin-bottom-right scale-0 rounded-t-sm bg-white transition duration-200 group-hover:scale-100" />
            <span className="absolute inset-x-0 bottom-0 h-[50%] origin-top-left scale-0 rounded-b-sm bg-white transition duration-200 group-hover:scale-100" />
            <span className="relative">Submit</span>
          </button>
          {user && (
            <div className="rounded-full border-2 border-zinc-700">
              <UserButton afterSignOutUrl="/home" />
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="items-center justify-center gap-3 rounded-md bg-zinc-800 p-2 text-white max-lg:flex lg:hidden">
          {pathname === "/home" && (
            <button
              className={cn("transition", { "text-rose-500": isOpen })}
              onClick={() => {
                if (isOpen) onClose();
                else onOpen();
              }}
            >
              <Search className="h-6 w-6 md:h-6 md:w-6" />
            </button>
          )}
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
