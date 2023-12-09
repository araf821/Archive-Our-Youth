import EditProfileModal from "@/components/modals/EditProfileModal";
import UserPostsSection from "@/components/post/UserPostsSection";
import { dateFormat } from "@/lib/dateFormat";
import { db } from "@/lib/db";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { Metadata } from "next";
import Image from "next/image";
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
    <div className="mx-auto max-w-screen-md space-y-4 px-4 pt-8 text-zinc-100 lg:px-0">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <p className="text-4xl font-medium md:text-5xl">Dashboard</p>
        <hr className="border-zinc-800" />
      </div>

      <div className="flex gap-4 rounded-md border-2 border-zinc-800 p-2">
        <div className="relative my-auto aspect-square w-full overflow-hidden max-md:w-20 md:w-32">
          <Image
            src={
              currentUser.imageUrl ||
              "https://utfs.io/f/611b7606-d2ed-4c74-aaff-7a4d5c66d365-9w6i5v.jpg"
            }
            alt="user profile picture"
            fill
            sizes="150px"
            className="w-full rounded-md object-cover"
          />
        </div>
        <div className="flex w-full flex-col gap-1.5 ">
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
      <UserPostsSection userId={currentUser.id} />
    </div>
  );
};
export default DashboardPage;
