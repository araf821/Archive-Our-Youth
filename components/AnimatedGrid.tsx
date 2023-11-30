"use client";

import { FC } from "react";
import GridItem from "./GridItem";

interface AnimatedGridProps {}

const AnimatedGrid: FC<AnimatedGridProps> = ({}) => {
  const grid = Array.from({ length: 850 });

  return (
    <div className="absolute opacity-90 -z-10 inset-0 h-[100dvh] w-full overflow-hidden">
      <span className="animate-move1 blur-custom absolute -z-20 h-[10%] w-[10%] md:h-20 md:w-20 lg:h-40 lg:w-40" />
      <span className="animate-move2 blur-custom absolute -z-20 h-[10%] w-[10%] md:h-20 md:w-20 lg:h-40 lg:w-40" />
      <div className="grid-cols-custom relative grid gap-1">
        {grid.map((item, index) => (
          <GridItem key={index} />
        ))}
      </div>
    </div>
  );
};

export default AnimatedGrid;
