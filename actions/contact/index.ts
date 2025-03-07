"use server";

import { Resend } from "resend";
import { z } from "zod";

import { ContactFormValidator, ContactType } from "@/lib/validators/contact";
import { EmailTemplate } from "@/app/(main)/contact/_components/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export const contact = async (values: z.infer<typeof ContactFormValidator>) => {
  const validatedFields = ContactFormValidator.safeParse(values);
  if (!validatedFields.success) {
    throw new TypeError("Bad Request");
  }

  const toEmail =
    validatedFields.data.contactType === ContactType.GENERAL
      ? "araf.ahmed200@gmail.com"
      : "araf.ahmed200@gmail.com";
  await resend.emails
    .send({
      from: `Archive Our Youth - From <onboarding@resend.dev>`,
      to: [toEmail],
      subject:
        validatedFields.data.contactType === ContactType.GENERAL
          ? "Message from Archive Our Youth - General Inquiry"
          : "Message from Archive Our Youth - Technical Inquiry",
      react: EmailTemplate({
        email: validatedFields.data.email,
        message: validatedFields.data.message,
        subject:
          validatedFields.data.contactType === ContactType.GENERAL
            ? "General"
            : "Technical",
      }),
    })
    .catch((e) => {
      console.error("Email not sent!", e);
      throw new Error("Email not sent!");
    });

  return;
};
