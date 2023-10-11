import { FC } from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/Sheet";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { navLinks } from "./NavLinks";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { SignInButton, SignOutButton, useAuth } from "@clerk/nextjs";
import { toast } from "../ui/useToast";

interface MobileMenuProps {}

const MobileMenu: FC<MobileMenuProps> = ({}) => {
  const pathname = usePathname();
  const { userId } = useAuth();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="">
          <Menu className="h-6 w-6 md:h-6 md:w-6" />
        </button>
      </SheetTrigger>
      <SheetContent
        className="flex h-full flex-col gap-4 bg-zinc-900 p-0"
        side="right"
      >
        <div className="flex items-center justify-between bg-gradient-to-tr from-red-600 to-rose-500 p-6 pb-6 shadow-[0_2px_10px] shadow-red-500/50 md:text-lg">
          <Link
            href="/"
            className="font-karla text-xl font-semibold text-white"
          >
            Digital Archive
          </Link>
          <SheetClose className="text-white">
            <X />
          </SheetClose>
        </div>

        <div className="flex h-full flex-col justify-between rounded-full px-4 pb-4 font-karla tracking-wider text-zinc-50">
          <div
            onClick={() => close()}
            className="flex flex-col items-center gap-4"
          >
            <Link
              href="/submit"
              className="w-full rounded-sm bg-white py-2.5 text-center text-lg font-semibold text-black shadow-md shadow-white/50 transition hover:bg-rose-500 hover:shadow-rose-500/50"
            >
              Submit A Post
            </Link>
            <hr className="w-full border-zinc-800" />
            {navLinks.map((link) => (
              <Link
                key={link.pathname}
                href={link.pathname}
                className={cn(
                  "w-full rounded-sm py-2 text-center text-xl transition hover:bg-rose-300/10",
                  {
                    "bg-gradient-to-tr from-rose-600 to-red-400 text-black shadow-[0_0_20px_2px] shadow-red-500/40 hover:cursor-default":
                      pathname === link.pathname,
                  },
                )}
              >
                <SheetClose className="w-full">{link.label}</SheetClose>
              </Link>
            ))}
          </div>
          {userId ? (
            <button
              onClick={() => toast({ title: "Signed Out" })}
              className="w-full bg-zinc-800 py-3 transition hover:bg-zinc-700"
            >
              <SheetClose className="w-full">
                <SignOutButton />
              </SheetClose>
            </button>
          ) : (
            <button className="w-full bg-zinc-800 py-3 transition hover:bg-zinc-700">
              <SheetClose className="w-full">
                <SignInButton />
              </SheetClose>
            </button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
