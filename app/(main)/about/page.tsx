import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
};

const AboutPage = () => {
  return (
    <div className="relative mx-auto max-w-screen-md space-y-12 px-6 pb-14 pt-8 text-white md:space-y-4">
      <span className="absolute left-0 top-0 h-80 w-80 bg-green-500/20 blur-3xl max-md:hidden"></span>
      <div className="group relative space-y-4 border-2 border-transparent bg-opacity-75 text-lg tracking-wide text-zinc-200 transition duration-300 md:rounded-t-2xl md:bg-[#222222] md:p-4 md:hover:border-green-500/20 md:hover:shadow-[0_0_25px] md:hover:shadow-green-500/10">
        <h4 className="text-xl font-semibold text-white transition duration-200 md:group-hover:text-green-500">
          Who Are We
        </h4>
        <p>
          Our Archive is a dynamic hub dedicated to exploring dream futures,
          various perspectives on wellbeing, and both exist`ing and desired
          resources that promote personal and planetary wellbeing. We extend an
          open invitation to youth, youth groups, and engaged collectives
          worldwide to actively contribute to this repository of knowledge.
        </p>
        <p>
          Here, you&rsquo;ll find a collection of multimedia and artifacts that
          reflect the diverse and innovative ideas of young minds. We encourage
          you to take part in this initiative by sharing your insights and
          creations or by exploring the content curated within our digital
          space.
        </p>
        <p>
          Join us in shaping a future where the dreams and aspirations of
          today&rsquo;s youth pave the way for a healthier and more sustainable
          tomorrow. Your participation matters, and together, we can make a
          meaningful impact on the world&rsquo;s wellbeing.
        </p>
      </div>

      <div className="group relative space-y-4 border-2 border-transparent bg-opacity-75 text-lg tracking-wide text-zinc-200 duration-300 md:bg-[#222222] md:p-4 md:hover:border-green-500/20 md:hover:shadow-[0_0_25px] md:hover:shadow-green-500/20">
        <h4 className="text-xl font-semibold text-white transition duration-200 md:group-hover:text-green-500">
          Youth Advisory Committee
        </h4>
        <p>
          Our Archive is a dynamic hub dedicated to exploring dream futures,
          various perspectives on wellbeing, and both existing and desired
          resources that promote personal and planetary wellbeing. We extend an
          open invitation to youth, youth groups, and engaged collectives
          worldwide to actively contribute to this repository of knowledge.
        </p>
        <p>
          Here, you&rsquo;ll find a collection of multimedia and artifacts that
          reflect the diverse and innovative ideas of young minds. We encourage
          you to take part in this initiative by sharing your insights and
          creations or by exploring the content curated within our digital
          space.
        </p>
        <p>
          Join us in shaping a future where the dreams and aspirations of
          today&rsquo;s youth pave the way for a healthier and more sustainable
          tomorrow. Your participation matters, and together, we can make a
          meaningful impact on the world&rsquo;s wellbeing.
        </p>
      </div>

      <div className="group relative space-y-4 border-2 border-transparent bg-opacity-75 text-lg tracking-wide text-zinc-200 duration-300 md:bg-[#222222] md:p-4 md:hover:border-green-500/20 md:hover:shadow-[0_0_25px] md:hover:shadow-green-500/20">
        <h4 className="text-xl font-semibold text-white transition duration-200 md:group-hover:text-green-500">
          Young Lives Research Lab
        </h4>
        <p>
          Founded in 2009 by Kate Tilleczek, we are dedicated to developing
          culturally and youth-attuned research, education & dialogue across
          countries, ages, communities and sectors.
        </p>
        <p>
          We work with/for youth and their communities to design and implement
          quality education that transcends formal schooling through integrated,
          holistic, land-based, culturally relevant and youth-centred education.
        </p>
      </div>

      <div className="flex items-center gap-8 border-2 border-transparent duration-300 md:rounded-b-2xl md:bg-[#222222] md:p-4 md:hover:border-green-500/20 md:hover:shadow-[0_0_25px] md:hover:shadow-green-500/20">
        <Link
          href="https://www.younglivesresearch.org"
          target="_blank"
          className="relative mx-auto aspect-square w-full max-w-[300px]"
        >
          <Image
            src="/ylrl-logo.svg"
            alt="ylrl logo"
            fill
            sizes="50vw, (min-width: 768px) 25vw"
            className="object-contain"
          />
        </Link>
        <Link
          href="https://www.yorku.ca/edu"
          target="_blank"
          className="relative mx-auto aspect-square w-full max-w-[300px]"
        >
          <Image
            src="/york-logo.svg"
            alt="york logo"
            fill
            sizes="50vw, (min-width: 768px) 25vw"
            className="object-contain"
          />
        </Link>
      </div>
    </div>
  );
};
export default AboutPage;
