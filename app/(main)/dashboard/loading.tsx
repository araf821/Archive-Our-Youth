import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";

interface loadingProps {}

const loading: FC<loadingProps> = ({}) => {
  return (
    <div className="mx-auto mt-8 flex max-w-screen-md flex-col gap-2 px-4">
      <Skeleton className="h-12 w-60" />
      <hr className="border-zinc-800" />
      <div className="relative flex justify-between rounded-md border border-zinc-800 p-2">
        <div className="flex gap-4">
          <Skeleton className="aspect-square w-16 sm:w-24 md:w-32" />
          <div className="space-y-1">
            <Skeleton className="h-6 w-32 md:h-8" />
            <Skeleton className="h-3 w-40 md:h-5" />
            <Skeleton className="h-2 w-36 md:h-4" />
          </div>
        </div>
        <Skeleton className="absolute right-2 top-2 h-4 w-4 md:h-8 md:w-8" />
      </div>
      <div className="mt-8 flex flex-col gap-4">
        <Skeleton className="h-12 w-full max-w-[275px]" />
        <hr className="border-zinc-800" />

        {/* Posts */}
        <div className="flex w-full gap-2 rounded-sm border border-zinc-800 p-2 max-md:flex-col">
          <Skeleton className="aspect-square w-full md:max-w-[300px]" />
          <hr className="border-zinc-800 md:hidden" />
          <div className="flex w-full flex-col space-y-2 md:justify-between">
            <div className="space-y-2">
              <Skeleton className="h-6 w-full max-w-[400px] md:h-8" />
              <Skeleton className="h-4 w-40 md:h-6" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Skeleton className="aspect-[5/2] h-6 md:h-8" />
              <Skeleton className="aspect-[5/2] h-6 md:h-8" />
              <Skeleton className="aspect-[5/2] h-6 md:h-8" />
              <Skeleton className="aspect-[5/2] h-6 md:h-8" />
              <Skeleton className="aspect-[5/2] h-6 md:h-8" />
              <Skeleton className="aspect-[5/2] h-6 md:h-8" />
            </div>
          </div>
        </div>

        <div className="flex w-full gap-2 rounded-sm border border-zinc-800 p-2 max-md:flex-col">
          <Skeleton className="aspect-square w-full md:max-w-[300px]" />
          <hr className="border-zinc-800 md:hidden" />
          <div className="flex w-full flex-col space-y-2 md:justify-between">
            <div className="space-y-2">
              <Skeleton className="h-6 w-full max-w-[400px] md:h-8" />
              <Skeleton className="h-4 w-40 md:h-6" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Skeleton className="aspect-[5/2] h-6 md:h-8" />
              <Skeleton className="aspect-[5/2] h-6 md:h-8" />
              <Skeleton className="aspect-[5/2] h-6 md:h-8" />
              <Skeleton className="aspect-[5/2] h-6 md:h-8" />
              <Skeleton className="aspect-[5/2] h-6 md:h-8" />
              <Skeleton className="aspect-[5/2] h-6 md:h-8" />
            </div>
          </div>
        </div>

        <div className="flex w-full gap-2 rounded-sm border border-zinc-800 p-2 max-md:flex-col">
          <Skeleton className="aspect-square w-full md:max-w-[300px]" />
          <hr className="border-zinc-800 md:hidden" />
          <div className="flex w-full flex-col space-y-2 md:justify-between">
            <div className="space-y-2">
              <Skeleton className="h-6 w-full max-w-[400px] md:h-8" />
              <Skeleton className="h-4 w-40 md:h-6" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Skeleton className="aspect-[5/2] h-6 md:h-8" />
              <Skeleton className="aspect-[5/2] h-6 md:h-8" />
              <Skeleton className="aspect-[5/2] h-6 md:h-8" />
              <Skeleton className="aspect-[5/2] h-6 md:h-8" />
              <Skeleton className="aspect-[5/2] h-6 md:h-8" />
              <Skeleton className="aspect-[5/2] h-6 md:h-8" />
            </div>
          </div>
        </div>

        <div className="flex w-full gap-2 rounded-sm border border-zinc-800 p-2 max-md:flex-col">
          <Skeleton className="aspect-square w-full md:max-w-[300px]" />
          <hr className="border-zinc-800 md:hidden" />
          <div className="flex w-full flex-col space-y-2 md:justify-between">
            <div className="space-y-2">
              <Skeleton className="h-6 w-full max-w-[400px] md:h-8" />
              <Skeleton className="h-4 w-40 md:h-6" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Skeleton className="aspect-[5/2] h-6 md:h-8" />
              <Skeleton className="aspect-[5/2] h-6 md:h-8" />
              <Skeleton className="aspect-[5/2] h-6 md:h-8" />
              <Skeleton className="aspect-[5/2] h-6 md:h-8" />
              <Skeleton className="aspect-[5/2] h-6 md:h-8" />
              <Skeleton className="aspect-[5/2] h-6 md:h-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default loading;
