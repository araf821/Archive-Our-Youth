import BackButton from "@/components/BackButton";
import React, { Suspense } from "react";
import UserMoreInformation from "../../_components/user/UserMoreInformation";
import PostList from "../../_components/user/PostList";
import CommentList from "../../_components/user/CommentList";

interface SingleUserPageProps {
  params: {
    userId: string;
  };
}

const SingleUserPage = ({ params }: SingleUserPageProps) => {
  return (
    <div className="px-4 pb-12">
      <BackButton classNames="morph-none bg-[#252525]" />
      <Suspense fallback={<UserMoreInformation.Skeleton />}>
        <UserMoreInformation userId={params.userId} />
      </Suspense>
      <Suspense fallback={<PostList.Skeleton />}>
        <PostList userId={params.userId} />
      </Suspense>

      <CommentList userId={params.userId} />
    </div>
  );
};

export default SingleUserPage;
