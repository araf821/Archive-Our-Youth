"use client";

import PostCreationForm from "@/components/PostCreationForm";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SubmitPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  // const [type, setType] = useState<POST_TYPE>();

  // const onTypeSelect = (type: POST_TYPE) => {
  //   setType(type);
  // };

  let content = (
    <div className="flex max-w-screen-lg flex-col items-center justify-center gap-12 text-center">
      <p className="flex flex-col gap-2 text-6xl font-bold tracking-wider text-zinc-100 md:text-9xl">
        Digital<span>Collage</span>
      </p>
      <p className="text-xl font-semibold text-zinc-300 md:text-2xl">
        Submission Portal
      </p>
      <Button
        size="lg"
        className="flex gap-x-2  bg-zinc-200 text-zinc-800 transition hover:translate-x-2 hover:bg-white"
      >
        Get Started
        <ArrowRight />
      </Button>
    </div>
  );

  // if (step === 1) {
  //   content = (
  //     <div className="space-y-8">
  //       <p className="text-2xl md:text-3xl">
  //         What type of content would you like to submit?
  //       </p>

  //       {/* types */}
  //       <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
  //         <button
  //           onClick={() => onTypeSelect(POST_TYPE.TEXT)}
  //           className={cn(
  //             "w-40 rounded-xl bg-zinc-800 py-2.5 text-zinc-200 transition hover:bg-zinc-700 hover:text-white md:text-lg",
  //             {
  //               "bg-zinc-200 text-zinc-800 hover:bg-zinc-100 hover:text-zinc-950":
  //                 type === POST_TYPE.TEXT,
  //             },
  //           )}
  //         >
  //           Text
  //         </button>
  //         <button
  //           onClick={() => onTypeSelect(POST_TYPE.IMAGE)}
  //           className={cn(
  //             "w-40 rounded-xl bg-zinc-800 py-2.5 text-zinc-200 transition hover:bg-zinc-700 hover:text-white md:text-lg",
  //             {
  //               "bg-zinc-200 text-zinc-800 hover:bg-zinc-100 hover:text-zinc-950":
  //                 type === POST_TYPE.IMAGE,
  //             },
  //           )}
  //         >
  //           Image
  //         </button>
  //         <button
  //           onClick={() => onTypeSelect(POST_TYPE.VIDEO)}
  //           className={cn(
  //             "w-40 rounded-xl bg-zinc-800 py-2.5 text-zinc-200 transition hover:bg-zinc-700 hover:text-white md:text-lg",
  //             {
  //               "bg-zinc-200 text-zinc-800 hover:bg-zinc-100 hover:text-zinc-950":
  //                 type === POST_TYPE.VIDEO,
  //             },
  //           )}
  //         >
  //           Video
  //         </button>
  //         <button
  //           onClick={() => onTypeSelect(POST_TYPE.AUDIO)}
  //           className={cn(
  //             "w-40 rounded-xl bg-zinc-800 py-2.5 text-zinc-200 transition hover:bg-zinc-700 hover:text-white md:text-lg",
  //             {
  //               "bg-zinc-200 text-zinc-800 hover:bg-zinc-100 hover:text-zinc-950":
  //                 type === POST_TYPE.AUDIO,
  //             },
  //           )}
  //         >
  //           Audio
  //         </button>
  //       </div>

  //       <div className="mx-auto flex w-32 items-center justify-between pt-4">
  //         <Button onClick={onBack} variant="link" className="px-0 text-white">
  //           <ArrowLeft />
  //         </Button>
  //         <Button onClick={onNext} variant="link" className="px-0 text-white">
  //           <ArrowRight />
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // }

  // if (step === STEPS.TITLE) {
  //   content = (
  //     <div className="space-y-8">
  //       <p className="text-2xl md:text-3xl">What would you call your work?</p>

  //       <div className="mx-auto w-full max-w-2xl">
  //         <input
  //           type="text"
  //           placeholder="Title of the post"
  //           className="w-full border-b border-zinc-600 bg-transparent px-3 py-2 text-xl font-semibold focus:outline-none md:text-2xl"
  //         />
  //       </div>

  //       <div className="mx-auto flex w-32 items-center justify-between pt-4">
  //         <Button onClick={onBack} variant="link" className="px-0 text-white">
  //           <ArrowLeft />
  //         </Button>
  //         <Button onClick={onNext} variant="link" className="px-0 text-white">
  //           <ArrowRight />
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // }

  // if (step === STEPS.TAGS) {
  //   content = (
  //     <div className="space-y-8">
  //       <p className="text-2xl md:text-3xl">
  //         Choose the tags that best represent your content!
  //       </p>

  //       <div className="mx-auto w-full max-w-2xl">
  //         <input
  //           type="text"
  //           placeholder="Title of the post"
  //           className="w-full border-b border-zinc-600 bg-transparent px-3 py-2 text-xl font-semibold focus:outline-none md:text-2xl"
  //         />
  //       </div>

  //       <div className="mx-auto flex w-32 items-center justify-between pt-4">
  //         <Button onClick={onBack} variant="link" className="px-0 text-white">
  //           <ArrowLeft />
  //         </Button>
  //         <Button onClick={onNext} variant="link" className="px-0 text-white">
  //           <ArrowRight />
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="relative grid h-screen place-items-center bg-zinc-900 text-white">
      <Button
        onClick={() => router.push("/")}
        className="2xl:64 fixed left-5 top-5 bg-zinc-800 hover:bg-zinc-700 lg:left-12 lg:top-16 xl:left-32"
      >
        Back to Home
      </Button>

      <PostCreationForm />
    </div>
  );
};
export default SubmitPage;
