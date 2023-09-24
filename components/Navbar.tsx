import { Menu } from "lucide-react";
import { buttonVariants } from "./ui/Button";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";

interface NavbarProps {}

const Navbar = ({}) => {
  const session = auth();

  console.log(session.user);

  return (
    <div className="mx-auto flex h-full w-full max-w-screen-2xl items-center justify-between px-4 md:px-12 lg:px-20 xl:px-32">
      <Link
        href="/"
        className="text-2xl font-bold text-zinc-100 transition hover:scale-110"
      >
        Digital Collage
      </Link>
      <div className="flex gap-x-6">
        <div className="rounded-lg">
          {session.user ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Link className={buttonVariants()} href="/sign-in">
              Sign In
            </Link>
          )}
        </div>
        <Menu className="my-auto h-8 w-8 cursor-pointer rounded-sm bg-rose-400 p-1 transition hover:bg-rose-500" />
      </div>
    </div>
  );
};

export default Navbar;
