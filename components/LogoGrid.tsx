import Image from "next/image";
import Link from "next/link";

interface Logo {
  src: string;
  alt: string;
  href: string;
}

interface LogoGridProps {
  logos: Logo[];
}

const LogoGrid = ({ logos }: LogoGridProps) => {
  return (
    <section className="mt-8 grid grid-cols-1 gap-8 rounded-2xl bg-background-elevated/50 p-8 backdrop-blur-xl transition-colors duration-500 hover:bg-background-elevated/70 sm:grid-cols-2 lg:grid-cols-4">
      {logos.map((logo, index) => (
        <Link
          key={index}
          href={logo.href}
          target="_blank"
          className="group relative aspect-square w-full"
        >
          <div className="absolute inset-0 rounded-xl bg-background-surface transition-colors duration-300 group-hover:bg-background-muted" />
          <Image
            src={logo.src}
            alt={logo.alt}
            fill
            sizes="(min-width: 640px) 25vw, 100vw"
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      ))}
    </section>
  );
};

export default LogoGrid;
