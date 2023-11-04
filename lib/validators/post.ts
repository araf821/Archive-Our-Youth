import { ContentType } from "@prisma/client";
import { z } from "zod";

export const PostCreationValidator = z.object({
  title: z
    .string()
    .min(1, {
      message: "Title must be between 1 to 64 characters in length.",
    })
    .max(64, {
      message: "Title must be between 1 to 64 characters in length.",
    }),
  contentType: z.enum([
    ContentType.TEXT,
    ContentType.IMAGE,
    ContentType.VIDEO,
    ContentType.AUDIO,
  ]),
  content: z
    .string()
    .min(5, {
      message: "Content must be between 5 and 2000 characters in length.",
    })
    .max(2000, {
      message: "Content must be between 5 and 2000 characters in length.",
    }),
  description: z
    .string()
    .max(2000, {
      message: "Description must be less than 2000 characters in length",
    })
    .optional(),
  tags: z
    .string()
    .array()
    .min(1, { message: "At least one tag is required." })
    .max(8, { message: "You can only choose up to 8 tags." }),
  q1: z.string().max(1000),
  q2: z.string().max(1000),
  q3: z.string().max(1000),
  q4: z.string().max(1000),
  q5: z.string().max(1000),
});
