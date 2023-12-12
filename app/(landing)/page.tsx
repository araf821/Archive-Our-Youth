import AnimatedGrid from "@/components/AnimatedGrid";
import FadeInContainer from "@/components/FadeInContainer";
import LandingPageClient from "@/components/LandingPageClient";
import Image from "next/image";
import { kobata } from "../fonts";
import FadeInY from "@/components/FadeInY";

const LandingPage = () => {
  return (
    <div>
      <AnimatedGrid />
      <div className="mx-auto overflow-y-hidden flex h-[100dvh] w-full max-w-screen-xl flex-col items-center justify-center px-4 text-center">
        <div className="mt-16 flex flex-1 flex-col items-center justify-center">
          <FadeInY distance={-200}>
            <p
              className={`${kobata.className} neon-text relative select-none pb-8 text-center text-[4.5rem] font-semibold leading-none text-white sm:px-4 md:px-8 md:text-[6rem] lg:text-[7rem]`}
            >
              Archive
              <br className="hidden max-md:block" /> Our
              <br className="hidden max-md:block" /> Youth
            </p>
            <p className="mx-4 rounded-sm px-1.5 py-0.5 text-lg font-medium tracking-wide text-white [text-shadow:0px_0px_2px_black] max-md:text-base">
              Explore our youth&rsquo;s visions and creations for wellbeing.
            </p>
          </FadeInY>
          <LandingPageClient />
        </div>

        {/* Landing page footer */}
        <FadeInY
          distance={100}
          classNames="flex h-fit w-full max-w-3xl items-center justify-center gap-8 overflow-hidden rounded-t-3xl px-4 pb-8 md:pb-16"
        >
          <div className="relative mx-auto aspect-video w-full max-w-[250px]">
            <Image
              src="/ylrl-logo.svg"
              alt="ylrl logo"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 150px, 250px"
            />
          </div>
          <div className="relative mx-auto aspect-video w-full max-w-[250px]">
            <Image
              src="/york-logo.svg"
              alt="york logo"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 150px, 25vw"
            />
          </div>
        </FadeInY>
      </div>
    </div>
  );
};

export default LandingPage;
