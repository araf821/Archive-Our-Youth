import { getStats } from "@/actions/stats";

interface StatsProps {}

const Stats = async ({}: StatsProps) => {
  const stats = await getStats();

  return (
    <>
      <div>
        <p className="my-4 w-fit rounded-md bg-green-500 px-3 py-1 text-sm font-semibold tracking-widest text-black">
          Overall
        </p>
        <ul className="grid gap-4 sm:grid-cols-2">
          <li className="rounded-lg bg-[#252525] px-5 py-4">
            <p className="text-lg font-semibold tracking-wider md:text-xl">
              {stats.userCount} Users
            </p>
          </li>
          <li className="rounded-lg bg-[#252525] px-5 py-4">
            <p className="text-lg font-semibold tracking-wider md:text-xl">
              {stats.postCount} Posts
            </p>
          </li>
          <li className="rounded-lg bg-[#252525] px-5 py-4">
            <p className="text-lg font-semibold tracking-wider md:text-xl">
              {stats.commentCount} Comments
            </p>
          </li>
          <li className="rounded-lg bg-[#252525] px-5 py-4">
            <p className="text-lg font-semibold tracking-wider md:text-xl">
              1 Developer
            </p>
          </li>
        </ul>
      </div>

      {/* By PostType */}
      <div>
        <p className="mb-4 mt-6 w-fit rounded-md bg-green-500 px-3 py-1 text-sm font-semibold tracking-widest text-black">
          Post Types
        </p>
        <ul className="grid gap-4 sm:grid-cols-2">
          <li className="rounded-lg bg-[#252525] px-5 py-4">
            <p className="text-lg font-semibold tracking-wider md:text-xl">
              {stats.imagePosts} IMAGE Posts
            </p>
          </li>
          <li className="rounded-lg bg-[#252525] px-5 py-4">
            <p className="text-lg font-semibold tracking-wider md:text-xl">
              {stats.videoPosts} VIDEO Posts
            </p>
          </li>
          <li className="rounded-lg bg-[#252525] px-5 py-4">
            <p className="text-lg font-semibold tracking-wider md:text-xl">
              {stats.audioPosts} AUDIO Posts
            </p>
          </li>
          <li className="rounded-lg bg-[#252525] px-5 py-4">
            <p className="text-lg font-semibold tracking-wider md:text-xl">
              {stats.textPosts} TEXT Posts
            </p>
          </li>
          <li className="rounded-lg bg-[#252525] px-5 py-4">
            <p className="text-lg font-semibold tracking-wider md:text-xl">
              {stats.pdfPosts} PDF Posts
            </p>
          </li>
        </ul>
      </div>

      <div className="mb-12">
        <p className="mb-4 mt-6 w-fit rounded-md bg-green-500 px-3 py-1 text-sm font-semibold tracking-widest text-black">
          Users
        </p>
        <ul className="grid gap-4 sm:grid-cols-2">
          <li className="rounded-lg bg-[#252525] px-5 py-4">
            <p className="text-lg font-semibold tracking-wider md:text-xl">
              {stats.admins} Admins
            </p>
          </li>
          <li className="rounded-lg bg-[#252525] px-5 py-4">
            <p className="text-lg font-semibold tracking-wider md:text-xl">
              {stats.members} Members
            </p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Stats;
