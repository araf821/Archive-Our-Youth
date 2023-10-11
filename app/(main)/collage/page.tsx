import Collage from "@/components/Collage";
import { initializeUser } from "@/lib/initializeUser";

export const metadata = {
  title: "Showcase | Digital Archive",
};

export default async function Home() {
  await initializeUser();

  return (
    <div className="relative">
      <Collage />
    </div>
  );
}
