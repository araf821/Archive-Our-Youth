import { db } from "@/lib/db";
import { cn, formatDateString } from "@/lib/utils";
import Image from "next/image";
import UserDropdown from "./UserDropdown";

interface UserListProps {}

const UserList = async ({}: UserListProps) => {
  const users = await db.user.findMany();

  return (
    <ul className="my-4 space-y-2">
      {users.map((user) => (
        <li
          key={user.id}
          className="grid grid-cols-4 items-center gap-4 bg-[#2f2f2f] px-4 py-3"
        >
          <div className="col-span-2 flex items-center gap-2">
            <div className="relative aspect-square w-12 overflow-hidden rounded-md">
              <Image
                src={user.imageUrl || ""}
                alt="user image"
                fill
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
  );
};

export default UserList;
