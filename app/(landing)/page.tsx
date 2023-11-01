"use client";

import AnimatingImages from "@/components/AnimatingImages";
import Carousel from "@/components/Carousel";
import FadeInContainer from "@/components/FadeInContainer";

const LandingPage = () => {
  return (
    <FadeInContainer>
      <AnimatingImages />
      <div className="relative grid min-h-[100dvh] place-items-center overflow-hidden">
        <Carousel />
      </div>
    </FadeInContainer>
  );
};

export default LandingPage;
