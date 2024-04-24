import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <section className="mx-auto my-8 w-full max-w-screen-md px-6 md:my-12 md:px-12">
      <Skeleton className="h-12 w-1/2" />
      <Skeleton className="mt-2 h-1 w-full" />
      <Skeleton className="mt-6 h-6 w-32" />
      <Skeleton className="mt-2 h-8 w-full" />
      <Skeleton className="mt-6 h-6 w-20" />
      <Skeleton className="mt-2 h-8 w-full" />
      <Skeleton className="mt-6 h-6 w-28" />
      <Skeleton className="mt-2 h-32 w-full" />

      <Skeleton className="mt-6 h-1 w-full" />
      <Skeleton className="mt-2 h-10 w-full" />
    </section>
  );
};
export default loading;
