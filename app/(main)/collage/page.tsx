import Collage from "@/components/Collage";
import { initializeUser } from "@/lib/initializeUser";

export const metadata = {
  title: "Showcase Collage | Digital Collage",
};

export default async function Home() {
  await initializeUser();

  return (
    <div className="relative">
      <Collage />
    </div>
  );
}
