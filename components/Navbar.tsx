import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Search from "./Search";
import { currentUser } from "@/lib/currentUser";

const Navbar = async ({}) => {
  const session = auth();
  const user = await currentUser();

  return (
    <div className="mx-auto flex h-full w-full max-w-screen-2xl items-center justify-between px-4 md:px-12 lg:px-20 xl:px-32">
      <Link
        href="/"
        className="text-xl font-bold text-zinc-100 transition hover:translate-x-1 md:text-2xl"
      >
        Digital Collage
      </Link>

      <Search />

      <div className="flex gap-x-6">
        <div className="hidden items-center gap-x-4 md:flex">
          {/* <UserButton afterSignOutUrl="/" /> */}
          <Link
            className={cn(
              "rounded-md border border-zinc-200 px-3.5 py-1.5 text-zinc-200 transition hover:bg-zinc-200 hover:text-zinc-900",
            )}
            href={session.userId ? "/submit" : "/sign-in"}
          >
            Submit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
