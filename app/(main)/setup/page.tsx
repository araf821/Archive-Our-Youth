import { kobata } from "@/app/fonts";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { auth, currentUser, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FC } from "react";
import SetupForm from "./_components/SetupForm";

interface pageProps {}

const page = async ({}) => {
    const clerkUser = await currentUser();

    if (!clerkUser?.id) {
      return redirectToSignIn({ returnBackUrl: "/setup" });
    }

    const user = await db.user.findUnique({
      where: {
        userId: clerkUser.id,
      },
    });

    if (!user) {
      return redirect("/home");
    }

    // const newUser = await db.user.create({
    //   data: {
    //     userId: clerkUser.id,
    //     name: `${
    //       clerkUser.firstName === null
    //         ? "No Name"
    //         : clerkUser.firstName +
    //           (clerkUser.lastName ? " " + clerkUser.lastName : "")
    //     }`,
    //     imageUrl: "/placeholder-image.png",
    //     email: clerkUser.emailAddresses[0].emailAddress,
    //   },
    // });

  return (
    <div className="mx-auto mt-8 max-w-screen-md md:mt-12">
      <div className="group flex flex-col gap-4 px-4 text-zinc-100 md:gap-6">
        {/* Header */}
        <div className="space-y-2">
          <p className="text-center text-zinc-400">Welcome to</p>
          <p
            className={cn("text-center text-4xl md:text-5xl", kobata.className)}
          >
            Archive Our Youth
          </p>
          {/* <div className="relative h-[1px] bg-zinc-700">
            <span className="absolute inset-0 w-full scale-x-0 bg-gradient-to-r from-lime-500 via-green-500 to-lime-500 transition duration-300 group-hover:scale-x-100" />
          </div> */}
        </div>

        <h2 className="text-center text-zinc-300 text-xl md:text-2xl mt-4">
          Let&rsquo;s get you set up!
        </h2>

        <SetupForm user={user} />

      </div>
    </div>
  );
};

export default page;
