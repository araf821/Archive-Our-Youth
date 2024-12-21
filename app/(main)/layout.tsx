import Navbar from "@/components/navbar/Navbar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="repeating-bg relative flex min-h-[100dvh] flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
    </main>
  );
}
