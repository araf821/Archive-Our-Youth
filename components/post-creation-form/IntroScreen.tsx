import { kobata } from "@/app/fonts";

export const IntroScreen = () => {
  return (
    <div className="mt-12 flex w-full flex-col gap-8 md:mt-20">
      <div>
        <p className="mb-4 text-2xl font-medium max-md:text-xl">
          Submit a post
        </p>
        <hr />
      </div>

      <p className="leading-6 tracking-widest text-zinc-300 max-md:text-sm">
        Welcome to{" "}
        <span className={`font-semibold ${kobata.className}`}>
          Archive Our Youth
        </span>{" "}
        on Youth and Planetary Wellbeing! You&apos;re invited to contribute to
        the Archive and/or explore the multimedia and artifacts preserved here.
        The Digital Archive explores dream futures, perspectives on wellbeing,
        and resources both real and desired that support personal to planetary
        wellbeing. We welcome youth, youth groups and engaged collectives from
        all over the world to contribute!
      </p>

      <p className="leading-6 tracking-widest text-zinc-300 max-md:text-sm">
        Archive Our Youth was launched as part of the international research
        study: Partnership for Youth and Planetary Wellbeing, led by the{" "}
        <a
          target="_blank"
          className="text-green-500 underline underline-offset-4"
          href="https://www.younglivesresearch.org/"
        >
          Young Lives Research Lab
        </a>
        , and 4 Youth Advisory Councils (YACs) in Canada, Chile, Costa Rica and
        Belize.
      </p>

      <p className="leading-6 tracking-widest text-zinc-300 max-md:text-sm">
        The Archive was launched in the Fall of 2023 by Canada&apos;s YAC, but
        the submission portal remains open for continual submissions.
      </p>

      <p className="text-zinc-400">
        Scroll down to complete the submission form.
      </p>
    </div>
  );
};
