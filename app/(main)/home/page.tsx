import Collage from "@/components/Collage";
import { initializeUser } from "@/lib/initializeUser";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Archive | Archive Our Youth",
};

export default async function Home({
  searchParams,
}: {
  searchParams: { keyword?: string; sortBy?: string; tags?: string[] };
}) {
  await initializeUser();

  return (
    <div className="relative pt-20">
      <Collage
        keyword={searchParams.keyword}
        sortBy={searchParams.sortBy}
        tags={searchParams.tags}
      />
    </div>
  );
}
