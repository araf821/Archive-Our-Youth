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
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { ExternalLink } from "lucide-react";

import { TagsInput } from "./edit-post-form/TagsInput";
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
import { ResearchQuestions } from "./edit-post-form/ResearchQuestions";
import { LocationSelect } from "./edit-post-form/LocationSelect";
import { DescriptionField } from "./edit-post-form/DescriptionField";
import DynamicImage from "../DynamicImage";

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

  const onSubmit = async (values: z.infer<typeof PostEditValidator>) => {
    try {
      setIsLoading(true);

      console.log("researchQuestions", values.researchQuestions);
      console.log("post.researchQuestions", post.researchQuestions);

      if (
        values.content === post.postContent &&
        values.description === post.description &&
        values.tags.toString() == post.tags.toString() &&
        values.thumbnail === post.thumbnail &&
        values.researchQuestions.toString() ==
          post.researchQuestions.toString() &&
        values.location === post.location
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
          {post.contentType === "IMAGE" && (
            <DynamicImage src={post.postContent} alt={post.title} />
          )}
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
          {post.contentType === "TEXT" && (
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
          {post.contentType !== "TEXT" && <DescriptionField form={form} />}

          <TagsInput form={form} />

          <ResearchQuestions form={form} />

          <LocationSelect form={form} />

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
