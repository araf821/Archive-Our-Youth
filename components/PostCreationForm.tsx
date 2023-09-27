"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";

import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/Form";
import { Button } from "./ui/Button";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContentType } from "@prisma/client";
import { cn } from "@/lib/utils";

interface PostCreationFormProps {}

enum STEPS {
  WELCOME = 0,
  TYPE = 1,
  TITLE = 2,
  CONTENT = 3,
  TAGS = 4,
  CONFIRM = 5,
}

const formSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Title must be between 1 to 64 characters in length.",
    })
    .max(64, {
      message: "Title must be between 1 to 64 characters in length.",
    }),
  contentType: z.enum([
    ContentType.TEXT,
    ContentType.IMAGE,
    ContentType.VIDEO,
    ContentType.AUDIO,
  ]),
  content: z.string().min(3, { message: "Invalid input." }),
  description: z
    .string()
    .min(15, {
      message: "Description must be between 3 to 2000 characters in length.",
    })
    .max(2000, {
      message: "Description must be between 3 to 2000 characters in length",
    })
    .optional(),
});

const PostCreationForm: FC<PostCreationFormProps> = ({}) => {
  const router = useRouter();
  const [step, setStep] = useState(STEPS.WELCOME);

  const form = useForm<z.infer<typeof formSchema>>({
    // @ts-ignore
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      contentType: "TEXT",
      content: "",
      description: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const contentType = form.watch("contentType");

  const onNext = () => {
    setStep((currentStep) => currentStep + 1);
  };

  const onBack = () => {
    setStep((currentStep) => currentStep - 1);
  };

  let content = (
    <div
      className={`flex max-w-screen-lg flex-col items-center justify-center gap-12 text-center ${
        step > 1 && "hidden"
      }`}
    >
      <p className="flex flex-col gap-2 text-6xl font-bold tracking-wider text-zinc-100 md:text-9xl">
        Digital<span>Collage</span>
      </p>
      <p className="text-xl font-semibold text-zinc-300 md:text-2xl">
        Submission Portal
      </p>
      <Button
        onClick={onNext}
        type="button"
        size="lg"
        className="fixed bottom-[25vh] flex gap-x-2 bg-zinc-200 text-zinc-800 transition hover:translate-x-2 hover:bg-white"
      >
        Get Started
        <ArrowRight />
      </Button>
    </div>
  );

  if (step === STEPS.TYPE) {
    content = (
      <div className="space-y-8">
        <p className="text-2xl md:text-3xl">
          What type of content would you like to submit?
        </p>

        <FormField
          control={form.control}
          name="contentType"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
              <FormControl>
                <button
                  type="button"
                  onClick={() => form.setValue("contentType", "TEXT")}
                  className={cn(
                    "w-40 rounded-xl bg-zinc-800 py-2.5 text-zinc-200 transition hover:bg-zinc-700 hover:text-white md:text-lg",
                    {
                      "bg-zinc-200 text-zinc-800 hover:bg-zinc-100 hover:text-zinc-950":
                        contentType === ContentType.TEXT,
                    },
                  )}
                >
                  Text
                </button>
              </FormControl>
              <FormControl>
                <button
                  type="button"
                  onClick={() => form.setValue("contentType", "IMAGE")}
                  className={cn(
                    "w-40 rounded-xl bg-zinc-800 py-2.5 text-zinc-200 transition hover:bg-zinc-700 hover:text-white md:text-lg",
                    {
                      "bg-zinc-200 text-zinc-800 hover:bg-zinc-100 hover:text-zinc-950":
                        contentType === ContentType.IMAGE,
                    },
                  )}
                >
                  Image
                </button>
              </FormControl>
              <FormControl>
                <button
                  type="button"
                  onClick={() => form.setValue("contentType", "VIDEO")}
                  className={cn(
                    "w-40 rounded-xl bg-zinc-800 py-2.5 text-zinc-200 transition hover:bg-zinc-700 hover:text-white md:text-lg",
                    {
                      "bg-zinc-200 text-zinc-800 hover:bg-zinc-100 hover:text-zinc-950":
                        contentType === ContentType.VIDEO,
                    },
                  )}
                >
                  Video
                </button>
              </FormControl>
              <FormControl>
                <button
                  type="button"
                  onClick={() => form.setValue("contentType", "AUDIO")}
                  className={cn(
                    "w-40 rounded-xl bg-zinc-800 py-2.5 text-zinc-200 transition hover:bg-zinc-700 hover:text-white md:text-lg",
                    {
                      "bg-zinc-200 text-zinc-800 hover:bg-zinc-100 hover:text-zinc-950":
                        contentType === ContentType.AUDIO,
                    },
                  )}
                >
                  Audio
                </button>
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    );
  }

  if (step === STEPS.TITLE) {
    content = (
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem className="space-y-12">
            <FormLabel className="text-2xl md:text-3xl">
              What would you name this masterpiece?
            </FormLabel>
            <FormControl>
              <input
                placeholder="Title of the post"
                className="w-full border-b border-zinc-600 bg-transparent px-3 py-2 text-center text-2xl font-semibold placeholder:text-center focus:outline-none md:text-3xl"
                type="text"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-red-500" content="asdf" />
          </FormItem>
        )}
      />
    );
  }

  if (step === STEPS.CONTENT) {
    content = (
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem className="space-y-12">
            Post Content - {contentType}
          </FormItem>
        )}
      />
    );
  }

  if (step === STEPS.TAGS) {
    content = (
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem className="space-y-12">Post Tags</FormItem>
        )}
      />
    );
  }

  if (step === STEPS.CONFIRM) {
    content = (
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem className="space-y-12">Confirmation Page</FormItem>
        )}
      />
    );
  }

  return (
    <div className="max-w-screen-md px-4 text-center">
      <Form {...form}>
        <form onSubmit={() => {}}>{content}</form>
      </Form>
      {step > 0 && step < 5 && (
        <div className="fixed bottom-[15vh] left-0 mx-auto w-full md:bottom-[25vh]">
          <div className="mx-auto flex w-32 items-center justify-between">
            <Button
              type="button"
              onClick={onBack}
              variant="link"
              className="px-0 text-white"
            >
              <ArrowLeft />
            </Button>
            <Button
              type="button"
              onClick={onNext}
              variant="link"
              className="px-0 text-white"
            >
              <ArrowRight />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCreationForm;
