import { getCurrentUser } from "@/lib/getCurrentUser";
import { ShieldCheck } from "lucide-react";
import { redirect } from "next/navigation";
import CategorySidebar from "./_components/CategorySidebar";
import { Suspense } from "react";
import Banner from "./_components/Banner";
import { AdminPortalContentSkeleton } from "./home/page";

interface AdminPortalLayoutProps {
  children: React.ReactNode;
}

const AdminPortalLayout = async ({ children }: AdminPortalLayoutProps) => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role === "MEMBER") {
    redirect("/home");
  }

  return (
    <div className="mx-auto mt-16 max-w-screen-lg">
      <div className="px-4">
        {/* Header */}
        <h1 className="flex items-center gap-2 text-3xl font-medium text-green-500 md:text-4xl">
          Admin Portal
          <ShieldCheck className="h-7 w-7 md:h-8 md:w-8" strokeWidth={3} />
        </h1>
        <p className="mt-1 text-zinc-400 max-md:text-sm">
          Manage and moderate the Archive to your heart&apos;s content!
        </p>
        <hr className="mt-2 border-zinc-700 pb-4" />

        {/* Banner */}
        <Banner user={currentUser} />
      </div>

      {/* Content */}
      <section className="mt-6 flex justify-between gap-4 max-md:flex-col md:gap-6 md:px-4">
        <CategorySidebar />
        <div className="flex-1">
          <Suspense fallback={<AdminPortalContentSkeleton />}>
            {children}
          </Suspense>
        </div>
      </section>
    </div>
  );
};

export default AdminPortalLayout;
