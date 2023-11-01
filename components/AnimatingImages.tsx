"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export const images = [
  "https://utfs.io/f/16cf66ae-25c4-4bd3-8dec-b79cd388dac9-30qgi1.jpg",
  "https://utfs.io/f/f123e1f1-73a4-42b7-b637-5003cea001a4-1zypu.jpg",
  "https://utfs.io/f/e03dd418-ef3f-4970-b489-9c5e779d1400-1spj8u.png",
  "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
  "https://utfs.io/f/1bbed88a-9f64-4dde-97a6-5f0aa15639a2-jlo1c2.png",
];

const AnimatingImages = () => {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const intervalId = setInterval(changeBackgroundImage, 3500);

    return () => clearInterval(intervalId);
  }, []);

  if (!isMounted) return null;

  function changeBackgroundImage() {
    setIsFadingOut(true);

    setTimeout(() => {
      setCurrentImage((prevIndex) => (prevIndex! + 1) % images.length);
      setIsFadingOut(false);
    }, 300);
  }

  const imageStyle = {
    opacity: isFadingOut ? 0 : 1,
    transition: "opacity 0.3s ease-in-out",
  };

  return (
    <div className="absolute h-[100dvh] w-screen opacity-75">
      <Image
        src={images[currentImage]}
        alt=""
        fill
        style={imageStyle}
        className="object-cover"
      />
    </div>
  );
};

export default AnimatingImages;
