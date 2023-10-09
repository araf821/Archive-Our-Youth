import AnimatingImages from "@/components/AnimatingImages";
import FadeInContainer from "@/components/FadeInContainer";
import { db } from "@/lib/db";

export const metadata = {
  title: "Digital Collage",
  description:
    "Explore a global showcase of written, visual, and vocal artistry on Digital Collage. Join creators from around the world as they share their talents. Discover captivating stories, striking visuals, and powerful voices. Welcome to a diverse community of creativity.",
};

const LandingPage = async () => {
  const images = await db.post.findMany({
    where: {
      contentType: "IMAGE",
    },
    select: {
      postContent: true,
    },
  });

  return (
    <FadeInContainer>
      <div className="relative grid h-screen place-items-center">
        <AnimatingImages />
        <p className="z-10 flex flex-col gap-4 text-center font-karla text-8xl md:text-9xl font-bold tracking-tighter text-white opacity-100">
          Digital
          <span>Collage</span>
        </p>
      </div>
    </FadeInContainer>
  );
};
export default LandingPage;
