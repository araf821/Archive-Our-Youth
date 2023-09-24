const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="grid h-[90vh] w-full place-items-center">{children}</main>
  );
};
export default layout;
