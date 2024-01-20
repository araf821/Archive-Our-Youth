import { Suspense } from "react";
import CommentList from "../_components/comment/CommentList";

interface AdminPortalCommentsPageProps {}

const AdminPortalCommentsPage = async ({}: AdminPortalCommentsPageProps) => {
  return (
    <div className="mb-8 overflow-hidden bg-[#252525] md:rounded-xl">
      <div className="w-fit bg-[#2f2f2f] px-4 py-2.5 text-center lg:px-8">
        <p className="font-semibold tracking-wider text-green-500 md:text-lg">
          Manage Comments
        </p>
      </div>
      <hr className="border-[#2f2f2f]" />
      <Suspense fallback={<CommentList.Skeleton />}>
        <CommentList />
      </Suspense>
    </div>
  );
};

export default AdminPortalCommentsPage;
