import AnimatedGrid from "@/components/AnimatedGrid";
import LandingPageClient from "@/components/LandingPageClient";

const LandingPage = () => {
  return (
    <div className="overflow-y-hidden">
      <AnimatedGrid />
      <div className="mx-auto flex h-[100dvh] w-full flex-col items-center justify-center overflow-y-auto px-4 text-center">
        <LandingPageClient />
      </div>
    </div>
  );
};

export default LandingPage;
