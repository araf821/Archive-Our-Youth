"use client";

import { FC, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import { ArrowLeft, ArrowRight, RefreshCcw, X } from "lucide-react";
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
import { ContentType, User } from "@prisma/client";
import { cn } from "@/lib/utils";
import FileUpload from "./FileUpload";
import MultiSelect from "./MultiSelect";

interface PostCreationFormProps {
  currentUser: User | null;
}

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
  tags: z
    .string()
    .array()
    .max(5, { message: "You can only choose up to 5 tags." }),
});

const PostCreationForm: FC<PostCreationFormProps> = ({ currentUser }) => {
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
      tags: [],
    },
  });

  console.log(form.getValues());

  const isLoading = form.formState.isSubmitting;
  const contentType = form.watch("contentType");
  const tags = form.watch("tags");

  const onNext = () => {
    setStep((currentStep) => currentStep + 1);
  };

  const onBack = () => {
    setStep((currentStep) => currentStep - 1);
  };

  const handleTypeChange = useCallback(
    (type: ContentType) => {
      if (type === form.getValues().contentType) {
        return;
      }
      form.setValue("contentType", type);
      form.setValue("content", "");
    },
    [form],
  );

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
    <div className="flex h-[40vh] flex-col justify-center space-y-8">
      <div className="space-y-2">
        <p className="text-xl text-zinc-300 max-md:text-center md:text-left md:text-2xl">
          What type of content would you like to submit?
        </p>
        <hr className="w-full border-zinc-700" />
      </div>
      <FormField
        control={form.control}
        name="contentType"
        render={({ field }) => (
          <FormItem className="flex items-center justify-center space-y-4 max-md:flex-col md:flex-row md:space-x-6 md:space-y-0 lg:space-x-8">
            <FormControl>
              <button
                type="button"
                onClick={() => handleTypeChange("TEXT")}
                className={cn(
                  "relative w-40 rounded-xl bg-zinc-800 py-2.5 text-zinc-200 transition hover:bg-zinc-700 hover:text-white md:text-lg",
                  {
                    "bg-rose-600 font-semibold text-zinc-800 shadow-[0_0_20px_5px] shadow-rose-500/20 duration-200 hover:bg-rose-600 hover:text-zinc-950":
                      contentType === ContentType.TEXT,
                  },
                )}
              >
                {contentType === ContentType.TEXT && (
                  <span className="perspective pointer-events-none absolute left-0 top-[50%] h-full w-full bg-rose-500/30 md:top-[60%]" />
                )}
                Text
              </button>
            </FormControl>
            <FormControl>
              <button
                type="button"
                onClick={() => handleTypeChange("IMAGE")}
                className={cn(
                  "relative w-40 rounded-xl bg-zinc-800 py-2.5 text-zinc-200 transition hover:bg-zinc-700 hover:text-white md:text-lg",
                  {
                    "bg-rose-600 font-semibold text-zinc-800 shadow-[0_0_20px_5px] shadow-rose-500/20 duration-200 hover:bg-rose-600 hover:text-zinc-950":
                      contentType === ContentType.IMAGE,
                  },
                )}
              >
                {contentType === ContentType.IMAGE && (
                  <span className="perspective pointer-events-none absolute left-0 top-[50%] h-full w-full bg-rose-500/30 md:top-[60%]" />
                )}
                Image
              </button>
            </FormControl>
            <FormControl>
              <button
                type="button"
                onClick={() => handleTypeChange("VIDEO")}
                className={cn(
                  "relative w-40 rounded-xl bg-zinc-800 py-2.5 text-zinc-200 transition hover:bg-zinc-700 hover:text-white md:text-lg",
                  {
                    "bg-rose-600 font-semibold text-zinc-800 shadow-[0_0_20px_5px] shadow-rose-500/20 duration-200 hover:bg-rose-600 hover:text-zinc-950":
                      contentType === ContentType.VIDEO,
                  },
                )}
              >
                {contentType === ContentType.VIDEO && (
                  <span className="perspective pointer-events-none absolute left-0 top-[50%] h-full w-full bg-rose-500/30 md:top-[60%]" />
                )}
                Video
              </button>
            </FormControl>
            <FormControl>
              <button
                type="button"
                onClick={() => handleTypeChange("AUDIO")}
                className={cn(
                  "relative w-40 rounded-xl bg-zinc-800 py-2.5 text-zinc-200 transition hover:bg-zinc-700 hover:text-white md:text-lg",
                  {
                    "bg-rose-600 font-semibold text-zinc-800 shadow-[0_0_20px_5px] shadow-rose-500/20 duration-200 hover:bg-rose-600 hover:text-zinc-950":
                      contentType === ContentType.AUDIO,
                  },
                )}
              >
                {contentType === ContentType.AUDIO && (
                  <span className="perspective pointer-events-none absolute left-0 top-[50%] h-full w-full bg-rose-500/30 md:top-[60%]" />
                )}
                Audio
              </button>
            </FormControl>
          </FormItem>
        )}
      />
      <p className="text-left text-zinc-400 max-md:text-sm md:text-base">
        Note: You will get the chance to add a description for the image, video
        and audio file types.
      </p>
    </div>
  );

  titleScreen = (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem className="flex h-[40vh] flex-col justify-center space-y-4">
          <div className="space-y-2">
            <p className="text-xl text-zinc-300 max-md:text-center md:text-left md:text-2xl">
              What would you call this masterpiece?
            </p>
            <hr className="w-full border-zinc-700" />
          </div>
          <FormControl>
            <input
              placeholder="Title"
              className="w-full rounded-md bg-zinc-800 px-3 py-2 text-2xl font-semibold focus:outline-none focus:outline-2 focus:outline-zinc-700 md:text-3xl"
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
          <FormItem className="mx-auto flex h-[40vh] max-w-screen-sm flex-col justify-center space-y-4">
            <FormLabel className="text-xl text-zinc-300 max-md:text-center md:text-left md:text-2xl">
              Text heading idk
              <hr className="mt-1.5 w-full border-zinc-700" />
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
          <FormItem className="mx-auto flex h-[40vh] max-w-screen-sm flex-col justify-center space-y-4">
            <FormLabel className="text-xl text-zinc-300 max-md:text-center md:text-left md:text-2xl">
              Add an image
              <hr className="mt-1.5 w-full border-zinc-700" />
            </FormLabel>
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
  } else if (form.getValues().contentType === "VIDEO") {
    contentScreen = (
      <FormField
        name="content"
        control={form.control}
        render={({ field }) => (
          <FormItem className="mx-auto flex h-[40vh] max-w-screen-sm flex-col justify-center space-y-4">
            <FormLabel className="text-xl text-zinc-300 max-md:text-center md:text-left md:text-2xl">
              Add a video
              <hr className="mt-1.5 w-full border-zinc-700" />
            </FormLabel>{" "}
            <FormControl>
              <FileUpload
                endPoint="video"
                onChange={field.onChange}
                value={field.value}
              />
            </FormControl>
          </FormItem>
        )}
      />
    );
  } else if (form.getValues().contentType === "AUDIO") {
    contentScreen = (
      <FormField
        name="content"
        control={form.control}
        render={({ field }) => (
          <FormItem className="mx-auto flex h-[40vh] max-w-screen-sm flex-col justify-center space-y-4">
            <FormLabel className="text-xl text-zinc-300 max-md:text-center md:text-left md:text-2xl">
              Add an audio
              <hr className="mt-1.5 w-full border-zinc-700" />
            </FormLabel>
            <FormControl>
              <FileUpload
                endPoint="audio"
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
        <FormItem className="mx-auto flex h-[40vh] max-w-screen-sm flex-col justify-center space-y-4">
          <FormLabel className="text-xl text-zinc-300 max-md:text-center md:text-left md:text-2xl">
            Pick the tags that best represent your content
            <hr className="mt-1.5 w-full border-zinc-700" />
          </FormLabel>
          <FormControl>
            <MultiSelect
              onChange={(values: string[]) => {
                form.setValue("tags", values);
              }}
              options={["helkljhjklo", "hi", "hey", "hola", "bola"]}
              selectedOptions={tags}
            />
          </FormControl>
          <ul className="flex flex-wrap gap-4 text-white">
            {form.getValues().tags.map((tag, index) => (
              <li
                key={tag}
                className={cn(
                  "text-bold flex items-center justify-between gap-2 rounded-t-md rounded-bl-md rounded-br-none px-4 py-1.5 text-zinc-900",
                  {
                    "bg-rose-400": index === 0,
                    "bg-emerald-400": index === 1,
                    "bg-amber-400": index === 2,
                    "bg-sky-400": index === 3,
                    "bg-pink-400": index === 4,
                  },
                )}
              >
                {tag}
                <button
                  onClick={() =>
                    form.setValue(
                      "tags",
                      tags.filter((t) => t !== tag),
                    )
                  }
                  type="button"
                  className=""
                >
                  <X size={15} />
                </button>
              </li>
            ))}
            {!!tags.length && (
              <button
                type="button"
                onClick={() => form.setValue("tags", [])}
                className="flex w-fit items-center gap-2 rounded-sm px-3 py-2 text-white transition hover:bg-zinc-800 max-md:text-sm md:text-base"
              >
                Reset
                <RefreshCcw size={16} />
              </button>
            )}
          </ul>
        </FormItem>
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
