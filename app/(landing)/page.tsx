import AnimatedGrid from "@/components/AnimatedGrid";
import FadeInContainer from "@/components/FadeInContainer";
import LandingPageClient from "@/components/LandingPageClient";

const LandingPage = () => {
  return (
    <FadeInContainer>
      <AnimatedGrid />
      <LandingPageClient />
    </FadeInContainer>
  );
};

export default LandingPage;
