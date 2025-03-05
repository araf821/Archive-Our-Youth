import { User, UserType } from "@prisma/client";

export interface DashboardUser extends User {
  _count: {
    posts: number;
  };
}

export interface DashboardSidebarProps {
  currentUser: DashboardUser;
}

export interface ProfileImageProps {
  imageUrl: string | null;
}

export interface UserInfoProps {
  user: DashboardUser;
}

export interface AdminPortalLinkProps {
  role: UserType;
}
