import { db } from "@/lib/db";
import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import CommentDropdown from "./CommentDropdown";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface CommentListProps {}

const CommentList = async ({}: CommentListProps) => {
  const comments = await db.comment.findMany({
    where: {
      isReply: false,
      deleted: false,
    },
    include: {
      user: true,
      post: true,
    },
  });

  return (
    <ul className="my-2.5 flex flex-col gap-2.5">
      <li className="bg-[#2f2f2f] p-4">
        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="relative aspect-square w-12 overflow-hidden rounded-md">
              <Image
                src={comments[0].user.imageUrl || "/placeholder-image.png"}
                alt="user image"
                fill
                className="object-cover"
              />
            </div>
            <div className="">
              <p>{comments[0].user.name}</p>
              <p className="text-xs text-zinc-400 md:text-sm">
                Commented on{" "}
                {formatDateString(comments[0].createdAt.toISOString(), {
                  hideTime: true,
                })}
              </p>
            </div>
          </div>

          <CommentDropdown />
        </div>

        <p className="mt-2.5 flex items-center gap-1 text-sm text-zinc-400 md:text-base">
          Post:
          <Link
            className="flex items-center gap-1 font-medium tracking-wider text-zinc-200"
            href={""}
          >
            {comments[0].post.title}
            <ExternalLink className="h-4 w-4" />
          </Link>
        </p>

        <div className="mt-4 whitespace-pre-line bg-[#212121] p-2 max-md:text-sm md:p-3">
          {comments[0].content}
        </div>
      </li>
    </ul>
  );
};

export default CommentList;
