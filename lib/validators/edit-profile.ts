import { z } from "zod";

export const EditProfileValidator = z.object({
  input: z
    .string()
    .min(3)
    .max(21)
    .refine((value) => value.trim().length > 3, {
      message: "Input must contain at least three non-whitespace character.",
    }),
  image: z.string().min(1),
});
