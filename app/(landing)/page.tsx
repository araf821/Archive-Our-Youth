"use client";

import AnimatingImages from "@/components/AnimatingImages";
import Carousel from "@/components/Carousel";
import FadeInContainer from "@/components/FadeInContainer";

const LandingPage = () => {
  return (
    <FadeInContainer>
      <AnimatingImages />
      <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
        <Carousel />
      </div>
    </FadeInContainer>
  );
};

export default LandingPage;
