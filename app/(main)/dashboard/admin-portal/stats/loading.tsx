import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
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
export default loading;
