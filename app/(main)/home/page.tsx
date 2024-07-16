import Collage from "@/components/post/Collage";
import { initializeUser } from "@/lib/initializeUser";
import { ContentType } from "@prisma/client";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home({
  searchParams,
}: {
  searchParams: {
    keyword?: string;
    sortBy?: string;
    tags?: string;
    country?: string;
    postType?: ContentType;
    question?: string;
  };
}) {
  await initializeUser();

  return (
    <div className="relative">
      <Suspense fallback={Collage.Skeleton}>
        <Collage
          keyword={searchParams.keyword}
          sortBy={searchParams.sortBy}
          tags={searchParams.tags}
          country={searchParams.country}
          postType={searchParams.postType}
          question={searchParams.question}
        />
      </Suspense>
    </div>
  );
}
