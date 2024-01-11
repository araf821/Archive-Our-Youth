import SignOutButton from "@/components/SignOutButton";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { ShieldCheck } from "lucide-react";
import { redirect } from "next/navigation";
import CategorySidebar from "./_components/CategorySidebar";
import PortalContent from "./_components/PortalContent";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface AdminPortalLayoutProps {
  children: React.ReactNode;
}

const AdminPortalLayout = async ({ children }: AdminPortalLayoutProps) => {
  const currentUser = await getCurrentUser();

  // if (!currentUser || currentUser.role === "MEMBER") {
  //   redirect("/home");
  // }

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
        <hr className="mt-2 border-zinc-700" />

        {/* Banner */}
        <div className="mt-4 rounded-md border border-green-400 bg-green-400/10 p-2">
          <p className="md:text-lg">
            Currently logged in as{" "}
            <span className="font-semibold">{currentUser?.name}</span>. You have
            the <span className="font-semibold">ADMIN</span> role.
          </p>
          <div className="flex gap-1 text-sm text-zinc-400">
            <p>Not {currentUser?.name}?</p>
            <SignOutButton />
          </div>
        </div>
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

const AdminPortalContentSkeleton = () => {
  return (
    <div className="w-full space-y-4">
      <div className="flex gap-4">
        <Skeleton className="h-20 w-full md:h-32" />
        <Skeleton className="h-20 w-full md:h-32" />
      </div>
      <Skeleton className="h-20 w-full md:h-32" />
      <Skeleton className="h-20 w-full md:h-32" />
      <Skeleton className="h-20 w-full md:h-32" />
    </div>
  );
};
