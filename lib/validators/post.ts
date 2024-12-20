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
    ContentType.PDF,
  ]),
  content: z
    .string()
    .min(32, { message: "Must contain at least 32 characters." })
    .max(2048, { message: "Must be less than 2048 characters." }),
  thumbnail: z
    .string()
    .max(512, {
      message:
        "Sorry, this image could not be uploaded. Link character limit exceeded.",
    })
    .optional(),
  description: z
    .string()
    .max(2048, { message: "Must be less than 2048 characters." })
    .optional(),
  tags: z
    .string()
    .array()
    .min(1, { message: "At least one tag is required." })
    .max(8, { message: "You can only choose up to 8 tags." }),
  researchQuestions: z.string().array().min(0).max(8),
  location: z.string().max(64).optional(),
});

export const PostEditValidator = z.object({
  content: z.string().min(3).max(2048),
  description: z.string().max(2048).optional(),
  tags: z
    .string()
    .array()
    .min(1, { message: "At least one tag is required." })
    .max(8, { message: "You can only choose up to 8 tags." }),
  thumbnail: z
    .string()
    .max(512, {
      message:
        "Sorry, this image could not be uploaded. Link character limit exceeded.",
    })
    .optional(),
});
