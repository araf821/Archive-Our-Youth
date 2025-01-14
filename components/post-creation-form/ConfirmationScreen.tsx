import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { PostCreationValidator } from "@/lib/validators/post";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Tag from "@/components/Tag";
import { CarouselApi } from "@/components/ui/carousel";
import { useAuth } from "@clerk/nextjs";
import { ConsentForm } from "./ConsentForm";

interface ConfirmationScreenProps {
  form: UseFormReturn<z.infer<typeof PostCreationValidator>>;
  api: CarouselApi | null;
  isLoading: boolean;
  checked: boolean;
  error: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const ConfirmationScreen = ({
  form,
  api,
  isLoading,
  checked,
  error,
  onCheckedChange,
}: ConfirmationScreenProps) => {
  const { userId } = useAuth();
  const contentType = form.watch("contentType");
  const tags = form.watch("tags");

  return (
    <div className="mx-auto flex max-w-screen-sm flex-col justify-center space-y-4">
      {form.formState.errors.researchQuestions && (
        <p className="text-sm text-rose-500">
          {form.formState.errors.researchQuestions.message}
        </p>
      )}
      <div>
        <p className="text-xl text-zinc-100 md:text-2xl">Review Submission</p>
        {userId ? null : (
          <p className="text-left text-zinc-300 max-md:text-sm md:text-base">
            Posting <span className="font-bold text-rose-500">anonymously</span>
            , you will not be able to delete your post later without contacting
            us.
          </p>
        )}
        <hr className="mt-1.5 w-full border-zinc-700" />
      </div>
      <div className="max-h-[60dvh] divide-y-2 divide-zinc-700 overflow-y-auto rounded-md border border-zinc-700 px-4">
        <div className="py-4">
          <p>
            Research Questions <span className="text-zinc-400">(optional)</span>
          </p>
          {form.getValues().researchQuestions.length < 1 ? (
            <p className="mt-2 text-zinc-400">
              None selected,{" "}
              <button
                type="button"
                onClick={() => api?.scrollTo(1)}
                className="text-left normal-case text-blue-400"
              >
                click here to navigate back.
              </button>
            </p>
          ) : (
            <ul className="mt-2 space-y-2 text-zinc-300">
              {form.getValues().researchQuestions.map((q) => (
                <li className="ml-6 list-disc" key={q}>
                  {q}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="py-4 capitalize">
          <p className="pb-2">Post Type</p>
          <span className="font-bold">{contentType.toLowerCase()}</span>
        </div>

        <div className="py-4 capitalize">
          <p
            className={cn("pb-2", {
              "text-red-500": !!form.formState.errors.title,
            })}
          >
            Title
          </p>
          {!!form.formState.errors.title && (
            <p className="pb-2 text-sm font-medium text-red-500/80 max-md:text-xs">
              {form.formState.errors.title.message}
            </p>
          )}
          <span className="break-words font-bold">
            {form.getValues().title || (
              <p className="font-normal normal-case text-zinc-400">
                Title is missing,{" "}
                <button
                  type="button"
                  onClick={() => api?.scrollTo(3)}
                  className="text-left normal-case text-blue-400"
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
              <p
                className={cn("pb-2", {
                  "text-red-500": !!form.formState.errors.content,
                })}
              >
                Content
              </p>
              {!!form.formState.errors.content && (
                <p className="pb-2 text-sm font-medium text-red-500/80 max-md:text-xs">
                  {form.formState.errors.content.message}
                </p>
              )}
              {form.getValues().content ? (
                <ReactMarkdown className="prose-headings:font-josefin prose prose-xl h-full max-w-full overflow-y-auto break-words rounded-md bg-zinc-800 p-2.5 text-start text-zinc-100 prose-headings:font-semibold prose-headings:text-zinc-50 prose-h1:m-0 prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-code:whitespace-pre-wrap prose-img:rounded-md">
                  {form.getValues().content || ""}
                </ReactMarkdown>
              ) : (
                <p className="text-zinc-400">
                  No text to preview,{" "}
                  <button
                    onClick={() => api?.scrollTo(4)}
                    type="button"
                    className="text-left text-blue-400"
                  >
                    click here to get back to the content screen.
                  </button>
                </p>
              )}
            </>
          )}
          {contentType !== "TEXT" && !form.getValues().content ? (
            <>
              <p
                className={cn("", {
                  "text-red-500": form.formState.errors.content,
                })}
              >
                Uploaded Content
              </p>
              <p className="text-zinc-400">
                <span className="capitalize">{contentType.toLowerCase()}</span>{" "}
                not added yet,{" "}
                <button
                  type="button"
                  onClick={() => api?.scrollTo(4)}
                  className="text-left text-blue-400"
                >
                  click here to go to the upload screen.
                </button>
              </p>
            </>
          ) : (
            <>
              {contentType === "IMAGE" && (
                <div className="relative aspect-video w-full">
                  <p className="pb-4">Uploaded Content</p>
                  <Image
                    fill
                    src={form.getValues().content}
                    className="object-contain"
                    alt="post image"
                  />
                </div>
              )}
              {contentType === "VIDEO" && (
                <div className="relative aspect-video">
                  <p className="pb-4">Uploaded Content</p>
                  {form.getValues().content.startsWith("http") ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${
                        form
                          .getValues()
                          .content.includes("youtube.com/watch?v=")
                          ? form
                              .getValues()
                              .content.split("v=")[1]
                              .split("&")[0]
                          : form.getValues().content.split("/").pop()
                      }`}
                      className="h-full w-full rounded-md"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={form.getValues().content}
                      className="object-cover"
                      controls
                    />
                  )}
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
              {contentType === "PDF" && (
                <div className="w-full">
                  <p className="pb-4">PDF</p>
                  <Link
                    href={form.getValues().content}
                    target="_blank"
                    className="group relative font-semibold text-blue-600 transition hover:text-blue-500"
                  >
                    Click to view
                    <span className="absolute bottom-0 left-0 h-[1px] w-full origin-bottom-left scale-x-0 bg-blue-600 transition group-hover:scale-x-100 group-hover:bg-blue-500" />
                  </Link>
                </div>
              )}
            </>
          )}
        </div>

        {contentType !== "IMAGE" && (
          <div className="space-y-2 py-4">
            <p>
              Thumbnail <span className="text-zinc-400">(optional)</span>
            </p>
            {form.getValues("thumbnail") ? (
              <div className="relative aspect-video w-full">
                <Image
                  fill
                  src={form.getValues().thumbnail || "/failed-to-load.webp"}
                  className="object-contain"
                  alt="post image"
                />
              </div>
            ) : (
              <p className="text-zinc-400">
                Thumbnail was not added,{" "}
                <button
                  type="button"
                  onClick={() => api?.scrollTo(5)}
                  className="text-left text-blue-400"
                >
                  click here to go to the upload screen.
                </button>
              </p>
            )}
          </div>
        )}

        {contentType !== "TEXT" && (
          <div className="py-4">
            <p
              className={cn("pb-2", {
                "text-red-500": !!form.formState.errors.description,
              })}
            >
              Description <span className="text-zinc-400">(optional)</span>
            </p>
            {!!form.formState.errors.description && (
              <p className="pb-2 text-sm font-medium text-red-500/80 max-md:text-xs">
                {form.formState.errors.description.message}
              </p>
            )}
            {form.getValues().description ? (
              <ReactMarkdown className="prose-headings:font-josefin prose prose-xl h-full max-w-full overflow-y-auto break-words rounded-md bg-zinc-800 p-2.5 text-start text-zinc-100 prose-headings:font-semibold prose-headings:text-zinc-50 prose-h1:m-0 prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-code:whitespace-pre-wrap prose-img:rounded-md">
                {form.getValues().description || ""}
              </ReactMarkdown>
            ) : (
              <p className="text-zinc-400">
                Description was not added,{" "}
                <button
                  type="button"
                  onClick={() => api?.scrollTo(6)}
                  className="text-left text-blue-400"
                >
                  click to navigate back.
                </button>
              </p>
            )}
          </div>
        )}

        <div className="py-4">
          <p
            className={cn("pb-2", {
              "text-red-500":
                (tags.length < 1 || tags.length > 8) &&
                form.formState.errors.tags,
            })}
          >
            Tags
          </p>
          {form.getValues().tags.length < 1 && (
            <p className="text-zinc-400">
              At least one tag is required,{" "}
              <button
                type="button"
                onClick={() => {
                  contentType === "TEXT" ? api?.scrollTo(6) : api?.scrollTo(7);
                }}
                className="text-left text-blue-400"
              >
                click here to navigate to the tags screen.
              </button>
            </p>
          )}
          <ul className="flex flex-wrap gap-2 pt-2">
            {form.getValues().tags.map((tag, index) => (
              <Tag key={tag} index={index} tag={tag} />
            ))}
          </ul>
        </div>

        <div className="py-4">
          <p>Posting from</p>
          <p className="pt-2 font-semibold capitalize tracking-wider">
            {form.getValues("location")}
          </p>
        </div>

        <ConsentForm
          checked={checked}
          error={error}
          onCheckedChange={onCheckedChange}
        />
      </div>

      <button
        type="submit"
        disabled={
          isLoading ||
          !!form.formState.errors.content ||
          !!form.formState.errors.contentType ||
          !!form.formState.errors.title ||
          !!form.formState.errors.description
        }
        className="morph-md rounded-md bg-zinc-800 px-3 py-2 transition hover:bg-zinc-700 disabled:opacity-70 disabled:hover:bg-zinc-800"
      >
        {!!form.formState.errors.content ||
        !!form.formState.errors.contentType ||
        !!form.formState.errors.title ||
        !!form.formState.errors.description
          ? "Form Incomplete"
          : "Submit Post"}
      </button>
    </div>
  );
};
