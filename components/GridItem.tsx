"use client";

import { FC, useEffect, useState } from "react";

interface GridItemProps {}

const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-amber-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-zinc-900bg-sky-500",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
  "bg-zinc-900",
];

const GridItem: FC<GridItemProps> = ({}) => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  const [classes, setClasses] = useState(colors[randomIndex]);

  useEffect(() => {
    const intervalId = setInterval(changeClasses, 500);

    return () => clearInterval(intervalId);
  }, []);

  function changeClasses() {
    setClasses(colors[Math.floor(Math.random() * colors.length)]);
  }

  return (
    <div
      onClick={() => {
        alert("clicked");
        setClasses(colors[Math.floor(Math.random() * colors.length)]);
      }}
      className={`aspect-square w-full transition duration-1000 ${classes}`}
    />
  );
};

export default GridItem;
