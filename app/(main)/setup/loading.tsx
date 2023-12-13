import { Loader2 } from "lucide-react";

const loading = () => {
  return (
    <div className="mx-auto flex h-[80dvh] w-full max-w-screen-md items-center justify-center">
      <Loader2 className="animate-spin text-green-500/75 md:h-10 md:w-10" />
    </div>
    // <div className="mx-auto mt-8 max-w-screen-md md:mt-12">

    //   {/* <div className="flex flex-col items-center gap-4">
    //     <Skeleton className="h-4 w-20" />
    //     <Skeleton className="h-10 w-40" />
    //     <Skeleton className="mx-auto flex w-full max-w-sm flex-col items-center gap-4 px-4 py-8">
    //       <Skeleton className="h-6 w-20 bg-zinc-700" />
    //       <Skeleton className="h-32 w-32 bg-zinc-700" />

    //       <div className="w-full space-y-2 self-start">
    //         <Skeleton className="h-6 w-20 bg-zinc-700" />
    //         <Skeleton className="h-10 w-full bg-zinc-700" />
    //       </div>

    //       <Skeleton className="h-8 w-full bg-zinc-600" />
    //     </Skeleton>
    //   </div> */}
    // </div>
  );
};

export default loading;
