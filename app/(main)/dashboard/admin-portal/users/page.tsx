import RefreshButton from "@/components/RefreshButton";

import UserList from "../_components/UserList";

interface UsersPageProps {
  searchParams: {
    page: string;
  };
}

const UsersPage = async ({ searchParams }: UsersPageProps) => {
  return (
    <div className="mb-8 overflow-hidden bg-[#252525] md:rounded-xl">
      <div className="flex items-center justify-between gap-8 pr-4 md:pr-8">
        <div className="w-fit bg-[#2f2f2f] px-4 py-2.5 text-center lg:px-8">
          <p className="font-semibold tracking-wider text-green-500 md:text-lg">
            Manage Users
          </p>
        </div>
        <RefreshButton />
      </div>
      <hr className="border-[#2f2f2f]" />
      <UserList page={parseInt(searchParams.page ?? 1)} />
    </div>
  );
};

export default UsersPage;
