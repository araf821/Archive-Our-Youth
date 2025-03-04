import { UserType } from "@prisma/client";

export interface User {
  name: string;
  imageUrl: string;
  createdAt: string;
  role: UserType;
  _count: {
    posts: number;
  };
}

export interface DashboardSidebarProps {
  currentUser: User;
}

export interface ProfileImageProps {
  imageUrl: string;
}

export interface UserInfoProps {
  user: User;
}

export interface AdminPortalLinkProps {
  role: UserType;
}