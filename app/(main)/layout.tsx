import Navbar from "@/components/Navbar";
import { getCurrentUser } from "@/lib/getCurrentUser";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <main className="relative mt-[8vh] flex flex-col bg-zinc-900">
      <Navbar user={user} />
      <div className="min-h-[92vh]">{children}</div>
    </main>
  );
}
