import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Karla, Nunito, Poppins } from "next/font/google";

import ModalProvider from "@/components/modals/ModalProvider";
import { Toaster } from "sonner";
import SidebarProvider from "@/components/navbar/SidebarProvider";

const nunito = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700", "800"],
});

const karla = Karla({
  subsets: ["latin"],
  weight: ["200", "400", "600", "800"],
  variable: "--font-karla",
});

export const metadata = {
  title: "Archive Our Youth",
  description:
    "Explore a global showcase of written, visual, and vocal artistry on Archive Our Youth. Join creators from around the world as they share their talents. Discover captivating stories, striking visuals, and powerful voices. Welcome to a diverse community of creativity.",
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
          <Toaster richColors />
          <ModalProvider />
          <SidebarProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
