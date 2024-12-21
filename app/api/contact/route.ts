import { ContactFormValidator, ContactType } from "@/lib/validators/contact";
import { Resend } from "resend";
import { EmailTemplate } from "@/app/(main)/contact/_components/EmailTemplate";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedFields = ContactFormValidator.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    const toEmail =
      validatedFields.data.contactType === ContactType.GENERAL
        ? "araf.ahmed200@gmail.com"
        : "araf.ahmed200@gmail.com";

    await resend.emails.send({
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
    });

    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Email not sent!", error);
    return NextResponse.json({ message: "Email not sent!" }, { status: 500 });
  }
}
