"use server";

import { ContactFormValidator } from "@/lib/validators/contact";
import { z } from "zod";
import { Resend } from "resend";
import { EmailTemplate } from "@/app/(main)/contact/_components/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export const contact = async (values: z.infer<typeof ContactFormValidator>) => {
  const validatedFields = ContactFormValidator.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields provided omg.",
      validationError: validatedFields.error,
    };
  }

  const data = await resend.emails.send({
    from: `Archive Our Youth - From <${validatedFields.data.email}>`,
    to: ["araf.ahmed200@gmail.com"],
    subject: "Hello world",
    react: EmailTemplate({
      email: validatedFields.data.email,
      message: validatedFields.data.message,
    }),
  });

  console.log(data);

  return { success: "Email sent successfully!" };
};
