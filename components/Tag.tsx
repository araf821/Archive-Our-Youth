import { cn } from "@/lib/utils";
import { FC } from "react";

interface TagProps {
  tag: string;
  index: number;
  small?: boolean;
}

const Tag: FC<TagProps> = ({ small, tag, index }) => {
  return (
    <li
      key={tag}
      className={cn(
        "text-bold flex w-fit items-center justify-between gap-2 rounded-lg px-3 py-1 text-zinc-900",
        {
          "border-2 border-rose-500 text-rose-500": index === 0,
          "border-2 border-lime-500 text-lime-500": index === 1,
          "border-2 border-sky-500 text-sky-500": index === 2,
          "border-2 border-amber-500 text-amber-500": index === 3,
          "border-2 border-fuchsia-500 text-fuchsia-500": index === 4,
          "border-2 border-teal-400 text-teal-400": index === 5,
          "border-2 border-red-400 text-red-400": index === 6,
          "border-2 border-indigo-400 text-indigo-400": index === 7,
          "border px-2 py-1 text-sm": small,
        },
      )}
    >
      {tag}
    </li>
  );
};

export default Tag;
