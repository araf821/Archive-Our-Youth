import { cn } from "@/lib/utils";
import { kobata } from "./fonts";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <div className="grid min-h-[100dvh] place-items-center px-4 sm:px-8">
      <div className="flex w-full max-w-xl flex-col gap-4 rounded-xl bg-zinc-950 px-4 py-6 text-center md:gap-8 md:px-8 md:py-10">
        <h2 className={cn("text-3xl md:text-4xl", kobata.className)}>
          Not Found
        </h2>
        <p className="font-medium text-zinc-300">
          The resource you&apos;re looking for does not exist.
        </p>
        <p className="-mt-4 text-sm text-zinc-400">
          If you believe that there is an issue on our end, please feel free to
          report to us at{" "}
          <Link
            href="mailto:araf821@my.yorku.ca"
            className="text-blue-400 underline underline-offset-2"
          >
            araf821@my.yorku.ca
          </Link>
          .
        </p>

        <div className="flex justify-between gap-4 max-md:flex-col md:gap-8">
          <Button asChild className="w-full" variant="ghost">
            <Link href="/contact">Contact Us</Link>
          </Button>
          <Button asChild className="w-full" variant="outline">
            <Link href="/home">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
