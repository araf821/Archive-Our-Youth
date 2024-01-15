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

  return <div>UserMoreInformation</div>;
};

export default UserMoreInformation;
