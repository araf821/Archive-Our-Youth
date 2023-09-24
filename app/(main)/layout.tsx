import Navbar from "@/components/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative mt-[8vh] flex flex-col">
      <div className="fixed top-0 z-50 h-[8vh] w-full bg-zinc-800">
        <Navbar />
      </div>
      {children}
    </main>
  );
}
