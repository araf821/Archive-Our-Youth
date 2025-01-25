import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { aboutConfig } from "./config";
import LogoGrid from "@/components/LogoGrid";

export const metadata: Metadata = {
  title: "About",
};

const AboutPage = () => {
  const {
    whatIsAOY,
    whoAreWe,
    youthAdvisoryCommittee,
    youngLivesResearchLab,
    webDevelopers,
    logos,
  } = aboutConfig;

  return (
    <div className="relative min-h-svh bg-gradient-to-b from-background to-background-muted px-4 pb-20 pt-8">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,197,94,0.1),rgba(0,0,0,0))]" />

      <div className="mx-auto max-w-4xl">
        {/* What is Archive Our Youth? */}
        <section className="relative space-y-6 rounded-2xl bg-background-elevated/50 p-8 backdrop-blur-xl transition-colors duration-500 hover:bg-background-elevated/70">
          <h1 className="text-4xl font-bold tracking-tight text-primary max-md:text-3xl">
            {whatIsAOY.title}
          </h1>
          <div className="space-y-4 leading-relaxed text-text-primary md:text-lg">
            {whatIsAOY.description.map((paragraph, index) => (
              <p
                key={index}
                className="transition-colors duration-300 hover:text-text-primary/90"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            <h2 className="text-2xl font-semibold text-primary-light max-md:text-xl">
              {whatIsAOY.howItStarted.title}
            </h2>
            {whatIsAOY.howItStarted.description.map((paragraph, index) => (
              <p
                key={index}
                className="leading-relaxed text-text-primary/90 md:text-lg"
              >
                {paragraph}
              </p>
            ))}
            <p className="border-l-4 border-primary-subtle bg-background-muted/50 p-4 italic text-text-primary/80 md:text-lg">
              {whatIsAOY.howItStarted.note}
            </p>
          </div>
        </section>

        {/* Who Are We */}
        <section className="mt-8 space-y-6 rounded-2xl bg-background-elevated/50 p-8 backdrop-blur-xl transition-colors duration-500 hover:bg-background-elevated/70">
          <h2 className="text-3xl font-bold tracking-tight text-primary max-md:text-2xl">
            {whoAreWe.title}
          </h2>
          <div className="space-y-4 leading-relaxed text-text-primary md:text-lg">
            {whoAreWe.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <ul className="grid gap-4 md:grid-cols-2">
            {whoAreWe.yacActivities.map((activity, index) => (
              <li
                key={index}
                className="flex items-start space-x-3 rounded-lg border border-border-light bg-background-muted p-4 transition-colors duration-300 hover:border-primary/30 hover:bg-background-muted/80"
              >
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                <span className="text-text-primary/90">{activity}</span>
              </li>
            ))}
          </ul>
          <p className="rounded-lg border border-border-light bg-background-muted p-4 text-text-primary/90 md:text-lg">
            {whoAreWe.funding}
          </p>
        </section>

        {/* Youth Advisory Committee - Canada */}
        <section className="mt-8 space-y-6 rounded-2xl bg-background-elevated/50 p-8 backdrop-blur-xl transition-colors duration-500 hover:bg-background-elevated/70">
          <h2 className="text-3xl font-bold tracking-tight text-primary max-md:text-2xl">
            {youthAdvisoryCommittee.title}
          </h2>
          <div className="aspect-video w-full overflow-hidden rounded-xl">
            <Image
              src="/yac-team.webp"
              alt="Youth Advisory Committee Team"
              width={1920}
              height={1080}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="space-y-4 leading-relaxed text-text-primary md:text-lg">
            {youthAdvisoryCommittee.description.map((paragraph, index) => (
              <p
                key={index}
                className="transition-colors duration-300 hover:text-text-primary/80"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Young Lives Research Lab */}
        <section className="mt-8 space-y-6 rounded-2xl bg-background-elevated/50 p-8 backdrop-blur-xl transition-colors duration-500 hover:bg-background-elevated/70">
          <h2 className="text-3xl font-bold tracking-tight text-primary max-md:text-2xl">
            {youngLivesResearchLab.title}
          </h2>
          <div className="space-y-4 leading-relaxed text-text-primary md:text-lg">
            {youngLivesResearchLab.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            <p className="pt-2">
              To learn more, visit:{" "}
              <Link
                href={youngLivesResearchLab.website}
                target="_blank"
                className="break-words text-primary-light underline decoration-primary-subtle/30 decoration-2 underline-offset-4 transition-colors duration-300 hover:text-primary hover:decoration-primary-subtle/50"
              >
                {youngLivesResearchLab.website}
              </Link>
            </p>
          </div>
        </section>

        {/* Web Developers */}
        <section className="mt-8 space-y-6 rounded-2xl bg-background-elevated/50 p-8 backdrop-blur-xl transition-colors duration-500 hover:bg-background-elevated/70">
          <h2 className="text-3xl font-bold tracking-tight text-primary max-md:text-2xl">
            {webDevelopers.title}
          </h2>
          <div className="space-y-4 leading-relaxed text-text-primary md:text-lg">
            {webDevelopers.description.map((paragraph, index) => (
              <p
                key={index}
                dangerouslySetInnerHTML={{ __html: paragraph }}
                className="[&_.developer-link]:text-secondary [&_.developer-link]:underline [&_.developer-link]:decoration-secondary/30 [&_.developer-link]:decoration-2 [&_.developer-link]:underline-offset-4 [&_.developer-link]:transition-colors [&_.developer-link]:duration-300"
              />
            ))}
          </div>
        </section>

        {/* Logos */}
        <LogoGrid logos={[logos.ylrl, logos.york, logos.ghr, logos.kmhunter]} />
      </div>
    </div>
  );
};

export default AboutPage;
