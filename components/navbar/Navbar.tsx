"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
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
import { LanguageSwitcher } from "../LanguageSwitcher";
import { motion, AnimatePresence } from "framer-motion";
import SubmitButton from "./SubmitButton";

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);
  const [scrolledDown, setScrolledDown] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();

  const { isOpen, onOpen, onClose } = useFilters();
  const { onOpen: onOpenModal } = useModal();
  const { onOpen: openMenu } = useMenu();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Update scrolled state for glass effect enhancement
      setScrolledDown(currentScrollPos > 20);

      // Visibility logic with improved threshold
      if (currentScrollPos < 80) {
        setVisible(true);
      } else if (prevScrollPos > currentScrollPos + 5) {
        // Added threshold to prevent flickering
        setVisible(true);
      } else if (currentScrollPos > prevScrollPos + 5) {
        setVisible(false);
      }

      setPrevScrollPos(currentScrollPos);
    };

    // Use requestAnimationFrame for smoother performance
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, [prevScrollPos]);

  return (
    <motion.nav
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: visible ? 0 : -80,
        opacity: visible ? 1 : 0,
      }}
      transition={{
        duration: 0.3,
        ease: [0.1, 0.9, 0.2, 1], // Custom ease for smoother motion
      }}
      className={cn(
        "fixed z-40 h-20 w-full border-b border-border-dark/40 backdrop-blur-md transition-all",
        scrolledDown
          ? "bg-background-muted/85 shadow-lg"
          : "bg-background-muted/60",
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-screen-2xl items-center justify-between px-4 md:px-8 xl:px-12">
        <Link
          href="/"
          className={`${kobata.className} group flex items-center text-lg text-zinc-100 transition-all duration-300 hover:scale-105 md:text-xl`}
        >
          <motion.span>Archive Our Youth</motion.span>
        </Link>

        <NavLinks />

        <div className="max-lg:hidden md:items-center md:gap-x-6 lg:flex">
          <LanguageSwitcher />
          <SubmitButton pathname={pathname} />

          {user ? (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <UserButton
                appearance={{
                  baseTheme: dark,
                  elements: {
                    avatarBox:
                      "hover:scale-110 transition-transform duration-200",
                  },
                }}
              />
            </motion.div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onOpenModal("authModal")}
              className="relative aspect-square w-9 overflow-hidden rounded-full border border-zinc-700/50 shadow-md transition-all duration-300 hover:border-green-500/50 hover:shadow-green-500/20"
            >
              <span className="sr-only">profile picture</span>
              <Image
                fill
                src="/placeholder-image.png"
                alt="avatar"
                className="object-cover"
                sizes="50px"
              />
            </motion.button>
          )}
        </div>

        {/* Mobile menu */}
        <div className="items-center justify-center gap-4 max-lg:flex lg:hidden">
          <AnimatePresence>
            {pathname === "/home" && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "rounded-full bg-gradient-to-r p-2.5 text-white transition-all duration-300 hover:shadow-lg",
                  isOpen
                    ? "from-green-600 to-green-400 shadow-md shadow-green-500/20"
                    : "from-zinc-800 to-zinc-700 hover:shadow-white/10",
                )}
                onClick={() => {
                  if (isOpen) onClose();
                  else onOpen();
                }}
              >
                <span className="sr-only">search</span>
                <Search className="size-5" />
              </motion.button>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => openMenu()}
            className="group relative rounded-full bg-gradient-to-r from-zinc-800 to-zinc-700 p-2.5 transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
          >
            <span className="sr-only">side menu</span>
            <div className="flex size-5 flex-col items-end justify-center gap-1.5">
              <motion.span
                className="h-0.5 origin-right bg-white"
                initial={{ width: "1.25rem" }}
                whileHover={{ width: "0.75rem" }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="h-0.5 origin-right bg-white"
                initial={{ width: "0.75rem" }}
                whileHover={{ width: "1.25rem" }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="h-0.5 origin-right bg-white"
                initial={{ width: "1rem" }}
                whileHover={{ width: "0.75rem" }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
