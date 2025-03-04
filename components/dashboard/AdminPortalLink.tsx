import { AdminPortalLinkProps } from "@/types/dashboard";
import { UserType } from "@prisma/client";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const AdminPortalLink = ({ role }: AdminPortalLinkProps) => {
  if (role !== UserType.ADMIN) return null;

  return (
    <Link
      href={"/dashboard/admin-portal/stats"}
      className="group flex w-full items-center justify-between gap-1.5 rounded-sm bg-gradient-to-tr from-lime-400 via-emerald-500 to-green-600 px-3 py-1.5 font-semibold tracking-wider text-text-inverted min-[450px]:w-fit lg:w-full"
    >
      Admin Portal
      <ArrowUpRight className="rotate-45 transition group-hover:rotate-0 max-lg:h-5 max-lg:w-5" />
    </Link>
  );
};

export default AdminPortalLink;