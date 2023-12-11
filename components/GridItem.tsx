"use client";

import { useEffect, useState } from "react";

const colors = [
  "bg-[#00294C]",
  "bg-[#007190]",
  "bg-[#347F75]",
  "bg-[#68AEA3]",
  "bg-[#C1E9E6]",
  "bg-[#F5DEC7]",
  "bg-[#FFD9B5]",
  "bg-[#FFA573]",
  "bg-[#F86641]",
  "bg-[#651309]",
  "bg-[#AB1E10]",
  "bg-[#D3232A]",
  "bg-[#DA503E]",
  "bg-[#FD7361]",
  "bg-[#E1AE82]",
  "bg-[#FFC466]",
  "bg-[#CDD6CB]",
  "bg-[#FD9747]",
  "bg-[#1AA5D0]",
  "bg-[#005371]",
  "bg-[#69D1E7]",
  "bg-[#CDEEF4]",
  "bg-[#6ABB7D]",
  "bg-[#2B906D]",
  "bg-[#F8FDE9]",
  "bg-[#AED0B0]",
  "bg-[#456034]",
  "bg-[#456034]",
  "bg-[#F7B545]",
  "bg-[#344860]",
];

const transparentColors = ["bg-transparent", "bg-slate-900/30"];

const GridItem = ({}) => {
  const [isTransparent, setIsTransparent] = useState(Math.random() < 0.9);

  const randomGridColor = Math.floor(Math.random() * colors.length);
  const randomTransparentColor = Math.floor(
    Math.random() * transparentColors.length,
  );

  const [classes, setClasses] = useState(
    isTransparent
      ? transparentColors[randomTransparentColor]
      : colors[randomGridColor],
  );

  useEffect(() => {
    const intervalId = setInterval(
      changeClasses,
      Math.random() * (10000 - 5000 + 1) + 5000,
    );

    return () => clearInterval(intervalId);
  }, []);

  function changeClasses() {
    const shouldBecomeTransparent = Math.random() < 0.9;
    setClasses(
      shouldBecomeTransparent ? "bg-transparent" : colors[randomGridColor],
    );
    setIsTransparent(shouldBecomeTransparent);
  }

  return (
    <div
      className={`aspect-square w-full outline outline-4 outline-zinc-900/50 transition duration-1000 ${classes}`}
    />
  );
};

export default GridItem;
