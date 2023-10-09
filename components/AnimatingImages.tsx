"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://plus.unsplash.com/premium_photo-1673603988651-99f79e4ae7d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1486666188991-b5be4844c800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1627328187092-8728a60aa1ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1672530928468-c5d6acae764c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
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
    const intervalId = setInterval(changeBackgroundImage, 5000);

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
