import BackButton from "@/components/BackButton";
import React from "react";
import UserMoreInformation from "../../_components/user/UserMoreInformation";

interface SingleUserPageProps {
  params: {
    userId: string;
  };
}

const SingleUserPage = ({ params }: SingleUserPageProps) => {
  return (
    <div>
      <BackButton classNames="morph-none bg-[#252525]" />
      <UserMoreInformation userId={params.userId} />
    </div>
  );
};

export default SingleUserPage;
