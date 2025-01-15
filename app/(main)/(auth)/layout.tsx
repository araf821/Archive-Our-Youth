import { kobata } from "@/app/fonts";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="relative mx-auto grid min-h-[calc(100dvh-80px)] max-w-screen-xl place-items-center lg:px-8">
      <main className="z-10 flex justify-center backdrop-blur-sm max-lg:flex-col max-lg:items-center lg:flex-row-reverse lg:px-8 lg:py-20">
        <div className="px-8 max-lg:hidden">
          <h2 className={cn("text-xs text-text-secondary md:text-sm")}>
            Welcome to
          </h2>
          <h2
            className={cn(
              "mt-2 text-balance text-4xl text-green-500 [text-shadow:4px_4px_0px_rgb(0_0_0)] sm:text-5xl lg:text-6xl xl:text-7xl",
              kobata.className,
            )}
          >
            Archive Our Youth
          </h2>
          <div className="my-8 h-0.5 w-full bg-gradient-to-r from-green-500 to-transparent" />
          <p className="max-w-lg leading-9 text-green-100 xl:leading-10">
            Welcome to the Archive! Join a youth community dedicated to
            envisioning and building a future focused on youth wellbeing. Sign
            in to contribute your perspectives, explore innovative ideas, and
            collaborate with youth and groups from around the world. Sign up now
            and start sharing your vision!
          </p>
        </div>
        <ClerkLoading>
          <div className="flex aspect-[4/5] max-h-[500px] flex-col justify-center gap-1 rounded-xl border border-zinc-700 bg-background-muted p-8 max-lg:w-full lg:w-[400px]">
            <Skeleton className="h-8 w-60" />
            <Skeleton className="h-4 w-full" />

            <Skeleton className="mt-4 h-12 w-full" />
            <hr className="my-4 border-t-2 border-t-zinc-800" />

            <Skeleton className="h-2 w-20" />
            <Skeleton className="h-12 w-full" />

            <Skeleton className="mt-4 h-2 w-20" />
            <Skeleton className="h-12 w-full" />

            <Skeleton className="mt-4 h-14 w-full" />

            <Skeleton className="h-2 w-16" />
          </div>
        </ClerkLoading>
        <ClerkLoaded>{children}</ClerkLoaded>
      </main>
      <div className="fixed inset-0 bg-gradient-to-b from-background-muted via-green-800/10 to-background"></div>
    </div>
  );
};
export default layout;
