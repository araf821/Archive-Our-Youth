import localFont from "next/font/local";

export const hanken = localFont({
  src: [
    {
      path: "../fonts/Hanken-Book.ttf",
      weight: "700",
      style: "bold",
    },
    {
      path: "../fonts/Hanken-Light.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});
