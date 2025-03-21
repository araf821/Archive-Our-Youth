import { Suspense } from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import UserPostsSection from "@/components/post/UserPostsSection";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DashboardPage = async ({
  searchParams,
}: {
  searchParams: { page?: string };
}) => {
  const user = await currentUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const dbUser = await db.user.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      _count: {
        select: {
          posts: true,
        },
      },
    },
  });

  if (!dbUser?.id) {
    return redirect("/home");
  }

  return (
    <div className="relative mx-auto grid max-w-screen-xl grid-cols-1 px-4 pt-8 text-zinc-100 max-lg:space-y-4 lg:grid-cols-4 lg:gap-4 lg:px-6 lg:pt-12 xl:gap-8">
      {/* Header */}
      <div className="col-span-1">
        <p className="text-4xl font-medium md:text-5xl lg:hidden">Dashboard</p>
        <hr className="mb-4 mt-2 border-background-surface lg:hidden" />

        <DashboardSidebar currentUser={dbUser} />
      </div>

      {/* Posts */}
      <Suspense fallback={<UserPostsSection.Skeleton />}>
        <UserPostsSection
          userId={dbUser.id}
          page={parseInt(searchParams.page ?? "1")}
        />
      </Suspense>
    </div>
  );
};
export default DashboardPage;
