"client";

import { useFilters } from "@/hooks/useFilters";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navLinks = [
  {
    label: "Home",
    pathname: "/home",
  },
  {
    label: "About Us",
    pathname: "/about",
  },
  {
    label: "Dashboard",
    pathname: "/dashboard",
  },
];

const NavLinks = () => {
  const { isOpen, onOpen, onClose } = useFilters();
  const pathname = usePathname();

  return (
    <div className="items-center gap-4 max-lg:hidden lg:flex">
      <div className="flex items-center gap-8 tracking-wider text-zinc-50 lg:gap-12 xl:gap-16">
        {navLinks.map((link) => (
          <Link
            key={link.pathname}
            href={link.pathname}
            className={cn("group relative py-1")}
          >
            <span className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-zinc-500 transition duration-300 group-hover:scale-x-100" />
            {pathname === link.pathname && (
              <motion.div
                layoutId="nav-link"
                // style={{ borderRadius: 9999 }}
                className="absolute inset-0 border-b-2 border-white"
                transition={{
                  type: "spring",
                  damping: 15,
                  duration: 0.2,
                }}
              />
            )}
            <span className="relative transition">{link.label}</span>
          </Link>
        ))}
        <button
          className={cn(
            "rounded-full bg-zinc-800 p-3 text-white transition hover:bg-zinc-700 active:scale-90 max-lg:hidden",
            {
              "bg-green-500 shadow-[0_0_15px_2px] shadow-green-500/50 hover:bg-green-600":
                isOpen,
              "scale-0": pathname !== "/home",
            },
          )}
          onClick={() => {
            if (isOpen) onClose();
            else onOpen();
          }}
        >
          <Search className="h-5 w-5 md:h-6 md:w-6" />
        </button>
      </div>
    </div>
  );
};

export default NavLinks;
