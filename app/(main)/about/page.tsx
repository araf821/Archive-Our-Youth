import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us | Archive Our Youth",
};

const AboutPage = () => {
  return (
    <div className="mx-auto max-w-screen-md space-y-12 md:space-y-2 px-6 pb-14 pt-8 text-white">
      <div className="space-y-4 group text-lg tracking-wide text-zinc-200 md:rounded-t-2xl md:bg-[#222222] md:p-4 md:hover:shadow-green-500/10 border-2 border-transparent md:hover:border-green-500/20 transition duration-300 md:hover:shadow-[0_0_25px]">
        <h4 className="text-xl font-semibold md:group-hover:text-green-500 transition duration-200 text-white">About Us</h4>
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

      <div className="space-y-4 group text-lg tracking-wide text-zinc-200 md:bg-[#222222] md:p-4 md:hover:shadow-green-500/20 10 border-2 border-transparent md:hover:border-green-500/20 duration-300 md:hover:shadow-[0_0_25px]">
        <h4 className="text-xl font-semibold md:group-hover:text-green-500 transition duration-200 text-white">
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

      <div className="space-y-4 group text-lg tracking-wide text-zinc-200 md:bg-[#222222] md:p-4 md:hover:shadow-green-500/20 10 border-2 border-transparent md:hover:border-green-500/20 duration-300 md:hover:shadow-[0_0_25px]">
        <h4 className="text-xl font-semibold md:group-hover:text-green-500 transition duration-200 text-white">
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
      
      <div className="flex items-center gap-8 md:rounded-b-2xl md:bg-[#222222] md:p-4 md:hover:shadow-green-500/20 10 border-2 border-transparent md:hover:border-green-500/20 duration-300 md:hover:shadow-[0_0_25px]">
        <div className="relative mx-auto aspect-square w-full max-w-[300px]">
          <Image
            src="/ylrl-logo.svg"
            alt="ylrl logo"
            fill
            sizes="50vw, (min-width: 768px) 25vw"
            className="object-contain"
          />
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-[300px]">
          <Image
            src="/york-logo.svg"
            alt="york logo"
            fill
            sizes="50vw, (min-width: 768px) 25vw"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};
export default AboutPage;
