"use client";

import { FC } from "react";
import GridItem from "./GridItem";

interface AnimatedGridProps {}

const AnimatedGrid: FC<AnimatedGridProps> = ({}) => {
  const grid = new Array(850).fill("");

  return (
    <div className="absolute left-0 top-0 h-[100dvh] w-full">
      <span className="animate-move1 blur-custom absolute -z-10 h-[10%] w-[10%] md:h-20 md:w-20 lg:h-40 lg:w-40"></span>
      <span className="animate-move2 blur-custom absolute -z-10 h-[10%] w-[10%] md:h-20 md:w-20 lg:h-40 lg:w-40"></span>
      <div className="grid-cols-custom relative grid gap-1">
        {grid.map((item, index) => (
          <GridItem key={index} />
        ))}
      </div>
    </div>
  );
};

export default AnimatedGrid;
