import { z } from "zod";

export const EditProfileValidator = z.object({
  newName: z
    .string()
    .min(3, {
      message: "Name must contain at least three characters.",
    })
    .max(21, {
      message: "Name must be less than 21 characters in length.",
    })
    .refine((value) => value.trim().length > 3, {
      message: "Name must contain at least three non-whitespace characters.",
    }),
  newImageUrl: z.string().min(1, { message: "A profile picture is required." }),
});
