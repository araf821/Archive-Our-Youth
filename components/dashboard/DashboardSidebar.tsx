import { FC } from "react";
import EditProfileModal from "../modals/EditProfileModal";
import Image from "next/image";
import { dateFormat } from "@/lib/dateFormat";
import Link from "next/link";
import { UserType } from "@prisma/client";
import { ArrowUpRight, Edit2 } from "lucide-react";

interface DashboardSidebarProps {
  currentUser?: any;
}

const DashboardSidebar: FC<DashboardSidebarProps> = ({ currentUser }) => {
  return (
    <div className="morph-lg flex h-fit gap-4 rounded-md border-2 border-zinc-700 p-2 transition duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black max-[450px]:flex-col lg:sticky lg:top-8 lg:flex-col">
      <div className="relative aspect-square w-40 shrink-0 overflow-hidden max-[450px]:w-full min-[450px]:h-40 lg:h-full lg:w-full">
        <Image
          src={
            currentUser.imageUrl ||
            "https://utfs.io/f/611b7606-d2ed-4c74-aaff-7a4d5c66d365-9w6i5v.jpg"
          }
          alt="user profile picture"
          fill
          sizes="(max-width: 1024px) 150px, 300px"
          className="aspect-square w-full rounded-md object-cover"
        />
      </div>
      <div className="flex w-full flex-col gap-1.5 px-2 pb-2">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold tracking-wider md:text-xl">
            {currentUser.name}
          </p>
          <EditProfileModal
            imageUrl={currentUser.imageUrl || ""}
            name={currentUser.name}
            asChild
          >
            <button title="Edit Profile">
              <span className="sr-only">edit button</span>
              <Edit2 className="size-4 focus:outline-none" />
            </button>
          </EditProfileModal>
        </div>
        <div className="mb-2 text-sm lg:mb-4">
          <p className="text-text-secondary">
            Member Since:{" "}
            {dateFormat(new Date(currentUser.createdAt).toISOString()) || ""}
          </p>
          <p className="text-text-secondary">
            Posts: {currentUser._count.posts}
          </p>
        </div>
        {currentUser.role === UserType.ADMIN && (
          <Link
            href={"/dashboard/admin-portal/stats"}
            className="group flex w-full items-center justify-between gap-1.5 rounded-sm bg-gradient-to-tr from-lime-400 via-emerald-500 to-green-600 px-3 py-1.5 font-semibold tracking-wider text-text-inverted min-[450px]:w-fit lg:hidden lg:w-full"
          >
            Admin Portal
            <ArrowUpRight className="rotate-45 transition group-hover:rotate-0 max-lg:h-5 max-lg:w-5" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default DashboardSidebar;
