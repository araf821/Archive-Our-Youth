"use client";

import AnimatingImages from "@/components/AnimatingImages";
import Carousel from "@/components/Carousel";
import FadeInContainer from "@/components/FadeInContainer";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  MoveRight,
} from "lucide-react";
import { useState } from "react";

enum STEPS {
  TITLE = 1,
  DESCRIPTION = 2,
  WELCOME = 3,
}

const LandingPage = () => {
  // const [step, setStep] = useState(STEPS.TITLE);

  // let content: React.ReactNode, content2: React.ReactNode;

  // if (step === STEPS.TITLE) {
  //   content = (
  //     <p className="z-10 -mt-12 flex select-none flex-col gap-4 py-8 text-center font-karla text-8xl font-bold tracking-tighter text-white opacity-100 md:text-[10rem]">
  //       Digital
  //       <span>Collage</span>
  //     </p>
  //   );
  // }

  // if (step === STEPS.DESCRIPTION) {
  //   content2 = (
  //     <p className="z-10 -mt-12 text-center font-karla text-6xl font-bold text-white opacity-100 md:text-7xl">
  //       Describing the project
  //     </p>
  //   );
  // }

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

// <div className="relative grid h-screen place-items-center">
//   <AnimatingImages />
//   <AnimatePresence initial={false}>
//     <motion.div
//       initial={{ opacity: 0 }}
//       whileInView={{ opacity: 1, zIndex: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{
//         x: { type: "spring", stiffness: 300, damping: 30 },
//         opacity: { duration: 0.2 },
//       }}
//     >
//       {step === STEPS.TITLE && content}
//       {step === STEPS.DESCRIPTION && content2}
//     </motion.div>
//   </AnimatePresence>
//   <div className="absolute bottom-36 mx-auto flex gap-x-40">
//     <button
//       onClick={() => setStep((step) => step - 1)}
//       className="bottom-40 text-4xl font-bold "
//     >
//       <ArrowLeftCircleIcon className="h-20 w-20 text-white" />
//       {/* <MoveRight className="h-24 w-24 text-white" /> */}
//     </button>
//     <button
//       onClick={() => setStep((step) => step + 1)}
//       className="bottom-40 text-4xl font-bold "
//     >
//       <ArrowRightCircleIcon className="h-20 w-20 text-white" />
//       {/* <MoveRight className="h-24 w-24 text-white" /> */}
//     </button>
//   </div>
// </div>
