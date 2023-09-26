const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="grid h-screen w-full place-items-center bg-zinc-900">
      {children}
    </main>
  );
};
export default layout;
