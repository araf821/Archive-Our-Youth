import BackButton from "@/components/BackButton";
import React, { Suspense } from "react";
import UserMoreInformation from "../../_components/user/UserMoreInformation";

interface SingleUserPageProps {
  params: {
    userId: string;
  };
}

const SingleUserPage = ({ params }: SingleUserPageProps) => {
  return (
    <div className="px-4">
      <BackButton classNames="morph-none bg-[#252525]" />
      <Suspense fallback={<UserMoreInformation.Skeleton />}>
        <UserMoreInformation userId={params.userId} />
      </Suspense>
    </div>
  );
};

export default SingleUserPage;
