"use client";

import { FC, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import axios from "axios";

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
import Image from "next/image";
import { ScrollArea } from "./ui/ScrollArea";
import { toast } from "./ui/useToast";

interface PostCreationFormProps {
  currentUser: User | null;
}

enum STEPS {
  WELCOME = 0,
  TYPE = 1,
  TITLE = 2,
  CONTENT = 3,
  DESCRIPTION = 4,
  TAGS = 5,
  CONFIRM = 6,
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
  content: z
    .string()
    .min(3, {
      message: "Content must be between 5 and 2000 characters in length.",
    })
    .max(2000, {
      message: "Content must be between 5 and 2000 characters in length.",
    }),
  description: z
    .string()
    .max(2000, {
      message: "Description must be less than 2000 characters in length",
    })
    .optional(),
  tags: z
    .string()
    .array()
    .min(1, { message: "At least one tag is required." })
    .max(8, { message: "You can only choose up to 8 tags." }),
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

  const isLoading = form.formState.isSubmitting;
  const contentType = form.watch("contentType");
  const tags = form.watch("tags");

  const onNext = () => {
    setStep((currentStep) => {
      if (contentType === "TEXT" && step === STEPS.CONTENT) {
        return currentStep + 2;
      }
      return currentStep + 1;
    });
  };

  const onBack = () => {
    setStep((currentStep) => {
      if (contentType === "TEXT" && step === STEPS.TAGS) {
        return currentStep - 2;
      }
      return currentStep - 1;
    });
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/post", values);
      toast({ title: "Your post has been published!" });
      form.reset();
      router.push("/collage");
    } catch (error: any) {
      toast({ title: "Something went wrong.", variant: "destructive" });
      console.log(error);
    }
  };

  let introScreen,
    typeSelectionScreen,
    titleScreen,
    contentScreen,
    tagsScreen,
    descriptionScreen,
    confirmationScreen;

  introScreen = (
    <div
      className={`flex max-w-screen-lg flex-col items-center justify-center gap-12 text-center ${
        step > 1 && "hidden"
      }`}
    >
      <p className="flex flex-col font-karla gap-2 text-6xl font-bold text-zinc-100 md:text-9xl">
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
    <div className="flex flex-col justify-center space-y-8">
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
                    "bg-gradient-to-br from-red-400 to-red-600 font-semibold text-zinc-800 shadow-[0_0_20px_5px] shadow-rose-500/30 duration-200 hover:bg-rose-600 hover:text-zinc-950":
                      contentType === ContentType.TEXT,
                  },
                )}
              >
                {contentType === ContentType.TEXT && (
                  <span className="perspective pointer-events-none absolute left-0 top-[50%] h-full w-full bg-gradient-to-br from-red-400/70 to-rose-700/70 md:top-[60%]" />
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
                    "bg-gradient-to-br from-lime-400 to-emerald-500 font-semibold text-zinc-800 shadow-[0_0_20px_5px] shadow-lime-500/30 duration-200 hover:text-zinc-950":
                      contentType === ContentType.IMAGE,
                  },
                )}
              >
                {contentType === ContentType.IMAGE && (
                  <span className="perspective pointer-events-none absolute left-0 top-[50%] h-full w-full bg-gradient-to-br from-lime-400/70 to-emerald-600/70 md:top-[60%]" />
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
                    "bg-gradient-to-br from-teal-400 to-sky-700 font-semibold text-zinc-800 shadow-[0_0_20px_5px] shadow-sky-500/30 duration-200 hover:text-zinc-950":
                      contentType === ContentType.VIDEO,
                  },
                )}
              >
                {contentType === ContentType.VIDEO && (
                  <span className="perspective pointer-events-none absolute left-0 top-[50%] h-full w-full bg-gradient-to-tr from-teal-400/70 to-sky-700/70 md:top-[60%]" />
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
                    "bg-gradient-to-br from-amber-400 to-orange-600 font-semibold text-zinc-800 shadow-[0_0_20px_5px] shadow-orange-500/30 duration-200 hover:text-zinc-950":
                      contentType === ContentType.AUDIO,
                  },
                )}
              >
                {contentType === ContentType.AUDIO && (
                  <span className="perspective pointer-events-none absolute left-0 top-[50%] h-full w-full bg-gradient-to-tr from-amber-400/70 to-orange-600/70 md:top-[60%]" />
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
              What would you like to call this masterpiece?
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
          <FormMessage />
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
                    "bg-gradient-to-br from-lime-500 to-emerald-600 text-black":
                      !preview,
                  },
                )}
              >
                Write
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={() => {
                  if (form.getValues().content) {
                    setPreview(true);
                  }
                }}
                className={cn(
                  "bg-zinc-800 transition duration-300 hover:-translate-y-0.5 hover:bg-zinc-700",
                  {
                    "bg-gradient-to-br from-lime-500 to-emerald-600 text-black":
                      preview,
                  },
                )}
              >
                Preview
              </Button>
            </div>
            <FormControl>
              {preview ? (
                form.getValues().content ? (
                  <ReactMarkdown className="prose-headings:font-josefin prose h-full max-w-full overflow-y-auto break-words rounded-md bg-zinc-100 p-2.5 text-start text-zinc-800 prose-headings:font-semibold prose-headings:text-zinc-950 prose-h1:m-0 prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-code:whitespace-pre-wrap prose-img:rounded-md">
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
                  className="h-full resize-none rounded-sm border-none bg-zinc-800 px-3 py-1.5 text-lg text-zinc-50 outline-none focus:outline-none"
                />
              )}
            </FormControl>
            <FormMessage />
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

  descriptionScreen = (
    <FormField
      name="description"
      control={form.control}
      render={({ field }) => (
        <FormItem className="mx-auto flex h-[40vh] max-w-screen-sm flex-col justify-center space-y-4">
          <FormLabel className="text-xl text-zinc-300 max-md:text-center md:text-left md:text-2xl">
            Add a description (optional)
            <hr className="mt-1.5 w-full border-zinc-700" />
          </FormLabel>
          <div className="w-fit space-x-2">
            <Button
              type="button"
              size="sm"
              onClick={() => setPreview(false)}
              className={cn(
                "bg-zinc-800 transition duration-300 hover:-translate-y-0.5 hover:bg-zinc-700",
                {
                  "bg-gradient-to-br from-lime-500 to-emerald-600 text-black":
                    !preview,
                },
              )}
            >
              Write
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => {
                if (form.getValues().description) {
                  setPreview(true);
                }
              }}
              className={cn(
                "bg-zinc-800 transition duration-300 hover:-translate-y-0.5 hover:bg-zinc-700",
                {
                  "bg-gradient-to-br from-lime-500 to-emerald-600 text-black":
                    preview,
                },
              )}
            >
              Preview
            </Button>
          </div>

          <FormControl>
            {preview ? (
              form.getValues().description ? (
                <ReactMarkdown className="prose-headings:font-josefin prose h-full max-w-full overflow-y-auto break-words rounded-md bg-zinc-100 p-2.5 text-start text-zinc-800 prose-headings:font-semibold prose-headings:text-zinc-950 prose-h1:m-0 prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-code:whitespace-pre-wrap prose-img:rounded-md">
                  {form.getValues().description || ""}
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
                className="h-full resize-none rounded-sm border-none bg-zinc-800 px-3 py-1.5 text-lg text-zinc-50 outline-none focus:outline-none"
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  tagsScreen = (
    <FormField
      control={form.control}
      name="tags"
      render={() => (
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
              options={dummyTags}
              selectedOptions={tags}
            />
          </FormControl>
          <FormMessage />
          <ul className="flex flex-wrap gap-4 text-white">
            {form.getValues().tags.map((tag, index) => (
              <li
                key={tag}
                className={cn(
                  "text-bold flex items-center justify-between gap-2 rounded-lg px-4 py-1.5 text-zinc-900",
                  {
                    "border-2 border-rose-500 text-rose-500": index === 0,
                    "border-2 border-lime-500 text-lime-500": index === 1,
                    "border-2 border-sky-500 text-sky-500": index === 2,
                    "border-2 border-amber-500 text-amber-500": index === 3,
                    "border-2 border-fuchsia-500 text-fuchsia-500": index === 4,
                    "border-2 border-teal-400 text-teal-400": index === 5,
                    "border-2 border-red-400 text-red-400": index === 6,
                    "border-2 border-indigo-400 text-indigo-400": index === 7,
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
          {/* <FormMessage /> */}
        </FormItem>
      )}
    />
  );

  confirmationScreen = (
    <ScrollArea className="mx-auto flex h-[60vh] max-w-screen-sm flex-col justify-center space-y-4 overflow-y-auto">
      <div className="pb-4 text-xl text-zinc-300 md:text-2xl">
        Review Submission
        <p className="text-left text-zinc-300 max-md:text-sm md:text-base">
          Please review your content one last time before submitting
        </p>
        <hr className="mt-1.5 w-full border-zinc-700" />
      </div>
      <div className="divide-y-2 divide-zinc-700 rounded-md border border-zinc-700 px-4">
        <div className="pb-3 pt-5 capitalize">
          <p className="pb-2">Post Type</p>
          <span className="font-bold">{contentType.toLowerCase()}</span>
        </div>
        <div className="py-4 capitalize">
          <p className="pb-2">Title</p>
          <span className="font-bold">
            {form.getValues().title || (
              <p className="font-normal normal-case text-zinc-400">
                Title is missing,{" "}
                <button
                  onClick={() => setStep(STEPS.TITLE)}
                  className="normal-case text-blue-400"
                >
                  click here to navigate to the title screen.
                </button>
              </p>
            )}
          </span>
        </div>
        <div className="py-4">
          {contentType === "TEXT" && (
            <>
              <p className="pb-2">Content</p>
              {form.getValues().content ? (
                <ReactMarkdown className="scroll-y-auto prose-headings:font-josefin prose h-full max-h-40 max-w-full overflow-y-auto break-words rounded-md bg-zinc-100 p-2.5 text-start text-zinc-800 prose-headings:font-semibold prose-headings:text-zinc-950 prose-h1:m-0 prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-code:whitespace-pre-wrap prose-img:rounded-md">
                  {form.getValues().content || ""}
                </ReactMarkdown>
              ) : (
                <p className="text-zinc-400">
                  No text to preview,{" "}
                  <button
                    onClick={() => setStep(3)}
                    type="button"
                    className="text-blue-400"
                  >
                    click here to get back to the content screen.
                  </button>
                </p>
              )}
            </>
          )}
          {contentType !== "TEXT" && !form.getValues().content ? (
            <p className="text-zinc-400">
              <span className="capitalize">{contentType.toLowerCase()}</span>{" "}
              not added yet,{" "}
              <button
                type="button"
                onClick={() => setStep(STEPS.CONTENT)}
                className="text-blue-400"
              >
                click here to go to the upload screen.
              </button>
            </p>
          ) : (
            <>
              {contentType === "IMAGE" && (
                <div className="relative aspect-video w-full">
                  <Image
                    fill
                    src={form.getValues().content}
                    className="object-contain"
                    alt="post image"
                  />
                </div>
              )}
              {contentType === "VIDEO" && (
                <div className="relative aspect-video ">
                  <p className="pb-4">Uploaded Content</p>
                  <video
                    src={form.getValues().content}
                    className="object-cover"
                    controls
                  />
                </div>
              )}
              {contentType === "AUDIO" && (
                <div className="w-full">
                  <p className="pb-4">Uploaded Content</p>
                  <audio
                    src={form.getValues().content}
                    controls
                    className="w-full"
                  />
                </div>
              )}
            </>
          )}
        </div>
        {contentType !== "TEXT" && (
          <div className="py-4">
            <p className="pb-2">Description (optional)</p>
            {form.getValues().description ? (
              <ReactMarkdown className="scroll-y-auto prose-headings:font-josefin prose h-full max-h-40 max-w-full overflow-y-auto break-words rounded-md bg-zinc-100 p-2.5 text-start text-zinc-800 prose-headings:font-semibold prose-headings:text-zinc-950 prose-h1:m-0 prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-code:whitespace-pre-wrap prose-img:rounded-md">
                {form.getValues().description || ""}
              </ReactMarkdown>
            ) : (
              <p className="text-zinc-400">Description was not added</p>
            )}
          </div>
        )}
        <div className="py-4">
          <p className={cn("pb-2", { "text-red-500": tags.length < 1 })}>Tag</p>
          {form.getValues().tags.length < 1 && (
            <p className="text-zinc-400">
              At least one tag is required,{" "}
              <button
                type="button"
                onClick={() => setStep(STEPS.TAGS)}
                className="text-blue-400"
              >
                click here to navigate to the tags screen.
              </button>
            </p>
          )}
          <div className="flex flex-wrap gap-2 pt-2">
            {form.getValues().tags.map((tag, index) => (
              <li
                key={tag}
                className={cn(
                  "text-bold flex items-center justify-between gap-2 rounded-lg px-3 py-1 text-zinc-900",
                  {
                    "border-2 border-rose-500 text-rose-500": index === 0,
                    "border-2 border-lime-500 text-lime-500": index === 1,
                    "border-2 border-sky-500 text-sky-500": index === 2,
                    "border-2 border-amber-500 text-amber-500": index === 3,
                    "border-2 border-fuchsia-500 text-fuchsia-500": index === 4,
                    "border-2 border-teal-400 text-teal-400": index === 5,
                    "border-2 border-red-400 text-red-400": index === 6,
                    "border-2 border-indigo-400 text-indigo-400": index === 7,
                  },
                )}
              >
                {tag}
              </li>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );

  return (
    <div className="w-full max-w-screen-md px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {step === STEPS.WELCOME && introScreen}
          {step === STEPS.TYPE && typeSelectionScreen}
          {step === STEPS.TITLE && titleScreen}
          {step === STEPS.CONTENT && contentScreen}
          {step === STEPS.DESCRIPTION &&
            contentType !== "TEXT" &&
            descriptionScreen}
          {step === STEPS.TAGS && tagsScreen}
          {step === STEPS.CONFIRM && confirmationScreen}
        </form>
      </Form>
      {step > 0 && (
        <div
          className={cn(
            "absolute inset-x-0 bottom-12 md:bottom-32 mx-auto mt-8 flex w-32 items-center justify-between",
            {
              "w-full max-w-[350px]": step === STEPS.CONFIRM,
            },
          )}
        >
          <Button
            type="button"
            onClick={onBack}
            variant="link"
            className="px-0 text-zinc-400 hover:scale-105 hover:text-zinc-200"
          >
            <ArrowLeft />
          </Button>
          {step === STEPS.CONFIRM ? (
            <button
              disabled={isLoading}
              className="rounded-md bg-zinc-800 px-3 py-2 transition hover:bg-zinc-700"
              onClick={form.handleSubmit(onSubmit)}
            >
              Submit Post
            </button>
          ) : (
            <Button
              type="button"
              onClick={onNext}
              variant="link"
              className="px-0 text-zinc-400 hover:scale-105 hover:text-zinc-200"
            >
              <ArrowRight />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCreationForm;

const dummyTags = [
  "art",
  "photography",
  "painting",
  "digitalart",
  "illustration",
  "design",
  "sculpture",
  "crafts",
  "drawing",
  "animation",
  "videography",
  "shortfilm",
  "documentary",
  "music",
  "audio",
  "poetry",
  "prose",
  "writing",
  "journal",
  "diary",
  "creative",
  "visual",
  "storytelling",
  "experimental",
  "abstract",
  "nature",
  "architecture",
  "landscape",
  "portrait",
  "conceptual",
  "urban",
  "vintage",
  "contemporary",
  "minimalism",
  "collage",
  "mixedmedia",
  "performance",
  "installation",
  "digitalmedia",
  "webdesign",
  "technology",
  "fashion",
  "craftsmanship",
  "foodart",
  "travel",
  "adventure",
  "inspiration",
  "love",
  "emotions",
  "life",
  "reflection",
];
