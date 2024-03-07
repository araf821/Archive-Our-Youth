import RefreshButton from "@/components/RefreshButton";
import AdminPostList from "../_components/post/AdminPostList";

interface pageProps {
  searchParams: {
    page: string;
  };
}

const page = async ({ searchParams }: pageProps) => {
  return (
    <div className="mb-16 overflow-hidden bg-[#252525] md:rounded-xl">
      <div className="flex items-center justify-between gap-8 pr-4 md:pr-8">
        <div className="w-fit bg-[#2f2f2f] px-4 py-2.5 text-center lg:px-8">
          <p className="font-semibold tracking-wider text-green-500 md:text-lg">
            Manage Posts
          </p>
        </div>
        <RefreshButton />
      </div>
      <hr className="border-[#2f2f2f]" />
      <AdminPostList page={parseInt(searchParams.page || "1")} />
    </div>
  );
};

export default page;
