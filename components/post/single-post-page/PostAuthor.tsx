import { FC } from "react";
import Image from "next/image";
import { User } from "@prisma/client";

import { dateFormat } from "@/lib/dateFormat";

import AnonymousPostInfo from "../../AnonymousPostInfo";

interface PostAuthorProps {
  user: User | null;
}

const PostAuthor: FC<PostAuthorProps> = ({ user }) => {
  return (
    <>
      <div className="-my-1 flex gap-2 text-zinc-300 md:text-lg">
        <div className="relative h-14 w-14 shrink-0 rounded-full">
          <Image
            src={user?.imageUrl || "/placeholder-image.png"}
            fill
            alt="author"
            sizes="50px"
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="flex items-center gap-2 font-semibold tracking-wide">
            {user?.name || (
              <>
                Posted Anonymously
                <AnonymousPostInfo />
              </>
            )}
          </p>
          {user ? (
            <p className="text-sm font-normal text-zinc-400 md:text-base">
              Member Since: {dateFormat(new Date(user.createdAt).toISOString())}
            </p>
          ) : null}
        </div>
      </div>
      <hr className="border-border-dark" />
    </>
  );
};

export default PostAuthor;
