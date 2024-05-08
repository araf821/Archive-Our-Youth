import { kobata } from "@/app/fonts";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="relative mx-auto grid min-h-[calc(100dvh-80px)] max-w-screen-xl place-items-center pb-16 pt-12 md:py-24 lg:px-8">
      <main className="z-10 flex justify-center border-zinc-800 backdrop-blur-sm max-lg:flex-col max-lg:items-center lg:flex-row-reverse lg:rounded-lg lg:border lg:bg-zinc-900/50 lg:px-8 lg:py-20">
        <div className="px-8 max-lg:hidden">
          <h2 className={cn("text-xs text-zinc-400 md:text-sm")}>Welcome to</h2>
          <h2
            className={cn(
              "text-balance mt-2 text-4xl text-green-500 [text-shadow:4px_4px_0px_rgb(0_0_0)] sm:text-5xl lg:text-6xl xl:text-7xl",
              kobata.className,
            )}
          >
            Archive Our Youth
          </h2>
          <div className="my-8 h-0.5 w-full bg-gradient-to-r from-green-500 to-transparent" />
          <p className="max-w-lg leading-9 text-green-50 xl:text-lg xl:leading-10">
            Welcome to Our Archive! Join a youth community dedicated to
            envisioning and building a future focused on youth wellbeing. Sign
            in to contribute your perspectives, explore innovative ideas, and
            collaborate with youth and groups from around the world. Sign up now
            and start sharing your vision!
          </p>
        </div>
        {children}
      </main>
      <div className="fixed inset-0 bg-gradient-to-b from-zinc-900 via-green-800/10 to-zinc-950"></div>
    </div>
  );
};
export default layout;
