import { ShieldCheck } from "lucide-react";
import CategorySidebar from "./_components/CategorySidebar";

interface AdminPortalLayoutProps {
  children: React.ReactNode;
}

const AdminPortalLayout = async ({ children }: AdminPortalLayoutProps) => {
  return (
    <div className="mx-auto mt-8 max-w-screen-lg md:mt-12 lg:mt-16">
      <div className="px-4">
        {/* Header */}
        <h1 className="flex items-center gap-2 text-3xl font-medium text-green-500 md:text-4xl">
          Admin Portal
          <ShieldCheck className="h-7 w-7 md:h-8 md:w-8" strokeWidth={3} />
        </h1>
        <p className="mt-1 text-zinc-400 max-md:text-sm">
          Manage and moderate the Archive to your heart&apos;s content!
        </p>
        <hr className="mt-2 border-background-surface" />
      </div>

      {/* Content */}
      <section className="mt-4 flex justify-between gap-4 max-md:flex-col md:gap-6 md:px-4">
        <CategorySidebar />
        <div className="flex-1">{children}</div>
      </section>
    </div>
  );
};

export default AdminPortalLayout;
