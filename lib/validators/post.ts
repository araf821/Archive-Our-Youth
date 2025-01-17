import { ContentType } from "@prisma/client";
import { z } from "zod";

export const PostCreationValidator = z.object({
  title: z
    .string()
    .trim()
    .min(1, {
      message: "Title must be between 1 to 64 characters in length.",
    })
    .max(64, {
      message: "Title must be between 1 to 64 characters in length.",
    })
    .regex(/^[a-zA-Z0-9\s\-_.,!?()]+$/, {
      message: "Title contains invalid characters",
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
    .trim()
    .min(21, { message: "Must contain at least 21 characters." })
    .max(2000, { message: "Must be less than 2000 characters." })
    .refine(
      (val) => {
        // If it's a URL
        if (/^https?:\/\//.test(val)) {
          // Check if it's a YouTube URL
          if (val.includes("youtube.com") || val.includes("youtu.be")) {
            return /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}$/.test(
              val,
            );
          }
          // Otherwise accept any valid URL
          return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(
            val,
          );
        }
        // Otherwise validate as plain text (allowing markdown)
        return true;
      },
      {
        message: "Invalid content format or URL provided.",
      },
    ),
  thumbnail: z
    .string()
    .trim()
    .max(512, {
      message:
        "Sorry, this image could not be uploaded. Link character limit exceeded.",
    })
    .optional(),
  description: z
    .string()
    .trim()
    .max(2048, { message: "Must be less than 2048 characters." })
    .optional(),
  tags: z
    .string()
    .array()
    .min(1, { message: "At least one tag is required." })
    .max(8, { message: "You can only choose up to 8 tags." }),
  researchQuestions: z.string().array().min(0).max(8),
  location: z.string().trim().optional(),
});

export const PostEditValidator = z.object({
  content: z
    .string()
    .trim()
    .min(21, { message: "Must contain at least 21 characters." })
    .max(2000, { message: "Must be less than 2000 characters." })
    .refine(
      (val) => {
        // If it's a URL
        if (/^https?:\/\//.test(val)) {
          // Check if it's a YouTube URL
          if (val.includes("youtube.com") || val.includes("youtu.be")) {
            return /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}$/.test(
              val,
            );
          }
          // Otherwise accept any valid URL
          return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(
            val,
          );
        }
        // Otherwise validate as plain text (allowing markdown)
        return true;
      },
      {
        message: "Invalid content format or URL provided.",
      },
    ),
  description: z
    .string()
    .trim()
    .max(2048, { message: "Must be less than 2048 characters." })
    .optional(),
  tags: z
    .string()
    .array()
    .min(1, { message: "At least one tag is required." })
    .max(8, { message: "You can only choose up to 8 tags." }),
  thumbnail: z
    .string()
    .trim()
    .max(512, {
      message:
        "Sorry, this image could not be uploaded. Link character limit exceeded.",
    })
    .optional(),
  researchQuestions: z.string().array().min(0).max(8),
  location: z.string().trim().optional(),
});
