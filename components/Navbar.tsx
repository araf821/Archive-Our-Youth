import { Menu, User } from "lucide-react";
import { FC } from "react";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = async ({}) => {
  return (
    <div className="fixed top-0 z-50 flex h-16 w-full items-center justify-between bg-zinc-800 px-2 md:px-8 lg:px-12 xl:px-20">
      <h1 className="rounded-sm bg-rose-400 px-3 py-1 text-xl font-semibold italic">
        Digital Collage
      </h1>
      <div className="flex gap-x-6">
        <div className="rounded-lg bg-rose-500 p-1.5">
          <User className="" />
        </div>
        <div className="rounded-lg bg-rose-500 p-1.5">
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
