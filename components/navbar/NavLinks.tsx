"use client";

import { useFilters } from "@/hooks/useFilters";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
      <div className="flex items-center gap-8 tracking-wider text-zinc-50 lg:gap-12 xl:gap-14">
        {navLinks.map((link) => (
          <Link
            key={link.pathname}
            href={link.pathname}
            className={cn("group relative py-1 text-sm")}
          >
            <span className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-green-800 transition duration-300 group-hover:scale-x-100" />
            {pathname === link.pathname && (
              <motion.div
                layoutId="nav-link"
                className="absolute inset-0 border-b-2 border-green-500"
                transition={{
                  type: "spring",
                  damping: 15,
                  duration: 0.2,
                }}
              />
            )}
            <span className="relative font-medium transition">
              {t(link.label)}
            </span>
          </Link>
        ))}
        <button
          className={cn(
            "-translate-x-4 rounded-xl bg-zinc-800 p-2 text-white transition hover:bg-background-surface active:scale-90 max-lg:hidden",
            {
              "bg-primary shadow-[0_0_15px_2px] shadow-green-500/50 hover:bg-primary-dark":
                isOpen,
              "scale-0": pathname !== "/home",
            },
          )}
          onClick={() => {
            if (isOpen) onClose();
            else onOpen();
          }}
        >
          <span className="sr-only">search button</span>
          <Search className="size-5" />
        </button>
      </div>
    </div>
  );
};

export default NavLinks;
