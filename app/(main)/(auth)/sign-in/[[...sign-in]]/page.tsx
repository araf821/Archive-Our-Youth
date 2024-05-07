import { kobata } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="flex justify-center gap-8 border-zinc-800 backdrop-blur-sm max-lg:flex-col max-lg:items-center lg:flex-row-reverse lg:rounded-lg lg:border lg:bg-zinc-900/50 lg:px-8 lg:py-20">
      <div className="px-8 max-lg:hidden">
        <h2 className={cn("text-xs text-zinc-400 md:text-sm")}>
          Welcome back to
        </h2>
        <h2
          className={cn(
            "text-balance mt-2 text-4xl text-green-500 [text-shadow:4px_4px_0px_rgb(0_0_0)] sm:text-5xl lg:text-6xl xl:text-7xl",
            kobata.className,
          )}
        >
          Archive Our Youth
        </h2>
        <p className="mt-4 max-w-lg leading-9 text-green-50 lg:mt-8 xl:text-lg xl:leading-10">
          Welcome to Our Archive! Join a youth community dedicated to
          envisioning and building a future focused on youth wellbeing. Sign in
          to contribute your perspectives, explore innovative ideas, and
          collaborate with youth and groups from around the world. Sign up now
          and start sharing your vision!
        </p>
      </div>
      <SignIn />
    </div>
  );
};
export default SignInPage;
