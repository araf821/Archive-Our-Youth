type Props = {
  children: React.ReactNode;
};
const layout = ({ children }: Props) => {
  return (
    <div className="relative mx-auto grid min-h-[calc(100dvh-80px)] max-w-screen-xl place-items-center pb-16 pt-12 md:py-24 lg:px-8">
      <main className="z-10">{children}</main>
      <div className="fixed inset-0 bg-gradient-to-b from-zinc-900 via-green-800/10 to-zinc-950"></div>
    </div>
  );
};
export default layout;
