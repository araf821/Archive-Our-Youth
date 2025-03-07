import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { kobata } from "@/app/fonts";

const colors = [
  "text-[#007190]",
  "text-[#347F75]",
  "text-[#68AEA3]",
  "text-[#C1E9E6]",
  "text-[#F5DEC7]",
  "text-[#FFD9B5]",
  "text-[#FFA573]",
  "text-[#F86641]",
  "text-[#FD7361]",
  "text-[#E1AE82]",
  "text-[#FFC466]",
  "text-[#CDD6CB]",
  "text-[#FD9747]",
  "text-[#1AA5D0]",
  "text-[#69D1E7]",
  "text-[#CDEEF4]",
  "text-[#6ABB7D]",
  "text-[#F8FDE9]",
  "text-[#AED0B0]",
  "text-[#456034]",
  "text-[#F7B545]",
];

const WelcomeText = () => {
  const [randomColors, setRandomColors] = useState(
    colors.map(() => getRandomColor()),
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRandomColors(colors.map(() => getRandomColor()));
    }, 1500);

    return () => clearInterval(intervalId);
  }, []);

  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  return (
    <p
      className={cn(
        "neon-text text-6xl font-semibold uppercase tracking-widest md:text-7xl lg:text-8xl",
        kobata.className,
      )}
    >
      {"WELCOME".split("").map((letter, index) => (
        <span
          key={index}
          className={cn(
            `${randomColors[index]} transition-colors duration-500`,
          )}
        >
          {letter}
        </span>
      ))}
    </p>
  );
};

export default WelcomeText;
