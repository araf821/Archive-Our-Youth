import CollageItem from "@/components/CollageItem";
import { dateFormat } from "@/lib/dateFormat";
import { db } from "@/lib/db";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import Image from "next/image";

const DashboardPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  console.log(userId);

  const currentUser = await db.user.findUnique({
    where: {
      userId,
    },
    include: {
      posts: true,
    },
  });

  if (!currentUser) {
    return redirectToSignIn();
  }

  return (
    <div className="mx-auto max-w-screen-md space-y-4 px-4 pt-12 text-zinc-100 lg:px-0">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <p className="text-4xl md:text-5xl">Dashboard</p>
        <p className="text-zinc-400 max-md:text-sm">
          Manage your posts and make changes to your profile
        </p>
        <hr className="border-zinc-800" />
      </div>

      <div className="flex gap-4 rounded-md border-2 border-zinc-800 p-2">
        <div className="relative aspect-square overflow-hidden max-md:w-20 md:w-32">
          <Image
            src={currentUser.imageUrl ?? ""}
            alt="user profile picture"
            fill
            className="rounded-md object-cover"
          />
        </div>
        <div className="flex flex-col gap-1.5 ">
          <p className="font-karla text-xl font-semibold tracking-wider md:text-2xl">
            {currentUser.name}
          </p>
          <p className="text-zinc-400">
            Member Since:{" "}
            {dateFormat(new Date(currentUser.createdAt).toISOString())}
          </p>
          <p className="text-zinc-400">Posts: {currentUser.posts.length}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 pt-8">
        <p className="text-4xl md:text-5xl">Your Posts</p>
        <hr className="border-zinc-800" />
      </div>
      {currentUser.posts.length < 5 ? (
        <div className="text-zinc-400 md:text-lg">
          <p>Looks like you have not published any posts yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3">
          {currentUser.posts.map((post) => (
            <CollageItem
              key={post.id}
              post={{ ...post, user: currentUser }}
              currentUser={currentUser}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default DashboardPage;
