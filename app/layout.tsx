import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Karla, Nunito } from "next/font/google";

import ModalProvider from "@/components/modal/ModalProvider";
import { Toaster } from "@/components/ui/Toaster";

const nunito = Nunito({ subsets: ["latin"] });

const karla = Karla({
  subsets: ["latin"],
  weight: ["200", "400", "600", "800"],
  variable: "--font-karla",
});

export const metadata = {
  title: "Digital Collage",
  description:
    "Explore a global showcase of written, visual, and vocal artistry on Digital Collage. Join creators from around the world as they share their talents. Discover captivating stories, striking visuals, and powerful voices. Welcome to a diverse community of creativity.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${nunito.className} bg-zinc-900 ${karla.variable}`}>
          <Toaster />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
