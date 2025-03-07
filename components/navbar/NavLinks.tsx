"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { useFilters } from "@/hooks/useFilters";

export const navLinks = [
  {
    label: "home",
    pathname: "/home",
  },
  {
    label: "about",
    pathname: "/about",
  },
  {
    label: "contact",
    pathname: "/contact",
  },
  {
    label: "dashboard",
    pathname: "/dashboard",
  },
];

const NavLinks = () => {
  const { isOpen, onOpen, onClose } = useFilters();
  const pathname = usePathname();
  const t = useTranslations("Navigation");

  return (
    <div className="items-center gap-4 max-lg:hidden lg:flex">
      <div className="flex items-center gap-8 tracking-wider text-zinc-50 lg:gap-10 xl:gap-12">
        {navLinks.map((link) => (
          <motion.div
            key={link.pathname}
            whileHover={{ y: -2 }}
            className="relative"
          >
            <Link
              href={link.pathname}
              className={cn(
                "group relative py-2 text-sm font-medium transition-all duration-300",
                pathname === link.pathname
                  ? "text-green-400"
                  : "text-zinc-100 hover:text-green-300",
              )}
            >
              {/* Hover indicator */}
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-gradient-to-r from-green-500 to-green-300"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Active indicator */}
              {pathname === link.pathname && (
                <motion.div
                  layoutId="nav-link"
                  className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-gradient-to-r from-green-500 to-green-300"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}

              <span className="relative">{t(link.label)}</span>
            </Link>
          </motion.div>
        ))}

        {/* Fixed-width container to prevent layout shift */}
        <div className="relative flex w-10 items-center justify-center">
          <AnimatePresence mode="wait">
            {pathname === "/home" && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "absolute rounded-full bg-gradient-to-r p-2.5 text-white transition-all duration-300 hover:shadow-lg",
                  isOpen
                    ? "from-green-600 to-green-400 shadow-md shadow-green-500/20"
                    : "from-zinc-800 to-zinc-700 hover:shadow-white/10",
                )}
                onClick={() => {
                  if (isOpen) onClose();
                  else onOpen();
                }}
              >
                <span className="sr-only">search button</span>
                <Search className="size-5" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default NavLinks;
