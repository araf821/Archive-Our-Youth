"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface CategorySidebarProps {}

const CategorySidebar = ({}: CategorySidebarProps) => {
  const pathname = usePathname();

  const router = useRouter();

  return (
    <>
      {/* Mobile */}
      <div className="px-4 md:hidden">Mobile Select Component</div>

      {/* Desktop */}
      <ul className="sticky top-12 h-fit w-[225px] space-y-3 rounded-lg bg-[#252525] p-2.5 text-zinc-300 max-md:hidden">
        <li>
          <button
            onClick={() => router.push("/dashboard/admin-portal/home")}
            className={cn(
              "w-full rounded-lg bg-[#2F2F2F] p-1.5 text-center font-semibold tracking-wider transition hover:text-green-500 lg:text-lg",
              { "text-green-500": pathname.includes("home") },
            )}
          >
            Stats
          </button>
        </li>
        <li>
          <button
            onClick={() => router.push("/dashboard/admin-portal/users")}
            className={cn(
              "w-full rounded-lg bg-[#2F2F2F] p-1.5 text-center font-semibold tracking-wider transition hover:text-green-500 lg:text-lg",
              { "text-green-500": pathname.includes("users") },
            )}
          >
            Users
          </button>
        </li>
        <li>
          <button
            onClick={() => router.push("/dashboard/admin-portal/posts")}
            className={cn(
              "w-full rounded-lg bg-[#2F2F2F] p-1.5 text-center font-semibold tracking-wider transition hover:text-green-500 lg:text-lg",
              { "text-green-500": pathname.includes("posts") },
            )}
          >
            Posts
          </button>
        </li>
        <li>
          <button
            onClick={() => router.push("/dashboard/admin-portal/comments")}
            className={cn(
              "w-full rounded-lg bg-[#2F2F2F] p-1.5 text-center font-semibold tracking-wider transition hover:text-green-500 lg:text-lg",
              { "text-green-500": pathname.includes("comments") },
            )}
          >
            Comments
          </button>
        </li>
        <li>
          <button
            onClick={() => router.push("/dashboard/admin-portal/logs")}
            className={cn(
              "w-full rounded-lg bg-[#2F2F2F] p-1.5 text-center font-semibold tracking-wider transition hover:text-green-500 lg:text-lg",
              { "text-green-500": pathname.includes("logs") },
            )}
          >
            Logs
          </button>
        </li>
      </ul>
    </>
  );
};

export default CategorySidebar;
