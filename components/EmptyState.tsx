import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Button } from "./ui/Button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  classNames?: string;
  link?: {
    label: string;
    route: string;
    icon?: LucideIcon;
  };
  onClick?: {
    label: string;
    action: () => void;
    icon?: LucideIcon;
  };
  image?: string;
}

const EmptyState: FC<EmptyStateProps> = ({
  title = "404 NOT FOUND",
  description,
  classNames,
  link,
  image,
  onClick,
}) => {
  return (
    <section
      className={cn(
        "grid h-[85dvh] w-full place-items-center bg-zinc-900 px-4 text-center",
        classNames,
      )}
    >
      <div className="m-4 flex w-full max-w-screen-sm flex-col gap-4 rounded-md border-2 border-green-500 px-4 py-8">
        {image && (
          <div className="relative mx-auto aspect-square w-full max-w-[200px]">
            <Image
              src={image}
              alt=""
              fill
              className="object-cover mix-blend-lighten"
            />
          </div>
        )}

        <p className="text-4xl font-semibold text-green-500 max-md:text-3xl">
          {title}
        </p>
        {description && (
          <p className="font balance text-green-500/75 md:text-lg">
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

        {onClick && (
          <Button
            onClick={() => onClick.action()}
            className="mx-auto flex w-fit flex-none items-center gap-2 rounded-sm px-3 py-2 text-white transition duration-200 hover:bg-zinc-800"
          >
            {onClick.label}
            {onClick.icon && <onClick.icon size={16} />}
          </Button>
        )}
      </div>
    </section>
  );
};

export default EmptyState;
