import AdminPostList from "../_components/post/AdminPostList";
import { Suspense } from "react";

interface pageProps {}

const page = async ({}: pageProps) => {
  return (
    <div className="mb-16 overflow-hidden bg-[#252525] md:rounded-xl">
      <div className="w-fit bg-[#2f2f2f] px-4 py-2.5 text-center lg:px-8">
        <p className="font-semibold tracking-wider text-green-500 md:text-lg">
          Manage Posts
        </p>
      </div>
      <hr className="border-[#2f2f2f]" />
      <Suspense fallback={<AdminPostList.Skeleton />}>
        <AdminPostList />
      </Suspense>
    </div>
  );
};

export default page;
