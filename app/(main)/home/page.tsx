import Collage from "@/components/Collage";
import { initializeUser } from "@/lib/initializeUser";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Showcase | Digital Archive",
};

export default async function Home({
  searchParams,
}: {
  searchParams: { keyword?: string; sortBy?: string };
}) {
  await initializeUser();

  return (
    <div className="relative">
      <Collage keyword={searchParams.keyword} sortBy={searchParams.sortBy} />
    </div>
  );
}
