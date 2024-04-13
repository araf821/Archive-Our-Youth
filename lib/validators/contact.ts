import { z } from "zod";

export const ContactType = {
  GENERAL: "GENERAL",
  TECH: "TECH",
};

export const ContactFormValidator = z.object({
  email: z.string().email({
    message: "Must be a valid email address.",
  }),
  contactType: z.enum([ContactType.GENERAL, ContactType.TECH]),
  message: z
    .string()
    .min(21, {
      message: "Message must contain at least 21 characters.",
    })
    .max(2048, {
      message: "Message must be less than 2048 characters in length.",
    })
    .refine((value) => value.trim().length > 20, {
      message: "Message must contain at least 21 non-whitespace characters.",
    }),
});
