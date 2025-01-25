"use client";

import { Post } from "@prisma/client";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/Form";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { ExternalLink, RefreshCcw, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { allCountries } from "@/lib/constants";
import MultiSelect from "../MultiSelect";
import { allTags } from "../post-creation-form/TagSelectionSlide";
import { z } from "zod";
import { PostEditValidator } from "@/lib/validators/post";
import { zodResolver } from "@hookform/resolvers/zod";
import FileUpload from "../FileUpload";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AnimatedTabs } from "../ui/animated-tabs";
import { getYouTubeVideoId, isYouTubeUrl } from "@/lib/utils";
import Link from "next/link";
import { Label } from "../ui/Label";
import { Checkbox } from "../ui/checkbox";

interface EditPostProps {
  post: Post;
}

const EditPost: FC<EditPostProps> = ({ post }) => {
  const [preview, setPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [videoSourceType, setVideoSourceType] = useState<"file" | "url">(
    "file",
  );
  const router = useRouter();

  const form = useForm<z.infer<typeof PostEditValidator>>({
    resolver: zodResolver(PostEditValidator),
    defaultValues: {
      content: post.postContent || "",
      tags: post.tags || [],
      description: post.description || "",
      thumbnail: post.thumbnail || "",
      location: post.location || "",
      researchQuestions: post.researchQuestions || [],
    },
  });

  const tags = form.watch("tags");

  const onSubmit = async (values: z.infer<typeof PostEditValidator>) => {
    try {
      setIsLoading(true);
      if (
        values.content === post.postContent &&
        values.description === post.description &&
        values.tags.toString() == post.tags.toString() &&
        values.thumbnail === post.thumbnail
      ) {
        toast.error("No changes have been made.");
      } else {
        await axios.put(`/api/post/${post.id}`, values);
        toast.success("Post updated successfully!");
        router.push(`/post/${post.slug}`);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 flex flex-col gap-y-6">
      <div className="rounded-lg border p-4 md:p-6">
        <div className="space-y-2">
          <p className="text-lg font-medium">Title</p>
          <p className="text-sm text-zinc-400">This cannot be edited</p>
          <p className="rounded-md border bg-zinc-800 px-3 py-2 text-sm">
            {post.title}
          </p>
        </div>
      </div>

      <div className="rounded-lg border p-4 md:p-6">
        <div className="space-y-2">
          <p className="text-lg font-medium text-text-primary">Content Type</p>
          <p className="text-sm text-text-secondary">This cannot be edited</p>
          <p className="rounded-md border border-border bg-zinc-800 px-3 py-2 text-sm text-text-primary">
            {post.contentType}
          </p>
        </div>
      </div>

      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          {/* -------------------- THUMBNAIL ----------------------- */}
          {post.contentType !== "IMAGE" && (
            <FormField
              name="thumbnail"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mx-auto w-full max-w-4xl space-y-0 rounded-lg border p-4 pb-6 sm:flex sm:justify-between sm:gap-4 md:p-6">
                  <div className="max-sm:mb-2">
                    <p className="text-lg font-medium">Thumbnail</p>
                    <p className="text-sm text-zinc-400">
                      Optional but recommended
                    </p>
                  </div>
                  <FormControl>
                    <div className="flex justify-center">
                      <FileUpload
                        classNames="aspect-square mt-0 w-full max-w-[225px]"
                        endPoint="image"
                        onChange={field.onChange}
                        value={field.value || ""}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* -------------------- TEXT CONTENT ----------------------- */}
          {post.contentType === "IMAGE" && (
            <div>
              <FormField
                name="content"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-4 rounded-lg border p-4 md:p-6">
                    <div className="space-y-4">
                      <p className="font-medium">What have you got for us?</p>
                      <div className="space-y-3">
                        <AnimatedTabs
                          tabs={[
                            { id: "write", label: "Write" },
                            { id: "preview", label: "Preview" },
                          ]}
                          defaultTab={preview ? "preview" : "write"}
                          onChange={(tabId) => setPreview(tabId === "preview")}
                          layoutId="text-content-tabs"
                        />
                        <FormControl className="min-h-[200px]">
                          {preview ? (
                            form.getValues().content ? (
                              <ReactMarkdown className="prose prose-sm h-full max-w-full overflow-y-auto break-words rounded-md border p-2 text-start text-zinc-100 prose-headings:font-semibold prose-headings:text-zinc-50 prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-code:whitespace-pre-wrap prose-img:rounded-md">
                                {form.getValues().content}
                              </ReactMarkdown>
                            ) : (
                              <p className="grid h-40 place-items-center rounded-md border text-sm text-zinc-400">
                                Nothing to preview
                              </p>
                            )
                          ) : (
                            <textarea
                              {...field}
                              placeholder="What's on your mind?!"
                              className="h-full w-full resize-none rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-600"
                            />
                          )}
                        </FormControl>
                        <FormMessage />
                        <Link
                          href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
                          target="_blank"
                          className="flex w-fit items-center gap-1 text-sm text-zinc-400 transition hover:text-blue-400"
                        >
                          Markdown is supported!
                          <ExternalLink className="size-4" />
                        </Link>
                      </div>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* -------------------- AUDIO CONTENT ----------------------- */}
          {post.contentType === "AUDIO" && (
            <div>
              <p className="pb-1 text-zinc-400 max-sm:text-sm">AUDIO</p>
              <FormField
                name="content"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="rounded-lg border p-4 md:p-6">
                    <div className="space-y-4">
                      <p className="font-medium">Add an audio</p>
                      <FormControl>
                        <FileUpload
                          classNames="aspect-video"
                          endPoint="audio"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* -------------------- VIDEO CONTENT ----------------------- */}
          {post.contentType === "VIDEO" && (
            <div>
              <FormField
                name="content"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="rounded-lg border p-4 md:p-6">
                    <div className="space-y-4">
                      <p className="font-medium">Video</p>
                      <div className="space-y-3">
                        <AnimatedTabs
                          tabs={[
                            { id: "file", label: "Upload Video" },
                            { id: "url", label: "YouTube URL" },
                          ]}
                          defaultTab={
                            isYouTubeUrl(field.value) ? "url" : "file"
                          }
                          onChange={(tabId) =>
                            setVideoSourceType(tabId as "file" | "url")
                          }
                          layoutId="video-tabs"
                        />
                        <FormControl>
                          {videoSourceType === "file" ? (
                            <FileUpload
                              classNames="aspect-video"
                              endPoint="video"
                              onChange={field.onChange}
                              value={field.value}
                            />
                          ) : (
                            <div className="space-y-2">
                              <input
                                {...field}
                                placeholder="Enter YouTube video URL. e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                className="w-full rounded-md border bg-zinc-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-600"
                                onChange={(e) => {
                                  const url = e.target.value;
                                  if (isYouTubeUrl(url)) {
                                    field.onChange(url);
                                  } else {
                                    field.onChange(e.target.value);
                                  }
                                }}
                              />
                              {!isYouTubeUrl(field.value) && (
                                <p className="text-sm text-zinc-400">
                                  Paste a valid YouTube video URL starting with
                                  &lsquo;https://&rsquo;
                                </p>
                              )}
                              {isYouTubeUrl(field.value) && (
                                <iframe
                                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                                    field.value,
                                  )}`}
                                  className="aspect-video h-full w-full"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                              )}
                            </div>
                          )}
                        </FormControl>
                      </div>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* -------------------- PDF CONTENT ----------------------- */}
          {post.contentType === "PDF" && (
            <div>
              <FormField
                name="content"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="rounded-lg border p-4 md:p-6">
                    <div className="space-y-4">
                      <p className="font-medium">Upload a PDF</p>
                      <FormControl>
                        <FileUpload
                          endPoint="pdf"
                          onChange={field.onChange}
                          value={field.value}
                          classNames="aspect-[3/4] max-w-[300px]"
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* -------------------- DESCRIPTION ----------------------- */}
          {post.contentType !== "TEXT" && (
            <div>
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-4 rounded-lg border p-4 md:p-6">
                    <div>
                      <p className="font-medium">Description</p>
                      <p className="text-sm text-zinc-400">Optional</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <AnimatedTabs
                        tabs={[
                          { id: "write", label: "Write" },
                          { id: "preview", label: "Preview" },
                        ]}
                        defaultTab={preview ? "preview" : "write"}
                        onChange={(tabId) => setPreview(tabId === "preview")}
                        layoutId="description-tabs"
                      />
                      <FormControl>
                        {preview ? (
                          form.getValues().description ? (
                            <ReactMarkdown className="prose prose-sm h-full max-w-full overflow-y-auto break-words rounded-md border p-2 text-start text-zinc-100 prose-headings:font-semibold prose-headings:text-zinc-50 prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-code:whitespace-pre-wrap prose-img:rounded-md">
                              {form.getValues().description || ""}
                            </ReactMarkdown>
                          ) : (
                            <p className="rounded-md border border-background-surface bg-zinc-800 px-4 py-2 text-sm">
                              A preview of what the finished product will look
                              like.
                            </p>
                          )
                        ) : (
                          <textarea
                            {...field}
                            placeholder="Describe your content..."
                            className="h-32 resize-none rounded-md border-none bg-zinc-800 px-3 py-2 text-sm text-zinc-50 outline-none focus:outline-none"
                          />
                        )}
                      </FormControl>
                      <a
                        href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
                        target="_blank"
                        className="flex w-fit items-center gap-1 text-sm text-zinc-400 transition duration-200 hover:text-blue-500"
                      >
                        Markdown is supported!
                        <ExternalLink className="size-4" />
                      </a>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          )}

          <FormField
            control={form.control}
            name="tags"
            render={() => (
              <FormItem className="space-y-4 rounded-lg border p-4 md:p-6">
                <div>
                  <p className="font-medium">Tags</p>
                  <p className="text-sm text-zinc-400">
                    Relevant tags lead your posts to the right people!
                  </p>
                </div>
                <FormControl>
                  <MultiSelect
                    maxSelection={8}
                    onChange={(values: string[]) => {
                      form.setValue("tags", values);
                    }}
                    options={allTags}
                    selectedOptions={tags}
                  />
                </FormControl>
                {tags.length < 1 && <FormMessage />}
                <ul className="flex flex-wrap gap-4 pt-2 text-white">
                  {form.getValues().tags.map((tag, index) => (
                    <li
                      key={tag}
                      className={cn(
                        "text-bold flex items-center justify-between gap-1 rounded-md px-2.5 py-1 text-background-muted",
                        {
                          "border-2 border-rose-500 text-rose-500": index === 0,
                          "border-2 border-lime-500 text-lime-500": index === 1,
                          "border-2 border-sky-500 text-sky-500": index === 2,
                          "border-2 border-amber-500 text-amber-500":
                            index === 3,
                          "border-2 border-fuchsia-500 text-fuchsia-500":
                            index === 4,
                          "border-2 border-teal-400 text-teal-400": index === 5,
                          "border-2 border-red-400 text-red-400": index === 6,
                          "border-2 border-indigo-400 text-indigo-400":
                            index === 7,
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
                      className="morph-sm flex w-fit items-center gap-2 rounded-sm border border-background-surface bg-zinc-800 px-3 py-2 text-white transition max-md:text-sm md:text-base"
                    >
                      Reset
                      <RefreshCcw size={16} />
                    </button>
                  )}
                </ul>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="researchQuestions"
            render={({ field }) => (
              <FormItem className="w-full space-y-4 rounded-lg border p-4 md:p-6">
                <div>
                  <p className="font-medium text-text-primary">
                    Research Questions
                  </p>
                  <p className="text-sm text-text-secondary">
                    How does your post explore wellbeing? (Choose all that
                    apply)
                  </p>
                </div>
                <div className="w-full">
                  {[
                    "Challenges or barriers",
                    "What wellbeing means to you",
                    "Advice to my older or younger self",
                    "Practices, habits, and routines",
                    "The impact of digital technology",
                    "The future (fears, hopes, or dreams)",
                    "Resources or groups that support wellbeing",
                  ].map((question) => (
                    <div
                      key={question}
                      className="flex items-center gap-3 rounded-md px-2 transition-colors hover:bg-background-elevated"
                    >
                      <Checkbox
                        id={question}
                        checked={field.value?.includes(question)}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...(field.value || []), question]
                            : field.value?.filter((q) => q !== question);
                          field.onChange(newValue);
                        }}
                      />
                      <Label
                        htmlFor={question}
                        className="w-full cursor-pointer py-3 text-sm text-text-primary"
                      >
                        {question}
                      </Label>
                    </div>
                  ))}
                  <div className="flex items-center gap-3 rounded-md px-2 transition-colors hover:bg-background-elevated">
                    <Checkbox
                      id="none"
                      checked={!field.value?.length}
                      onCheckedChange={(checked) => {
                        field.onChange(checked ? [] : field.value);
                      }}
                    />
                    <Label
                      htmlFor="none"
                      className="w-full cursor-pointer py-3 text-sm text-text-primary"
                    >
                      None of the above
                    </Label>
                  </div>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="space-y-4 rounded-lg border p-4 md:p-6">
                <div>
                  <p className="font-medium">Location</p>
                </div>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border border-background-surface bg-zinc-800 text-zinc-100 outline-none">
                      <SelectValue
                        className="placeholder-zinc-400"
                        placeholder="Select a country"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[300px] rounded-sm border-background-surface bg-zinc-800 text-zinc-100">
                    {allCountries.map((c) => (
                      <SelectItem
                        className={cn(
                          "hover:bg-background-surface focus:bg-background-surface",
                          {
                            "bg-background-muted focus:bg-background-muted":
                              field.value === c.toLowerCase(),
                          },
                        )}
                        key={c}
                        value={c.toLowerCase()}
                      >
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <div className="mt-6 border-y border-background-surface">
            <p className="py-4 text-neutral-400 max-md:text-sm">
              Note: Some fields on this form are intentionally non-editable to
              prevent misuse or unintended alterations. If you require changes
              to information not available for editing on this form, please
              contact us at{" "}
              <a
                className="text-blue-400 underline"
                href="mailto:dmacd@yorku.ca"
              >
                dmacd@yorku.ca
              </a>{" "}
              with the details of the requested modifications. We appreciate
              your understanding and cooperation in maintaining the accuracy and
              integrity of our data.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <Button
              onClick={() => router.back()}
              type="button"
              disabled={isLoading}
              className="morph-md bg-zinc-800 hover:bg-zinc-800"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} variant="outline">
              Confirm Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditPost;
