import { UserInfoProps } from "@/types/dashboard";
import { dateFormat } from "@/lib/dateFormat";
import EditProfileModal from "../modals/EditProfileModal";
import { Edit2 } from "lucide-react";

const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <div className="flex w-full flex-col gap-1.5 px-2 pb-2">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold tracking-wider md:text-xl">
          {user.name}
        </p>
        <EditProfileModal imageUrl={user.imageUrl || ""} name={user.name}>
          <button title="Edit Profile">
            <span className="sr-only">edit button</span>
            <Edit2 className="size-4 focus:outline-none" />
          </button>
        </EditProfileModal>
      </div>
      <div className="mb-2 text-sm lg:mb-4">
        <p className="text-text-secondary">
          Member Since:{" "}
          {dateFormat(new Date(user.createdAt).toISOString()) || ""}
        </p>
        <p className="text-text-secondary">Posts: {user._count.posts}</p>
      </div>
    </div>
  );
};

export default UserInfo;