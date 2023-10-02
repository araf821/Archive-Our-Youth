import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  classNames?: string;
  link?: {
    label: string;
    route: string;
    icon?: LucideIcon;
  };
}

const EmptyState: FC<EmptyStateProps> = ({
  title = "404 NOT FOUND",
  description,
  classNames,
  link,
}) => {
  return (
    <section
      className={cn(
        "grid h-[92vh] w-full place-items-center bg-zinc-900 text-center",
        classNames,
      )}
    >
      <div className="m-4 flex max-w-screen-sm flex-col gap-4 rounded-md border-2 border-zinc-800 px-4 py-8">
        <p className="text-4xl font-bold text-white">{title}</p>
        <p className="text-lg font-light text-zinc-400">{description}</p>
        {link && (
          <Link
            href={link.route}
            className="mx-auto flex w-fit flex-none items-center gap-2 rounded-sm bg-zinc-800 px-3 py-2 text-white transition duration-200 hover:bg-zinc-700"
          >
            {link.label}
            {link.icon && <link.icon size={16} />}
          </Link>
        )}
      </div>
    </section>
  );
};

export default EmptyState;
