"use client";

import AnimatingImages from "@/components/AnimatingImages";
import Carousel from "@/components/Carousel";
import FadeInContainer from "@/components/FadeInContainer";

const LandingPage = () => {
  return (
    <FadeInContainer>
      <AnimatingImages />
      <div className="relative flex h-[calc(100dvh)] overflow-hidden items-center justify-center">
        <Carousel />
      </div>
    </FadeInContainer>
  );
};

export default LandingPage;
