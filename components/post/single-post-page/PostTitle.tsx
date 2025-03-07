import { FC } from "react";
import { MapPin } from "lucide-react";

import { dateFormat } from "@/lib/dateFormat";

interface PostTitleProps {
  title: string;
  createdAt: Date;
  location?: string;
}

const PostTitle: FC<PostTitleProps> = ({ title, createdAt, location }) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="break-words pb-2 text-3xl font-semibold tracking-wide text-zinc-100 sm:text-4xl md:text-5xl">
        {title}
      </p>

      <div className="flex items-center justify-between gap-2">
        <span className="w-fit rounded-md bg-zinc-800 px-1.5 py-0.5 text-sm text-zinc-400">
          {dateFormat(new Date(createdAt).toISOString())}
        </span>
        {location && (
          <span className="flex items-center gap-1 rounded-md bg-zinc-800 px-1.5 py-0.5 text-sm capitalize text-zinc-400">
            <MapPin className="h-3.5 w-3.5" />
            {location}
          </span>
        )}
      </div>
    </div>
  );
};

export default PostTitle;
