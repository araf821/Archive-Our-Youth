import { cn } from "@/lib/utils";
import Link from "next/link";

interface PaginationProps {
  className?: string;
  page: number;
  hasNextPage: boolean;
  totalPages: number;
}

const Pagination = ({
  hasNextPage,
  page = 1,
  totalPages,
  className,
}: PaginationProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 bg-[#2f2f2f] font-medium max-md:text-sm",
        className,
      )}
    >
      <Link
        className={cn(
          "px-3.5 py-2.5 transition hover:bg-zinc-800",
          page < 2 && "pointer-events-none opacity-50",
        )}
        href={`?page=${page > 1 ? page - 1 : 1}`}
      >
        Previous
      </Link>
      <p>
        {page} / {totalPages}
      </p>
      <Link
        className={cn(
          "px-3.5 py-2.5 transition hover:bg-zinc-800",
          !hasNextPage && "pointer-events-none opacity-50",
        )}
        href={`?page=${hasNextPage ? page + 1 : page}`}
      >
        Next
      </Link>
    </div>
  );
};

export default Pagination;
