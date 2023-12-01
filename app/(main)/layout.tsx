import Navbar from "@/components/navbar/Navbar";
import { getCurrentUser } from "@/lib/getCurrentUser";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <main className="relative flex min-h-[100dvh] flex-col overflow-x-hidden bg-zinc-900">
      <Navbar user={user} />
      <div className="flex-1">{children}</div>
    </main>
  );
}
