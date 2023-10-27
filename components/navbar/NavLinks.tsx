import { useFilters } from "@/hooks/useFilters";
import { cn } from "@/lib/utils";
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
    label: "Contact",
    pathname: "/contact",
  },
  {
    label: "Dashboard",
    pathname: "/dashboard",
  },
];

const NavLinks = ({}) => {
  const { isOpen, onOpen, onClose } = useFilters();
  const pathname = usePathname();

  return (
    <div className="items-center gap-4 max-lg:hidden lg:flex">
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
      {pathname === "/home" && (
        <button
          className={cn(
            "rounded-full bg-zinc-800 p-3 text-white transition hover:bg-zinc-700 active:scale-90 max-lg:hidden",
            {
              "bg-rose-500 shadow-[0_0_15px_2px] shadow-rose-500/50 hover:bg-rose-600":
                isOpen,
            },
          )}
          onClick={() => {
            if (isOpen) onClose();
            else onOpen();
          }}
        >
          <Search className="h-5 w-5 md:h-6 md:w-6" />
        </button>
      )}
    </div>
  );
};

export default NavLinks;
