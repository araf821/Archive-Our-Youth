import { Suspense } from "react";
import Stats from "../_components/Stats";
import { Skeleton } from "@/components/ui/skeleton";

const AdminStatsPage = () => {
  return (
    <div className="px-4 lg:px-0">
      <h2 className="text-xl font-medium tracking-wide md:text-2xl">
        Stats for Archive Our Youth
      </h2>
      <hr className="border-zinc-700" />
      <Suspense fallback={<AdminPortalContentSkeleton />}>
        <Stats />
      </Suspense>
    </div>
  );
};
export default AdminStatsPage;

export const AdminPortalContentSkeleton = () => {
  return (
    <div className="mt-4 w-full space-y-4">
      <div className="flex gap-4">
        <Skeleton className="h-20 w-full md:h-32" />
        <Skeleton className="h-20 w-full md:h-32" />
      </div>
      <Skeleton className="h-20 w-full md:h-32" />
      <Skeleton className="h-20 w-full md:h-32" />
      <Skeleton className="h-20 w-full md:h-32" />
    </div>
  );
};
