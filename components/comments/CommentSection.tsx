import { db } from "@/lib/db";
import { User } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";
import CommentInput from "./CommentInput";
import Comment from "./Comment";

interface CommentSectionProps {
  postId: string;
  user: User | null;
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const CommentSection: FC<CommentSectionProps> = async ({ postId, user }) => {
  // const comments = await db.post.findUnique({
  //   where: {
  //     postId,
  //   },
  //   select: {
  //     comments: {
  //       include: {
  //         user: true,
  //       },
  //     },
  //   },
  // });

  return (
    <section className="flex flex-col gap-4">
      <div className="flex gap-2">
        <div className="mt-2.5 h-[1px] w-full bg-gradient-to-r from-green-500 to-lime-500" />
        <span className="text-green-600 max-md:text-sm">Comments</span>
        <div className="mt-2.5 h-[1px] w-full bg-gradient-to-l from-green-500 to-lime-500" />
      </div>
      {user ? (
        <CommentInput user={user} postId={postId} />
      ) : (
        <p className="pb-2 font-medium text-zinc-300 md:text-lg">
          Please{" "}
          <Link
            href="/sign-in"
            className="text-green-500 underline underline-offset-2"
          >
            Sign In
          </Link>{" "}
          to leave a comment.
        </p>
      )}

      <hr className="border-zinc-700" />

      {comments.length > 0 ? (
        <div className="divide-y divide-zinc-800">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        <p className="font-medium tracking-wide text-zinc-300 xl:text-lg">
          Be the first to leave a comment!
        </p>
      )}
    </section>
  );
};

export default CommentSection;

export const comments = [
  {
    id: 0,
    content:
      "weet apple pie tiramisu carrot cake. Marzipan marshmallow croissant tootsie roll lollipop. Cupcake lemon drops bear claw gummies. Jelly bear claw gummi bears lollipop cotton candy gummi bears chocolate bar cake cookie. Cupcake muffin danish muffin cookie gummies. Jelly beans tiramisu pudding. Toffee soufflé chocolate cake pastry brownie. Oat cake halvah sweet roll cotton candy croissant lollipop. Macaroon tiramisu chocolate bar candy candy carrot cake jelly sweet. Gummies crois",
    date: "1h ago",
    likeCount: 5,
    replyCount: 5,
    user: {
      name: "Minnie",
      imageUrl: "/placeholder-image.png",
    },
  },
  {
    id: 1,
    content:
      "weet apple pie tiramisu carrot cake. Marzipan marshmallow croissant tootsie roll lollipop. Cupcake lemon drops bear claw gummies. Jelly bear claw gummi bears lollipop cotton candy gummi bears chocolate bar cake cookie. Cupcake muffin danish muffin cookie gummies. Jelly beans tiramisu pudding. Toffee soufflé chocolate cake pastry brownie. Oat cake halvah sweet roll cotton candy croissant lollipop. Macaroon tiramisu chocolate bar candy candy carrot cake jelly sweet. Gummies crois",
    date: "1h ago",
    likeCount: 5,
    replyCount: 5,
    user: {
      name: "Minnie",
      imageUrl: "/placeholder-image.png",
    },
  },
  {
    id: 2,
    content:
      "weet apple pie tiramisu carrot cake. Marzipan marshmallow croissant tootsie roll lollipop. Cupcake lemon drops bear claw gummies. Jelly bear claw gummi bears lollipop cotton candy gummi bears chocolate bar cake cookie. Cupcake muffin danish muffin cookie gummies. Jelly beans tiramisu pudding. Toffee soufflé chocolate cake pastry brownie. Oat cake halvah sweet roll cotton candy croissant lollipop. Macaroon tiramisu chocolate bar candy candy carrot cake jelly sweet. Gummies crois",
    date: "1h ago",
    likeCount: 5,
    replyCount: 5,
    user: {
      name: "Minnie",
      imageUrl: "/placeholder-image.png",
    },
  },
  {
    id: 3,
    content:
      "weet apple pie tiramisu carrot cake. Marzipan marshmallow croissant tootsie roll lollipop. Cupcake lemon drops bear claw gummies. Jelly bear claw gummi bears lollipop cotton candy gummi bears chocolate bar cake cookie. Cupcake muffin danish muffin cookie gummies. Jelly beans tiramisu pudding. Toffee soufflé chocolate cake pastry brownie. Oat cake halvah sweet roll cotton candy croissant lollipop. Macaroon tiramisu chocolate bar candy candy carrot cake jelly sweet. Gummies crois",
    date: "1h ago",
    likeCount: 5,
    replyCount: 5,
    user: {
      name: "Minnie",
      imageUrl: "/placeholder-image.png",
    },
  },
  {
    id: 4,
    content:
      "weet apple pie tiramisu carrot cake. Marzipan marshmallow croissant tootsie roll lollipop. Cupcake lemon drops bear claw gummies. Jelly bear claw gummi bears lollipop cotton candy gummi bears chocolate bar cake cookie. Cupcake muffin danish muffin cookie gummies. Jelly beans tiramisu pudding. Toffee soufflé chocolate cake pastry brownie. Oat cake halvah sweet roll cotton candy croissant lollipop. Macaroon tiramisu chocolate bar candy candy carrot cake jelly sweet. Gummies crois",
    date: "1h ago",
    likeCount: 5,
    replyCount: 5,
    user: {
      name: "Minnie",
      imageUrl: "/placeholder-image.png",
    },
  },
];
