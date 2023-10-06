import CollageItem from "@/components/CollageItem";
import Tag from "@/components/Tag";
import { dateFormat } from "@/lib/dateFormat";
import { db } from "@/lib/db";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

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
        <p className="text-4xl font-semibold md:text-5xl">Dashboard</p>
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
              className="flex flex-col gap-4 rounded-sm bg-zinc-800 p-2 pb-2"
            >
              <div className="flex flex-col gap-2 md:flex-row md:gap-4">
                {post.contentType === "IMAGE" && (
                  <div className="relative aspect-square w-full max-w-[300px]">
                    <Image
                      src={post.postContent}
                      alt="post image"
                      fill
                      className="rounded-sm object-cover"
                    />
                  </div>
                )}

                {post.contentType === "TEXT" && (
                  <div className="flex flex-col gap-2">
                    <p className="break-words text-xl md:text-2xl">
                      {post.title}
                    </p>
                    <p className="text-zinc-400">
                      Date Published:{" "}
                      {dateFormat(new Date(post.createdAt).toISOString())}
                    </p>
                    <p className="text-zinc-400">Tags</p>
                    <ul className="">
                      {post.tags.map((tag, index) => {
                        return <Tag key={tag} index={index} tag={tag} />;
                      })}
                    </ul>
                  </div>
                )}
              </div>
              <hr className="border-zinc-700" />
              <div className="flex items-center justify-between">
                <button className="rounded-md px-2 py-1 text-center tracking-wide text-zinc-400 transition hover:bg-red-600 hover:text-white">
                  Delete Post
                </button>
                <button className="rounded-md bg-rose-500 px-2 py-1 text-center font-semibold tracking-wide text-zinc-900 transition hover:bg-rose-600">
                  View Post
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default DashboardPage;
