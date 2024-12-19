import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import { Metadata } from "next";
import Providers from "@/components/Providers";
import { siteConfig } from "@/lib/config/site";
import { dark } from "@clerk/themes";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Archive Our Youth",
    template: "%s | Archive Our Youth",
  },
  description: siteConfig.description,
  icons: siteConfig.icons,
  metadataBase: new URL("https://archiveouryouth.ca"),
  applicationName: "Archive Our Youth",
  openGraph: siteConfig.openGraph,
  twitter: siteConfig.twitter,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body
          className={`${poppins.className} min-h-[100dvh] bg-zinc-900 antialiased selection:bg-green-500 selection:text-black`}
        >
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
