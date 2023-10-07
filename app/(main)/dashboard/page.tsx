import UserPostsSection from "@/components/post/UserPostsSection";
import { dateFormat } from "@/lib/dateFormat";
import { db } from "@/lib/db";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import Image from "next/image";

const DashboardPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
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
    return redirectToSignIn();
  }

  return (
    <div className="mx-auto max-w-screen-md space-y-4 px-4 pt-12 text-zinc-100 lg:px-0">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <p className="text-4xl font-semibold md:text-5xl">Dashboard</p>
        <p className="text-zinc-400 max-md:text-sm">Manage your posts</p>
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
          <p className="text-zinc-400">Posts: {currentUser._count.posts}</p>
        </div>
      </div>
      <UserPostsSection userId={currentUser.id} />
      {/* <div className="flex flex-col gap-2 pt-8">
        <p className="text-2xl md:text-3xl">Your Posts</p>
        <hr className="border-zinc-800" />
      </div>
      {currentUser.posts.length < 1 ? (
        <div className="text-zinc-400 md:text-lg">
          <p>Looks like you have not published any posts yet.</p>
          <Link href="/submit" className="text-blue-400">
            Make a new submission
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {currentUser.posts.map((post) => (
            // <CollageItem
            //   key={post.id}
            //   post={{ ...post, user: currentUser }}
            //   currentUser={currentUser}
            // />
            <div
              key={post.id}
              className="flex flex-col gap-4 rounded-sm border border-zinc-700 bg-zinc-800 p-2"
            >
              <div
                className={cn("flex flex-col gap-2 md:gap-4", {
                  "md:flex-row":
                    post.contentType === "VIDEO" ||
                    post.contentType === "IMAGE",
                })}
              >
                {post.contentType === "IMAGE" && (
                  <>
                    <div className="relative aspect-[4/3] w-full md:max-w-[300px]">
                      <Image
                        src={post.postContent}
                        alt="post image"
                        fill
                        className="rounded-sm object-cover"
                      />
                    </div>
                    <DashboardPostInfo post={post} />
                  </>
                )}

                {post.contentType === "TEXT" && (
                  <DashboardPostInfo post={post} />
                )}

                {post.contentType === "VIDEO" && (
                  <>
                    <div className="relative aspect-video max-h-[40vh] w-full rounded-md md:max-w-[300px]">
                      <video
                        src={`${post.postContent}#t=15`}
                        className="h-full w-full "
                      />
                    </div>
                    <DashboardPostInfo post={post} />
                  </>
                )}

                {post.contentType === "AUDIO" && (
                  <>
                    <div className="relative m-2">
                      <audio
                        src={post.postContent}
                        controls
                        className="w-full"
                      />
                    </div>
                    <DashboardPostInfo post={post} />
                  </>
                )}
              </div>
              <hr className="border-zinc-700" />
              <div className="flex items-center justify-between pb-2">
                <button className="flex items-center gap-2 rounded-md px-2 py-1 text-center tracking-wide text-zinc-400 transition hover:bg-red-600 hover:text-white">
                  <Trash className="h-5 w-5" /> Delete Post
                </button>
                <Link
                  href={`/post/${post.slug}`}
                  className="flex items-center gap-2 rounded-md bg-rose-500 px-2 py-1 text-center font-semibold tracking-wide text-zinc-900 transition duration-200 hover:bg-rose-600"
                >
                  View Post
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};
export default DashboardPage;
