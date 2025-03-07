import React, { Suspense } from "react";

import BackButton from "@/components/BackButton";

import PostList from "../../_components/user/PostList";
import UserCommentList from "../../_components/user/UserCommentList";
import UserMoreInformation from "../../_components/user/UserMoreInformation";

interface SingleUserPageProps {
  params: {
    userId: string;
  };
}

const SingleUserPage = ({ params }: SingleUserPageProps) => {
  return (
    <div className="px-4 pb-12">
      <BackButton classNames="morph-none bg-[#252525]" />

      {/* Basic user info */}
      <Suspense fallback={<UserMoreInformation.Skeleton />}>
        <UserMoreInformation userId={params.userId} />
      </Suspense>

      {/* List of user's posts */}
      <Suspense fallback={<PostList.Skeleton />}>
        <PostList userId={params.userId} />
      </Suspense>

      {/* List of user's comments */}
      <Suspense fallback={<UserCommentList.Skeleton />}>
        <UserCommentList userId={params.userId} />
      </Suspense>
    </div>
  );
};

export default SingleUserPage;
