"use client";

import AnimatedGrid from "@/components/AnimatedGrid";
import AnimatingImages from "@/components/AnimatingImages";
import Carousel from "@/components/Carousel";
import FadeInContainer from "@/components/FadeInContainer";

const LandingPage = () => {
  return (
    <FadeInContainer>
      <div className="relative flex h-[100dvh] items-center justify-center overflow-hidden">
        <AnimatedGrid />
        <Carousel />
      </div>
    </FadeInContainer>
  );
};

export default LandingPage;
