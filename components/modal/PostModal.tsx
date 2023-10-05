import { Dialog, DialogContent } from "../ui/Dialog";
import { useModal } from "@/hooks/useModal";
import DynamicImage from "../DynamicImage";
import Link from "next/link";
import LikeButton from "../LikeButton";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const PostModal = ({}) => {
  const { onClose, data, type, isOpen } = useModal();
  const { post } = data;
  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!post) {
    return null;
  }

  const isModalOpen = isOpen && type === "postModal";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <div className="px-4">
        <DialogContent className="max-h-[80vh] max-w-screen-md border-none bg-transparent px-4 text-zinc-100 outline-none">
          <div className="h-full max-h-[80vh] w-full overflow-hidden overflow-y-auto rounded-sm bg-[#202020] px-4 py-4 pb-8 md:rounded-md md:p-6">
            {/* <div className="flex h-8 w-full items-center justify-between"> */}
            {/* <Link
                href={`/post/${post.slug}`}
                className="flex cursor-pointer items-center gap-2 text-sm text-zinc-400 transition duration-200 hover:text-zinc-200"
              >
                Expand Post{" "}
                <ExternalLink className="h-4 w-4 -translate-y-0.5" />
              </Link> */}
            {/* <div className="flex">
              <button className="ml-auto" onClick={onClose}>
                <X className="h-5 w-5 cursor-pointer text-zinc-400 transition duration-200 hover:rotate-90 hover:text-zinc-200" />
              </button>
            </div> */}
            {/* </div> */}
            {post.contentType === "IMAGE" && (
              <DynamicImage src={post.postContent} />
            )}

            {post.contentType === "VIDEO" && (
              <div className="relative my-4 aspect-video w-full overflow-hidden">
                <video
                  src={post.postContent}
                  className="h-full w-full"
                  controls
                />
              </div>
            )}

            {post.contentType === "AUDIO" && (
              <div className="relative my-4 w-full overflow-hidden">
                <audio
                  src={post.postContent}
                  controls
                  className="w-full py-0.5"
                />
              </div>
            )}

            <div className="flex w-full items-center justify-between rounded-md bg-zinc-800 px-2 py-1.5">
              <LikeButton
                postId={post.id}
                likes={post.likes}
                currentUser={data.currentUser}
                modal={true}
              />

              {/* <div className="flex items-center gap-2 text-zinc-300 md:text-lg"> */}
              {/* <div className="relative h-10 w-10 rounded-full">
                  <Image
                    src={post.user.imageUrl ?? ""}
                    fill
                    alt=""
                    className="rounded-full object-cover"
                  />
                </div> */}
              <p className="text-zinc-400">Posted by {post.user.name}</p>
              {/* </div> */}
            </div>

            <p className="mt-2 break-words font-karla text-3xl font-semibold tracking-wide text-zinc-100 sm:text-4xl md:text-5xl ">
              {post.title}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => onClose()}
                className="w-32 rounded-md bg-zinc-800 px-2.5 py-1.5 text-white transition hover:bg-zinc-700"
              >
                Back
              </button>
              <Link
                href={`/post/${post.slug}`}
                className="w-32 rounded-md bg-rose-600 px-2.5 py-1.5 text-center font-bold text-white transition duration-300 hover:bg-rose-700 hover:shadow-[0_0_15px_8px] hover:shadow-red-500/10"
              >
                View Post
              </Link>
            </div>

            {/* Post info */}
            {/* <div className="mt-4 flex flex-col gap-4"> */}
            {/* <span className="-mb-3 w-fit rounded-md bg-zinc-700 px-1.5 py-0.5 text-sm text-zinc-300">
                {dateFormat(new Date(post.createdAt).toISOString())}
              </span> */}
            {/* <p className="break-words font-karla text-3xl font-semibold tracking-wide text-zinc-100 sm:text-4xl md:text-5xl ">
                {post.title}
              </p> */}
            {/* <ul className="flex flex-wrap gap-2 pt-2">
                {post.tags.map((tag, index) => (
                  <li
                    key={tag}
                    className={cn(
                      "text-bold flex items-center justify-between gap-2 rounded-lg px-3 py-1 text-zinc-900",
                      {
                        "border-2 border-rose-500 text-rose-500": index === 0,
                        "border-2 border-lime-500 text-lime-500": index === 1,
                        "border-2 border-sky-500 text-sky-500": index === 2,
                        "border-2 border-amber-500 text-amber-500": index === 3,
                        "border-2 border-fuchsia-500 text-fuchsia-500":
                          index === 4,
                        "border-2 border-teal-400 text-teal-400": index === 5,
                        "border-2 border-red-400 text-red-400": index === 6,
                        "border-2 border-indigo-400 text-indigo-400":
                          index === 7,
                      },
                    )}
                  >
                    {tag}
                  </li>
                ))}
              </ul> */}
            {/* <div className="flex gap-4">
                <LikeButton
                  postId={post.id}
                  likes={post.likes}
                  currentUser={data.currentUser}
                />
                <ShareButton link={`/post/${post.slug}`} />
              </div> */}
            {/* <hr className="border-zinc-700" />
              <div className="flex items-center gap-2 text-zinc-300 md:text-lg">
                <div className="relative h-10 w-10 rounded-full">
                  <Image
                    src={post.user.imageUrl ?? ""}
                    fill
                    alt=""
                    className="rounded-full object-cover"
                  />
                </div>
                <p>Posted by {post.user.name}</p>
              </div>
              <hr className="border-zinc-700" />
              <div
                className={`${
                  post.contentType !== "TEXT" && !post.description && "hidden"
                }`}
              >
                {post.contentType !== "TEXT" && (
                  <p className="mb-4 text-sm font-semibold text-zinc-400">
                    DESCRIPTION
                  </p>
                )}
                <ReactMarkdown className="prose-headings:font-josefin prose mb-8 h-full max-w-full overflow-y-auto break-words rounded-md bg-zinc-100 p-2.5 text-start text-zinc-800 prose-headings:font-semibold prose-headings:text-zinc-950 prose-h1:m-0 prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-code:whitespace-pre-wrap prose-img:rounded-md">
                  {post.contentType === "TEXT"
                    ? post.postContent
                    : post.description}
                </ReactMarkdown>
                <hr className="border-zinc-700" />
              </div>
              {/* Comment Section */}
            {/* <div className="text-zinc-400 md:text-lg">
                View more posts from{" "}
                <Link
                  href={`/users/${post.userId}`}
                  className="font-bold text-rose-400"
                >
                  {post.user.name}
                </Link>
              </div>

              <hr className="border-zinc-700" />

              <div className="font-bold md:text-lg">
                Comments <span className="text-zinc-400">[Coming Soon]</span>
              </div> */}
            {/* </div> */}
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default PostModal;
