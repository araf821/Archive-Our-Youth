import { Suspense } from "react";

import CommentFilters from "../_components/comment/CommentFilters";
import CommentList from "../_components/comment/CommentList";

interface AdminPortalCommentsPageProps {
  searchParams: {
    type?: undefined | "replies" | "deleted";
  };
}

const AdminPortalCommentsPage = async ({
  searchParams,
}: AdminPortalCommentsPageProps) => {
  return (
    <div className="mb-8 overflow-hidden bg-[#252525] md:rounded-xl">
      <div className="w-fit bg-[#2f2f2f] px-4 py-2.5 text-center lg:px-8">
        <p className="font-semibold tracking-wider text-green-500 md:text-lg">
          Manage Comments
        </p>
      </div>
      <hr className="border-[#2f2f2f]" />

      <CommentFilters />

      <Suspense fallback={<CommentList.Skeleton />}>
        <CommentList searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default AdminPortalCommentsPage;
