import { db } from "@/lib/db";

interface StatsProps {}

const Stats = async ({}: StatsProps) => {
  const userCount = await db.user.count();
  const postCount = await db.post.count();
  const commentCount = await db.comment.count();

  const textPosts = await db.post.count({
    where: {
      contentType: "TEXT",
    },
  });
  const videoPosts = await db.post.count({
    where: {
      contentType: "VIDEO",
    },
  });
  const audioPosts = await db.post.count({
    where: {
      contentType: "AUDIO",
    },
  });
  const pdfPosts = await db.post.count({
    where: {
      contentType: "PDF",
    },
  });
  const imagePosts = await db.post.count({
    where: {
      contentType: "IMAGE",
    },
  });

  return (
    <>
      <div>
        <p className="my-4 w-fit rounded-md bg-green-500 px-3 py-1 text-sm font-semibold tracking-widest text-black">
          Overall
        </p>
        <ul className="grid gap-4 sm:grid-cols-2">
          <li className="rounded-lg bg-[#252525] px-5 py-4">
            <p className="text-lg font-semibold tracking-wider md:text-xl">
              {userCount} Users
            </p>
          </li>
          <li className="rounded-lg bg-[#252525] px-5 py-4">
            <p className="text-lg font-semibold tracking-wider md:text-xl">
              {postCount} Posts
            </p>
          </li>
          <li className="rounded-lg bg-[#252525] px-5 py-4">
            <p className="text-lg font-semibold tracking-wider md:text-xl">
              {commentCount} Comments
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
              {imagePosts} IMAGE Posts
            </p>
          </li>
          <li className="rounded-lg bg-[#252525] px-5 py-4">
            <p className="text-lg font-semibold tracking-wider md:text-xl">
              {videoPosts} VIDEO Posts
            </p>
          </li>
          <li className="rounded-lg bg-[#252525] px-5 py-4">
            <p className="text-lg font-semibold tracking-wider md:text-xl">
              {audioPosts} AUDIO Posts
            </p>
          </li>
          <li className="rounded-lg bg-[#252525] px-5 py-4">
            <p className="text-lg font-semibold tracking-wider md:text-xl">
              {textPosts} TEXT Posts
            </p>
          </li>
          <li className="rounded-lg bg-[#252525] px-5 py-4">
            <p className="text-lg font-semibold tracking-wider md:text-xl">
              {pdfPosts} PDF Posts
            </p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Stats;
