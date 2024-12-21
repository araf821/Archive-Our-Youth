import { kobata } from "@/app/fonts";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import SetupForm from "./_components/SetupForm";
import { currentUser } from "@clerk/nextjs/server";

const page = async ({}) => {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return redirect("/sign-up");
  }

  const user = await db.user.findUnique({
    where: {
      userId: clerkUser.id,
    },
  });

  if (user) {
    return redirect("/home");
  }

  const newUser = await db.user.create({
    data: {
      userId: clerkUser.id,
      name: `${
        clerkUser.firstName === null
          ? "No Name"
          : clerkUser.firstName +
            (clerkUser.lastName ? " " + clerkUser.lastName : "")
      }`,
      imageUrl: "/placeholder-image.png",
      email: clerkUser.emailAddresses[0].emailAddress,
    },
  });

  return (
    <div className="mx-auto mt-8 max-w-screen-md md:mt-12">
      <div className="flex flex-col gap-4 px-4 text-zinc-100 md:gap-6">
        {/* Header */}
        <div className="space-y-2">
          <p className="text-center text-zinc-400">Welcome to</p>
          <p
            className={cn("text-center text-4xl md:text-5xl", kobata.className)}
          >
            Archive Our Youth
          </p>
        </div>

        <SetupForm user={newUser} />
      </div>
    </div>
  );
};

export default page;
