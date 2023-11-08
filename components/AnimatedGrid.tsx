"use client";

import { FC } from "react";
import GridItem from "./GridItem";

interface AnimatedGridProps {}

const AnimatedGrid: FC<AnimatedGridProps> = ({}) => {
  const grid = new Array(500).fill("");

  return (
    <div className="absolute left-0 top-0 w-full">
      <div className="grid-cols-custom relative grid gap-1 border border-zinc-700">
        {/* <div className="animate-move -z-10 h-40 w-40 rounded-full bg-red-500 blur-3xl"></div> */}
        {grid.map((item, index) => (
          <GridItem key={index} />
        ))}
      </div>
    </div>
  );
};

export default AnimatedGrid;
