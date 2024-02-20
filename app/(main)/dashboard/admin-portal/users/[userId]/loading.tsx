import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="space-y-4 overflow-x-hidden px-4">
      <Skeleton className="h-10 w-24" />
      <Skeleton className="h-6 w-36" />
      <Skeleton className="h-4 w-56" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
    </div>
  );
};
export default loading;
