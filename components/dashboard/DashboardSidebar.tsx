import { DashboardSidebarProps } from "@/types/dashboard";

import AdminPortalLink from "./AdminPortalLink";
import ProfileImage from "./ProfileImage";
import UserInfo from "./UserInfo";

const DashboardSidebar = ({ currentUser }: DashboardSidebarProps) => {
  return (
    <div className="flex h-fit gap-4 rounded-md border-2 border-border-dark/50 p-2 transition duration-300 hover:scale-[1.02] hover:border-border-dark hover:shadow-md hover:shadow-black max-[450px]:flex-col lg:sticky lg:top-8 lg:flex-col">
      <ProfileImage imageUrl={currentUser.imageUrl} />
      <div className="flex w-full flex-col gap-1.5">
        <UserInfo user={currentUser} />
        <AdminPortalLink role={currentUser.role} />
      </div>
    </div>
  );
};

export default DashboardSidebar;
