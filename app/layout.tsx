import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Karla, Nunito } from "next/font/google";

import ModalProvider from "@/components/modals/ModalProvider";
import { Toaster } from "sonner";
import { hanken } from "./fonts";

const nunito = Nunito({ subsets: ["latin"] });

const karla = Karla({
  subsets: ["latin"],
  weight: ["200", "400", "600", "800"],
  variable: "--font-karla",
});

export const metadata = {
  title: "Digital Archive",
  description:
    "Explore a global showcase of written, visual, and vocal artistry on Digital Archive. Join creators from around the world as they share their talents. Discover captivating stories, striking visuals, and powerful voices. Welcome to a diverse community of creativity.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${hanken.className} bg-zinc-900 ${karla.variable}`}>
          <Toaster richColors />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
