import SignOutButton from "@/components/SignOutButton";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { ShieldCheck } from "lucide-react";
import { redirect, useRouter } from "next/navigation";

const AdminPortalPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role === "MEMBER") {
    redirect("/home");
  }

  return (
    <div className="mx-auto mt-16 max-w-screen-lg px-4">
      <h1 className="flex items-center gap-2 text-3xl font-medium text-green-500 md:text-4xl">
        Admin Portal
        <ShieldCheck className="h-7 w-7 md:h-8 md:w-8" strokeWidth={3} />
      </h1>
      <p className="mt-1 text-zinc-400 max-md:text-sm">
        Manage and moderate the Archive to your heart&apos;s content!
      </p>
      <hr className="mt-2 border-zinc-700" />
      <div className="mt-4 rounded-md border border-green-400 bg-green-400/10 p-2">
        <p className="md:text-lg">
          Currently logged in as{" "}
          <span className="font-semibold">{currentUser.name}</span>. You have
          the <span className="font-semibold">ADMIN</span> role.
        </p>
        <div className="flex gap-1 text-sm text-zinc-400">
          <p>Not {currentUser.name}?</p>
          <SignOutButton />
        </div>
      </div>
    </div>
  );
};
export default AdminPortalPage;
