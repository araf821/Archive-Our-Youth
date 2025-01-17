"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { useFilters } from "@/hooks/useFilters";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import NavLinks from "./NavLinks";
import { useModal } from "@/hooks/useModal";
import { kobata } from "@/app/fonts";
import { useMenu } from "@/hooks/useMenu";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();

  const { isOpen, onOpen, onClose } = useFilters();
  const { onOpen: onOpenModal } = useModal();
  const { onOpen: openMenu } = useMenu();

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
        "z-40 h-20 w-full border-b border-border-dark bg-background-muted shadow-[0_4px_20px_black] transition duration-300 hover:opacity-100",
        {
          "translate-y-0": visible,
        },
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-screen-2xl items-center justify-between px-4 opacity-100 md:px-8 xl:px-12">
        <Link
          href="/"
          className={`${kobata.className} flex items-center text-lg text-zinc-100 transition duration-200 md:text-xl`}
        >
          Archive Our Youth
        </Link>

        <NavLinks />

        <div className="max-lg:hidden md:items-center md:gap-x-6 lg:flex">
          <button
            className={cn(
              "group relative font-medium tracking-wide text-white transition-all duration-300 hover:text-green-500 lg:hover:tracking-widest",
              {
                "text-green-500 hover:text-green-500": pathname === "/submit",
              },
            )}
            onClick={() => {
              if (user) {
                router.push("/submit");
              } else {
                onOpenModal("submitAuthModal");
              }
            }}
          >
            Submit
          </button>
          {user ? (
            // <UserDropdown user={user} />
            <UserButton
              appearance={{
                baseTheme: dark,
              }}
            />
          ) : (
            <button
              onClick={() => onOpenModal("authModal")}
              className="relative aspect-square w-8 overflow-hidden rounded-full"
            >
              <span className="sr-only">profile picture</span>
              <Image
                fill
                src="/placeholder-image.png"
                alt="avatar"
                className="object-cover"
                sizes="50px"
              />
            </button>
          )}
        </div>

        {/* Mobile menu */}
        <div className="items-center justify-center gap-3 rounded-md bg-zinc-800 p-2 text-white max-lg:flex lg:hidden">
          {pathname === "/home" && (
            <button
              className={cn("transition", { "text-green-600": isOpen })}
              onClick={() => {
                if (isOpen) onClose();
                else onOpen();
              }}
            >
              <span className="sr-only">search</span>
              <Search className="size-5" />
            </button>
          )}
          <button onClick={() => openMenu()} className="relative">
            <span className="sr-only">side menu</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-6 fill-white"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM7 12C7 11.4477 7.44772 11 8 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H8C7.44772 13 7 12.5523 7 12ZM13 18C13 17.4477 13.4477 17 14 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H14C13.4477 19 13 18.5523 13 18Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
