import EditProfileModal from "@/components/modals/EditProfileModal";
import UserPostsSection from "@/components/post/UserPostsSection";
import { dateFormat } from "@/lib/dateFormat";
import { db } from "@/lib/db";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { UserType } from "@prisma/client";
import { ArrowUpRight } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard | Archive Our Youth",
};

const DashboardPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn({ returnBackUrl: "/home" });
  }

  const currentUser = await db.user.findUnique({
    where: {
      userId,
    },
    include: {
      _count: {
        select: {
          posts: true,
        },
      },
    },
  });

  if (!currentUser) {
    return redirect("/home");
  }

  return (
    <div className="relative mx-auto grid max-w-screen-xl grid-cols-1 px-4 pt-8 text-zinc-100 max-lg:space-y-4 lg:grid-cols-6 lg:gap-4 lg:divide-x-2 lg:divide-zinc-800 lg:px-6 xl:gap-8">
      {/* Header */}
      <div className="col-span-1 w-full lg:col-span-2">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 max-md:flex-col md:items-center md:justify-between">
            <p className="text-4xl font-medium md:text-5xl lg:hidden">
              Dashboard
            </p>
            {currentUser.role === UserType.ADMIN && (
              <Link
                href={"/dashboard/admin"}
                className="group flex w-fit items-center gap-1.5 rounded-sm bg-gradient-to-tr from-lime-400 via-emerald-500 to-green-600 px-3 py-1.5 font-semibold tracking-wider text-black lg:hidden"
              >
                Admin Dashboard
                <ArrowUpRight className="rotate-45 transition group-hover:rotate-0 max-lg:h-5 max-lg:w-5" />
              </Link>
            )}
          </div>
          <hr className="border-zinc-700 lg:hidden lg:pb-4" />
        </div>

        <div className="flex h-fit gap-4 rounded-md border-2 border-zinc-800 p-2 transition duration-300 hover:scale-[1.02] hover:border-green-500 hover:shadow-2xl hover:shadow-green-700/30 lg:flex-col">
          <div className="relative aspect-square w-20 overflow-hidden md:w-32 lg:w-full">
            <Image
              src={
                currentUser.imageUrl ||
                "https://utfs.io/f/611b7606-d2ed-4c74-aaff-7a4d5c66d365-9w6i5v.jpg"
              }
              alt="user profile picture"
              fill
              sizes="(max-width: 1024px) 150px, 300px"
              className="aspect-square w-full rounded-md object-cover"
            />
          </div>
          <div className="flex w-full flex-col gap-1.5 lg:pb-2 ">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold tracking-wider sm:text-xl md:text-2xl">
                {currentUser.name}
              </p>
              <EditProfileModal
                imageUrl={currentUser.imageUrl || ""}
                name={currentUser.name}
              />
            </div>
            <p className="text-zinc-400 max-sm:text-sm">
              Member Since:{" "}
              {dateFormat(new Date(currentUser.createdAt).toISOString())}
            </p>
            <p className="text-zinc-400 max-sm:text-sm">
              Posts: {currentUser._count.posts}
            </p>
          </div>
        </div>
      </div>
      <UserPostsSection userId={currentUser.id} />
    </div>
  );
};
export default DashboardPage;
