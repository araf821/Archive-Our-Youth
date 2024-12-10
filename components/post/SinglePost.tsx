import { Comment, Post, User } from "@prisma/client";
import { FC } from "react";
import PostHeader from "./single-post-page/PostHeader";
import PostMedia from "./single-post-page/PostMedia";
import PostActions from "./single-post-page/PostActions";
import PostTitle from "./single-post-page/PostTitle";
import PostAuthor from "./single-post-page/PostAuthor";
import PostContent from "./single-post-page/PostContent";
import PostTags from "./single-post-page/PostTags";

interface SinglePostProps {
  currentUser: User | null;
  post: Post & { user: User | null; comments: (Comment & { user: User })[] };
}

const SinglePost: FC<SinglePostProps> = ({ post, currentUser }) => {
  const showActionsAtTop =
    post.contentType !== "TEXT" && post.contentType !== "PDF";

  return (
    <section className="mb-8 mt-8 flex flex-col gap-6">
      <PostHeader
        postId={post.id}
        slug={post.slug}
        isAuthor={post.userId === currentUser?.id}
      />

      {post.postContent && (
        <PostMedia
          contentType={post.contentType}
          postContent={post.postContent}
        />
      )}

      {showActionsAtTop && (
        <PostActions
          postId={post.id}
          likeCount={post.likes}
          currentUser={currentUser}
        />
      )}

      <div className="flex flex-col gap-4">
        <PostTitle
          title={post.title}
          createdAt={post.createdAt}
          location={post.location || undefined}
        />

        {!showActionsAtTop && (
          <PostActions
            postId={post.id}
            likeCount={post.likes}
            currentUser={currentUser}
          />
        )}

        <hr className="border-zinc-800" />

        <PostAuthor user={post.user} />

        <PostContent
          contentType={post.contentType}
          postContent={post.postContent || ""}
          description={post.description}
          researchQuestions={post.researchQuestions}
        />

        <PostTags tags={post.tags} />
      </div>
    </section>
  );
};

export default SinglePost;
