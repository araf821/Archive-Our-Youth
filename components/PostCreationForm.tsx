"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

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
import FileUpload from "./FileUpload";

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
  const [preview, setPreview] = useState(false);
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

  console.log(form.getValues());

  const isLoading = form.formState.isSubmitting;
  const contentType = form.watch("contentType");

  const onNext = () => {
    setStep((currentStep) => currentStep + 1);
  };

  const onBack = () => {
    setStep((currentStep) => currentStep - 1);
  };

  let introScreen,
    typeSelectionScreen,
    titleScreen,
    contentScreen,
    tagsScreen,
    confirmationScreen;

  introScreen = (
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
        className="fixed bottom-[20vh] flex gap-x-2 bg-zinc-200 text-zinc-800 transition hover:translate-x-2 hover:bg-white"
      >
        Get Started
        <ArrowRight />
      </Button>
    </div>
  );

  typeSelectionScreen = (
    <div className="flex h-[40vh] flex-col items-center justify-center space-y-8">
      <p className="text-2xl text-zinc-300 md:text-3xl">
        What type of content would you like to submit?
      </p>
      <FormField
        control={form.control}
        name="contentType"
        render={({ field }) => (
          <FormItem className="flex items-center justify-center gap-4 max-md:flex-col md:flex-row md:gap-x-8">
            <FormControl>
              <button
                type="button"
                onClick={() => form.setValue("contentType", "TEXT")}
                className={cn(
                  "w-40 rounded-xl bg-zinc-800 py-2.5 text-zinc-200 transition hover:bg-zinc-700 hover:text-white md:translate-y-1 md:text-lg",
                  {
                    "bg-zinc-200 font-semibold text-zinc-800 shadow-[0_0_20px_5px] shadow-white/20 hover:bg-zinc-100 hover:text-zinc-950":
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
                    "bg-zinc-200 font-semibold text-zinc-800 shadow-[0_0_20px_5px] shadow-white/20 hover:bg-zinc-100 hover:text-zinc-950":
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
                    "bg-zinc-200 font-semibold text-zinc-800 shadow-[0_0_20px_5px] shadow-white/20 hover:bg-zinc-100 hover:text-zinc-950":
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
                    "bg-zinc-200 font-semibold text-zinc-800 shadow-[0_0_20px_5px] shadow-white/20 hover:bg-zinc-100 hover:text-zinc-950":
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

  titleScreen = (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem className="flex h-[40vh] flex-col items-center justify-center space-y-12">
          <FormLabel className="text-2xl text-zinc-300 md:text-3xl">
            What would you like to name this masterpiece?
          </FormLabel>
          <FormControl>
            <input
              placeholder="Title"
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

  if (form.getValues().contentType === "TEXT") {
    contentScreen = (
      <FormField
        name="content"
        control={form.control}
        render={({ field }) => (
          <FormItem className="mx-auto flex h-[40vh] max-w-screen-sm flex-col justify-center space-y-2">
            <FormLabel className="text-2xl capitalize text-zinc-300 md:text-3xl">
              Content Type Chosen: {form.getValues().contentType.toLowerCase()}
            </FormLabel>
            <div className="flex gap-1.5">
              <Button
                type="button"
                size="sm"
                onClick={() => setPreview(false)}
                className={cn(
                  "bg-zinc-800 transition duration-300 hover:-translate-y-0.5 hover:bg-zinc-700",
                  {
                    "bg-emerald-500 text-black hover:bg-emerald-600": !preview,
                  },
                )}
              >
                Write
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={() => setPreview(true)}
                className={cn(
                  "bg-zinc-800 transition duration-300 hover:-translate-y-0.5 hover:bg-zinc-700",
                  {
                    "bg-emerald-500 text-black hover:bg-emerald-600": preview,
                  },
                )}
              >
                Preview
              </Button>
            </div>
            <FormControl>
              {preview ? (
                form.getValues().content ? (
                  <ReactMarkdown className="prose-headings:font-josefin prose h-full max-w-full overflow-y-auto break-words rounded-md bg-zinc-700 p-2.5 text-start text-zinc-200 prose-headings:font-semibold prose-headings:text-zinc-100 prose-h1:m-0 prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-code:whitespace-pre-wrap prose-img:rounded-md">
                    {form.getValues().content}
                  </ReactMarkdown>
                ) : (
                  <p className="grid h-96 place-items-center">
                    Nothing to preview
                  </p>
                )
              ) : (
                <textarea
                  {...field}
                  placeholder="Placeholder Text"
                  className="h-full resize-none rounded-sm border-none bg-zinc-700 px-3 py-1.5 text-lg text-zinc-50 outline-none focus:outline-none"
                />
              )}
            </FormControl>
          </FormItem>
        )}
      />
    );
  } else if (form.getValues().contentType === "IMAGE") {
    contentScreen = (
      <FormField
        name="content"
        control={form.control}
        render={({ field }) => (
          <FormItem className="mx-auto flex h-[40vh] max-w-screen-sm flex-col items-center justify-center space-y-4">
            <FormControl>
              <FileUpload
                endPoint="image"
                onChange={field.onChange}
                value={field.value}
              />
            </FormControl>
          </FormItem>
        )}
      />
    );
  }

  tagsScreen = (
    <FormField
      control={form.control}
      name="content"
      render={({ field }) => (
        <FormItem className="space-y-12">Post Tags</FormItem>
      )}
    />
  );

  confirmationScreen = (
    <FormField
      control={form.control}
      name="content"
      render={({ field }) => (
        <FormItem className="space-y-12">
          <FormControl></FormControl>
          CONFIRMATION
          <div className="fixed bottom-[15vh] left-0 w-full md:bottom-[20vh]">
            <div className="mx-auto flex max-w-lg items-center justify-between px-4 md:w-full">
              <Button
                type="button"
                onClick={onBack}
                variant="link"
                className="px-0 text-white"
              >
                <ArrowLeft />
              </Button>
              <Button
                size={"lg"}
                className="gap-x-1 bg-zinc-200 font-bold text-zinc-900 transition hover:translate-x-1 hover:bg-zinc-50"
              >
                Submit
                <ArrowRight />
              </Button>
            </div>
          </div>
        </FormItem>
      )}
    />
  );

  return (
    <div className="w-full max-w-screen-md px-4 text-center">
      <Form {...form}>
        <form onSubmit={() => {}}>
          {step === STEPS.WELCOME && introScreen}
          {step === STEPS.TYPE && typeSelectionScreen}
          {step === STEPS.TITLE && titleScreen}
          {step === STEPS.CONTENT && contentScreen}
          {step === STEPS.TAGS && tagsScreen}
          {step === STEPS.CONFIRM && confirmationScreen}
        </form>
      </Form>
      {step > 0 && step < 5 && (
        <div className="mx-auto w-full ">
          <div className="mx-auto mt-12 flex w-32 items-center justify-between">
            <Button
              type="button"
              onClick={onBack}
              variant="link"
              className="px-0 text-zinc-400 hover:scale-105 hover:text-zinc-200"
            >
              <ArrowLeft />
            </Button>
            <Button
              type="button"
              onClick={onNext}
              variant="link"
              className="px-0 text-zinc-400 hover:scale-105 hover:text-zinc-200"
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
