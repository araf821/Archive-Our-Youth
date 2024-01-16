import { Skeleton } from "@/components/ui/skeleton";
import { dateFormat } from "@/lib/dateFormat";
import { db } from "@/lib/db";

interface UserMoreInformationProps {
  userId: string;
}

const UserMoreInformation = async ({ userId }: UserMoreInformationProps) => {
  let user;
  try {
    user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    user = null;
  }

  if (!user) {
    return (
      <div className="mt-4 space-y-2">
        <p className="text-zinc-400 md:text-lg">
          Could not find an user with the given ID.
        </p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="space-y-1">
        <h3 className="text-xl font-medium md:text-2xl">
          More Information on user.name
        </h3>
        <p className="text-zinc-400 max-md:text-sm">
          View the latest activity from this user.
        </p>
        <hr className="border-zinc-700" />
      </div>
      <div className="mt-6 flex flex-col gap-2.5 divide-y-2 divide-zinc-700">
        <div className="flex items-center justify-between gap-8">
          <p className="self-start tracking-wider text-zinc-400 max-md:text-sm">
            Name
          </p>
          <p className="font-medium tracking-wide text-white">NameOfTheUser</p>
        </div>

        <div className="flex items-center justify-between gap-8 pt-2.5">
          <p className="self-start tracking-wider text-zinc-400 max-md:text-sm">
            Role
          </p>
          <p className="font-medium tracking-wide text-white">{user.role}</p>
        </div>

        <div className="flex items-center justify-between gap-8 pt-2.5">
          <p className="self-start tracking-wider text-zinc-400 max-md:text-sm">
            Joined
          </p>
          <p className="font-medium tracking-wide text-white">
            {dateFormat(user.createdAt.toISOString())}
          </p>
        </div>

        <div className="flex items-center justify-between gap-8 pt-2.5">
          <p className="self-start tracking-wider text-zinc-400 max-md:text-sm">
            Email
          </p>
          <p className="font-medium tracking-wide text-white">
            useremail@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserMoreInformation;

UserMoreInformation.Skeleton = function UserInfoSkeleton() {
  return (
    <div className="mt-6 flex flex-col gap-2.5">
      <Skeleton className="h-8 w-[60%] max-md:w-full" />
      <Skeleton className="h-2 w-[40%] max-md:w-[80%]" />
      <Skeleton className="mt-4 h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
  );
};
