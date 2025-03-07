import { FC } from "react";

import { Skeleton } from "@/components/ui/skeleton";

interface loadingProps {}

const loading: FC<loadingProps> = ({}) => {
  return (
    <div className="mx-auto grid h-[80dvh] max-w-screen-md place-items-center px-4">
      <div className="flex w-full flex-col gap-8">
        <Skeleton className="h-16 w-full md:w-[75%]" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-full md:h-6" />
          <Skeleton className="h-4 w-full md:h-6" />
          <Skeleton className="h-4 w-full md:h-6 md:max-w-[75%]" />
        </div>

        <div className="space-y-1">
          <Skeleton className="h-4 w-full md:h-6" />
          <Skeleton className="h-4 w-full md:h-6" />
          <Skeleton className="h-4 w-full md:h-6" />
          <Skeleton className="h-4 w-full md:h-6" />
          <Skeleton className="h-4 w-full md:h-6 md:max-w-[45%]" />
        </div>

        <Skeleton className="h-12 w-40" />
        <hr className="border-border-dark" />
        <Skeleton className="h-3 w-full md:h-5 md:max-w-[400px]" />
      </div>
    </div>
  );
};

export default loading;
