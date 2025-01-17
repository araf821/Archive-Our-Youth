import { Metadata } from "next";
import ContactForm from "./_components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
};

const ContactPage = () => {
  return (
    <section className="mx-auto my-8 w-full max-w-screen-md px-6 md:my-12 md:px-12">
      <h2 className="mb-2 text-3xl font-medium md:text-4xl">Contact Us</h2>
      <hr className="border-t-2 border-background-surface" />

      <ContactForm />
    </section>
  );
};
export default ContactPage;
