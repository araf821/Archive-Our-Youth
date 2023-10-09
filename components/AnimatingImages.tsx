"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1571974599782-87624638275e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2062&q=80",
  "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2106&q=80",
  "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
  "https://images.unsplash.com/photo-1511854005000-f27912f66ade?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
];

const AnimatingImages = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const changeBackgroundImage = () => {
    setIsFadingOut(true);

    setTimeout(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
      setIsFadingOut(false);
    }, 500);
  };

  const imageStyle = {
    opacity: isFadingOut ? 0 : 1,
    transition: "opacity 0.5s ease-in-out",
  };

  useEffect(() => {
    const intervalId = setInterval(changeBackgroundImage, 3000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="absolute h-screen w-screen opacity-75">
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
