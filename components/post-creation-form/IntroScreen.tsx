import Link from "next/link";
import { Sparkles } from "lucide-react";

export const IntroScreen = () => {
  return (
    <div className="animate-fade-in flex w-full flex-col gap-8">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Sparkles className="size-6 text-secondary md:size-7" />
          <h1 className="text-2xl font-bold tracking-tight max-md:text-xl">
            Create New Post
          </h1>
        </div>
        <p className="text-text-secondary max-md:text-sm">
          Share your vision for a better future
        </p>
      </div>

      <hr className="border-t-2" />

      <div className="space-y-6 text-text-secondary">
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-text-primary max-md:text-base">
            Welcome to Archive Our Youth!
          </h2>
          <p className="leading-relaxed">
            You’re invited to add to our Youth and Planetary Wellbeing Archive:
            a time capsule of dream futures, perspectives, and resources (both
            real and desired). We welcome all kinds of multi-media posts, and
            we’re excited to see what you upload!
          </p>
          <p className="leading-relaxed">
            To learn more about the Archive and our research partners in Chile,
            Costa Rica, and Belize, visit{" "}
            <Link
              href="/about"
              className="font-medium text-secondary underline underline-offset-4 transition-colors hover:text-secondary/80"
            >
              About Us
            </Link>
            .
          </p>
          <p className="font-medium">Xoxo</p>
          <p>- The Canadian Youth Advisory Committee (YAC)</p>
        </div>
      </div>

      <hr className="border-t-2 border-border" />
    </div>
  );
};
