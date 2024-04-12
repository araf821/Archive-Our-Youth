"use server";

import { ContactFormValidator, ContactType } from "@/lib/validators/contact";
import { z } from "zod";
import { Resend } from "resend";
import { EmailTemplate } from "@/app/(main)/contact/_components/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export const contact = async (values: z.infer<typeof ContactFormValidator>) => {
  const validatedFields = ContactFormValidator.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields provided.",
      validationError: validatedFields.error,
    };
  }

  const toEmail =
    validatedFields.data.contactType === ContactType.GENERAL
      ? "araf.ahmed200@gmail.com"
      : "araf.ahmed200@gmail.com";

  const data = await resend.emails
    .send({
      from: `Archive Our Youth - From <onboarding@resend.dev>`,
      to: [toEmail],
      subject:
        validatedFields.data.contactType === ContactType.GENERAL
          ? "General Enquiry"
          : "Technical Enquiry",
      react: EmailTemplate({
        email: validatedFields.data.email,
        message: validatedFields.data.message,
        subject:
          validatedFields.data.contactType === ContactType.GENERAL
            ? "General Enquiry"
            : "Technical Enquiry",
      }),
    })
    .catch((e) => console.error("Email not sent!", e));

  return { success: "Email sent successfully!" };
};
