import { z } from "zod";

export const CommentValidator = z.object({
  content: z.string().min(1).max(1024),
  postId: z.string().min(1),
});
