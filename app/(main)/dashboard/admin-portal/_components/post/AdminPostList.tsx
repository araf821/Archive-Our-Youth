import { db } from "@/lib/db";
import AdminSinglePost from "./AdminSinglePost";

interface AdminPostListProps {}

const AdminPostList = async ({}: AdminPostListProps) => {
  const posts = await db.post.findMany({
    include: {
      user: true,
    },
  });

  if (!posts) {
    return null;
  }

  return (
    <div className="space-y-2 pt-4">
      {posts.map((post) => (
        <AdminSinglePost key={post.id} post={post} />
      ))}
    </div>
  );
};

export default AdminPostList;
