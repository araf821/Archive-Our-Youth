import { z } from "zod";

export const EditProfileValidator = z.object({
  newName: z
    .string()
    .min(3)
    .max(21)
    .refine((value) => value.trim().length > 3, {
      message: "Name must contain at least three non-whitespace character.",
    }),
  newImageUrl: z.string().min(1, { message: "A profile picture is required." }),
});
