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
        "grid h-[85dvh] w-full place-items-center bg-zinc-900 px-4 text-center",
        classNames,
      )}
    >
      <div className="m-4 flex w-full max-w-screen-sm flex-col gap-4 rounded-md border-2 border-amber-500 px-4 py-8">
        <p className="text-4xl font-semibold text-amber-500 max-md:text-3xl">
          {title}
        </p>
        {description && (
          <p className="font balance text-amber-500/75 md:text-lg">
            {description}
          </p>
        )}

        {link && (
          <Link
            href={link.route}
            className="mx-auto flex w-fit flex-none items-center gap-2 rounded-sm px-3 py-2 text-white transition duration-200 hover:bg-zinc-800"
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
