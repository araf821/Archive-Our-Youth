import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="mx-auto mt-8 flex max-w-screen-md flex-col gap-4 px-4 md:mt-12">
      <Skeleton className="h-10 w-72" />
      <div className="w-full space-y-2">
        <Skeleton className="h-6 w-[100%]" />
        <Skeleton className="h-6 w-[94%]" />
        <Skeleton className="h-6 w-[96%]" />
        <Skeleton className="h-6 w-[80%]" />
        <Skeleton className="h-6 w-[54%]" />
        <Skeleton className="mt-2 h-6 w-[85%]" />
        <Skeleton className="h-6 w-[95%]" />
        <Skeleton className="h-6 w-[90%]" />
        <Skeleton className="h-6 w-[100%]" />
        <Skeleton className="h-6 w-[75%]" />
      </div>

      <Skeleton className="mt-8 h-10 w-72" />
      <div className="w-full space-y-2">
        <Skeleton className="h-6 w-[100%]" />
        <Skeleton className="h-6 w-[94%]" />
        <Skeleton className="h-6 w-[96%]" />
        <Skeleton className="h-6 w-[80%]" />
        <Skeleton className="h-6 w-[54%]" />
        <Skeleton className="mt-2 h-6 w-[85%]" />
        <Skeleton className="h-6 w-[95%]" />
        <Skeleton className="h-6 w-[90%]" />
        <Skeleton className="h-6 w-[100%]" />
        <Skeleton className="h-6 w-[75%]" />
      </div>
    </div>
  );
};
export default loading;
