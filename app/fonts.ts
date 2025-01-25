import { Open_Sans } from "next/font/google";
import localFont from "next/font/local";

export const kobata = localFont({
  src: "../fonts/Kobata-Regular.woff",
  variable: "--font-kobata",
});

export const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "300", "700", "800"],
});
