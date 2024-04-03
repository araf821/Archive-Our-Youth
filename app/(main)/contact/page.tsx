import Image from "next/image";
import Link from "next/link";
import { EmailTemplate } from "./_components/EmailTemplate";

const ContactPage = () => {
  if (true) {
    return (
      <EmailTemplate
        email="araf.ahmed200@gmail.com"
        message="
    lorem ipsum dolor sit amet consectetur adipiscing elit sodales mattis nec,
    posuere purus purus, euismod luctus nisl nisl, euismod luctus nisl nisl,
    euismod luctus nisl nisl, euismod luctus nisl nisl, euismod luctus nisl nisl,
    euismod luctus nisl nisl
    "
      />
    );
  }

  return (
    <div className="mx-auto max-w-screen-md px-4 py-12 sm:px-8 md:py-20">
      <h1 className="pb-4 text-center text-2xl font-medium md:pb-8 md:text-3xl">
        Page Under Construction
      </h1>
      <div className="relative mx-auto aspect-square w-full max-w-md">
        <Image
          src="https://utfs.io/f/31698637-8a1a-4801-b5e4-204b001ab7cc-28c0.webp"
          alt="under construction cat"
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          loading="eager"
          className="rounded-xl object-cover [box-shadow:0_4px_16px_#000000]"
        />
      </div>
      <div className="mt-8 flex w-full max-w-3xl flex-col rounded-xl border-2 border-zinc-800 bg-zinc-950 md:mt-12">
        <div className="px-4 py-2.5 text-lg md:text-xl">Who To Contact</div>
        <hr className="border-t-2 border-zinc-800" />
        <div className="grid grid-cols-1 divide-zinc-800 max-md:divide-y-2 md:grid-cols-2 md:divide-x-4">
          <p className="p-4">
            For all inquiries related to the <b>Archive</b>, email{" "}
            <Link
              className="text-blue-400 underline underline-offset-2"
              href="mailto:younglives@edu.yorku.ca"
            >
              younglives@edu.yorku.ca
            </Link>
            .
          </p>
          <p className="p-4">
            For all inquiries related to <b>technology</b>, email{" "}
            <Link
              className="text-blue-400 underline underline-offset-2"
              href="mailto:araf821@my.yorku.ca"
            >
              araf821@my.yorku.ca
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
export default ContactPage;
