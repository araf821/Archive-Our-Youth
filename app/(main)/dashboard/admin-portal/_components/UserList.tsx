"use client";

import { cn, formatDateString } from "@/lib/utils";
import Image from "next/image";
import UserDropdown from "./UserDropdown";
import { Skeleton } from "@/components/ui/skeleton";
import Pagination from "./Pagination";
import { useCallback, useEffect, useState } from "react";
import { User } from "@prisma/client";
import { toast } from "sonner";
import { fetchUsers } from "@/actions/admin/fetchUsers";
import { FETCH_USERS_MAX } from "@/lib/constants";
interface UserListProps {
  page?: number;
}

const UserList = ({ page = 1 }: UserListProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetch = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await fetchUsers(
        FETCH_USERS_MAX,
        (page - 1) * FETCH_USERS_MAX,
      );
      setUsers(data.data);
      setHasNextPage(data.hasNextPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error("Could not fetch users at this time.");
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  if (isLoading) {
    return (
      <div className="mt-4 flex flex-col gap-2.5">
        <Skeleton className="h-14 animate-pulse rounded-none bg-[#2f2f2f]" />
        <Skeleton className="h-14 animate-pulse rounded-none bg-[#2f2f2f]" />
        <Skeleton className="h-14 animate-pulse rounded-none bg-[#2f2f2f]" />
        <Skeleton className="h-14 animate-pulse rounded-none bg-[#2f2f2f]" />
        <Skeleton className="h-14 animate-pulse rounded-none bg-[#2f2f2f]" />
        <Skeleton className="h-14 animate-pulse rounded-none bg-[#2f2f2f]" />
        <Skeleton className="h-14 animate-pulse rounded-none bg-[#2f2f2f]" />
        <Skeleton className="h-14 animate-pulse rounded-none bg-[#2f2f2f]" />
        <Skeleton className="h-8 animate-pulse rounded-none bg-[#2f2f2f]" />
      </div>
    );
  }

  return (
    <>
      {!users.length && (
        <div className="flex flex-col gap-2 px-4 pb-4 pt-8 text-center">
          <h3 className="md:text-lg">No Users Found</h3>
          <p className="text-zinc-400 max-md:text-sm">
            If this was unexpected, please contact araf821@my.yorku.ca.
          </p>
        </div>
      )}
      <ul className="my-4 space-y-2">
        {users.map((user) => (
          <li
            key={user.id}
            className="grid grid-cols-4 items-center gap-4 bg-[#2f2f2f] px-4 py-3"
          >
            <div className="col-span-2 flex items-center gap-2">
              <div className="relative aspect-square w-12 overflow-hidden rounded-md">
                <Image
                  src={user.imageUrl || "/placeholder-image.png"}
                  alt="user image"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="">
                <p>{user.name}</p>
                <p className="text-xs text-zinc-400 md:text-sm">
                  Joined{" "}
                  {formatDateString(user.createdAt.toISOString(), {
                    hideTime: true,
                  })}
                </p>
              </div>
            </div>

            <p
              className={cn(
                "text-center text-sm font-semibold tracking-wider max-sm:text-xs",
                user.role === "ADMIN" ? "text-green-500" : "text-blue-500",
              )}
            >
              {user.role}
            </p>

            <UserDropdown user={user} />
          </li>
        ))}
      </ul>
      <Pagination
        page={page}
        hasNextPage={hasNextPage}
        totalPages={totalPages}
      />
    </>
  );
};

export default UserList;

UserList.Skeleton = function UserListSkeleton() {
  return (
    <div className="mt-4 flex flex-col gap-2.5">
      <Skeleton className="h-14 rounded-none bg-[#2f2f2f]" />
      <Skeleton className="h-14 rounded-none bg-[#2f2f2f]" />
      <Skeleton className="h-14 rounded-none bg-[#2f2f2f]" />
      <Skeleton className="h-14 rounded-none bg-[#2f2f2f]" />
      <Skeleton className="h-14 rounded-none bg-[#2f2f2f]" />
      <Skeleton className="h-14 rounded-none bg-[#2f2f2f]" />
      <Skeleton className="h-14 rounded-none bg-[#2f2f2f]" />
      <Skeleton className="h-14 rounded-none bg-[#2f2f2f]" />
      <Skeleton className="h-14 rounded-none bg-[#2f2f2f]" />
    </div>
  );
};
