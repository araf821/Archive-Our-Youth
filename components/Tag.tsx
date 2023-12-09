import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { FC } from "react";

interface TagProps {
  tag: string;
  index: number;
  small?: boolean;
  onDelete?: (tag: string) => void;
}

const Tag: FC<TagProps> = ({ small, tag, index, onDelete }) => {
  return (
    <li
      key={tag}
      className={cn(
        "text-bold capitalize flex w-fit items-center justify-between gap-2 rounded-lg px-3 py-1 text-zinc-900",
        {
          "border-2 border-green-400 text-green-400": index === 0,
          "border-2 border-rose-400 text-rose-400": index === 1,
          "border-2 border-blue-400 text-blue-400": index === 2,
          "border-2 border-amber-400 text-amber-400": index === 3,
          "border-2 border-fuchsia-400 text-fuchsia-400": index === 4,
          "border-2 border-sky-400 text-sky-400": index === 5,
          "border-2 border-red-400 text-red-400": index === 6,
          "border-2 border-indigo-400 text-indigo-400": index === 7,
          "border px-2 py-1 text-sm": small,
        },
      )}
    >
      {tag}
      {onDelete && (
        <button type="button" onClick={() => onDelete(tag)}>
          <X className="h-4 w-4" />
        </button>
      )}
    </li>
  );
};

export default Tag;
