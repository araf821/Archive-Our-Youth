import { Menu, User } from "lucide-react";
import { FC } from "react";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = async ({}) => {
  return (
    <div className="mx-auto flex h-full w-full max-w-screen-2xl items-center justify-between px-4 md:px-12 lg:px-20 xl:px-32">
      <h1 className="text-2xl font-bold text-zinc-100">Digital Collage</h1>
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
