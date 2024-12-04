import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { kobata } from "@/app/fonts";
import { CarouselApi } from "@/components/ui/carousel";

interface IntroScreenProps {
  api: CarouselApi | null;
}

export const IntroScreen = ({ api }: IntroScreenProps) => {
  return (
    <div className="flex w-full flex-col gap-8">
      <p
        className={`${kobata.className} text-6xl font-semibold leading-[4.5rem] max-md:text-5xl max-sm:text-4xl`}
      >
        Archive Our Youth
      </p>

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

      <Button
        onClick={() => api?.scrollNext()}
        type="button"
        size="lg"
        variant="outline"
        className="w-fit border-2"
      >
        <span className="pl-1">Get Started</span>
        <ArrowRight className="h-5 w-5" />
      </Button>

      <p className="text-zinc-400 max-md:hidden">
        You can use arrow keys to navigate.
      </p>
      <p className="text-zinc-400 md:hidden">
        Swipe left or right to navigate.
      </p>
    </div>
  );
};
