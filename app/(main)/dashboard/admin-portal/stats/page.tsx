import { Suspense } from "react";
import Stats from "../_components/Stats";

const AdminStatsPage = () => {
  return (
    <div className="px-4 lg:px-0">
      <h2 className="text-xl font-medium tracking-wide md:text-2xl">
        Stats for Archive Our Youth
      </h2>
      <hr className="border-zinc-700" />
      <Suspense fallback={<Stats.Skeleton />}>
        <Stats />
      </Suspense>
    </div>
  );
};
export default AdminStatsPage;
