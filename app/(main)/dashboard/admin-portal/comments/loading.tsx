import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="space-y-4 px-4">
      <Skeleton className="h-14 w-3/4" />
      <div className="flex justify-between gap-4">
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-10 w-1/4" />
      </div>
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
    </div>
  );
};
export default loading;
