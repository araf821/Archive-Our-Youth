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

interface EditPostProps {
  post: Post;
}

const EditPost: FC<EditPostProps> = ({ post }) => {
  const [preview, setPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
      <div className="space-y-1">
        <p className="text-zinc-400 max-sm:text-sm">TITLE</p>
        <p className="text-xl md:text-2xl">{post.title}</p>
      </div>

      <div>
        <p className="text-zinc-400 max-sm:text-sm">POST TYPE</p>
        <p className="text-xl md:text-2xl">{post.contentType}</p>
      </div>

      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          {/* -------------------- THUMBNAIL ----------------------- */}
          {post.contentType !== "IMAGE" && (
            <FormField
              name="thumbnail"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mx-auto w-full max-w-4xl space-y-4 rounded-lg border p-4 md:p-6">
                  <div>
                    <p className="text-lg font-medium">Thumbnail</p>
                    <p className="text-sm text-zinc-400">
                      Optional but recommended
                    </p>
                  </div>
                  <FormControl>
                    <div className="flex justify-center">
                      <FileUpload
                        classNames="aspect-square w-full max-w-[200px] md:max-w-[300px] lg:max-w-[400px]"
                        endPoint="thumbnail"
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
              <p className="text-zinc-400 max-sm:text-sm">CONTENT</p>
              <FormField
                name="content"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <div className="mx-auto space-x-2">
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => setPreview(false)}
                        className={cn(
                          "bg-zinc-800 transition duration-300 hover:-translate-y-0.5 hover:bg-background-surface",
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
                          "bg-zinc-800 transition duration-300 hover:-translate-y-0.5 hover:bg-background-surface",
                          {
                            "bg-gradient-to-br from-lime-500 to-emerald-600 text-black":
                              preview,
                          },
                        )}
                      >
                        Preview
                      </Button>
                    </div>
                    <FormControl className="w-full">
                      {preview ? (
                        form.getValues().content ? (
                          <ReactMarkdown className="prose-headings:font-josefin prose prose-xl h-full max-w-full overflow-y-auto break-words rounded-md bg-zinc-800 p-2.5 text-start text-zinc-100 prose-headings:font-semibold prose-headings:text-zinc-50 prose-h1:m-0 prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-code:whitespace-pre-wrap prose-img:rounded-md">
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
                          placeholder="Content of your post..."
                          className="h-[400px] resize-none rounded-sm border-none bg-zinc-800 px-3 py-1.5 text-lg text-zinc-50 outline-none focus:outline-none"
                        />
                      )}
                    </FormControl>
                    <a
                      href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
                      target="_blank"
                      className="flex w-fit items-center gap-1 text-xs text-zinc-400 transition duration-200 hover:text-blue-500 sm:text-sm"
                    >
                      Markdown is supported!
                      <ExternalLink className="size-4" />
                    </a>
                    <FormMessage />
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
                  <FormItem className="">
                    <FormControl>
                      <FileUpload
                        classNames="aspect-square"
                        endPoint="audio"
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* -------------------- VIDEO CONTENT ----------------------- */}
          {post.contentType === "VIDEO" && (
            <div>
              <p className="text-zinc-400 max-sm:text-sm">VIDEO</p>
              <FormField
                name="content"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="">
                    <FormControl>
                      <FileUpload
                        classNames="aspect-video"
                        endPoint="video"
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* -------------------- PDF CONTENT ----------------------- */}
          {post.contentType === "PDF" && (
            <div>
              <p className="text-zinc-400 max-sm:text-sm">VIDEO</p>
              <FormField
                name="content"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="">
                    <FormControl>
                      <FileUpload
                        classNames="aspect-[3/4]"
                        endPoint="pdf"
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* -------------------- DESCRIPTION ----------------------- */}
          {post.contentType !== "TEXT" && (
            <div>
              <p className="text-zinc-400 max-sm:text-sm">DESCRIPTION</p>
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <div className="mx-auto space-x-2">
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => setPreview(false)}
                        className={cn(
                          "bg-zinc-800 transition duration-300 hover:-translate-y-0.5 hover:bg-background-surface",
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
                          "bg-zinc-800 transition duration-300 hover:-translate-y-0.5 hover:bg-background-surface",
                          {
                            "bg-gradient-to-br from-lime-500 to-emerald-600 text-black":
                              preview,
                          },
                        )}
                      >
                        Preview
                      </Button>
                    </div>
                    <FormControl className="w-full">
                      {preview ? (
                        form.getValues().description ? (
                          <ReactMarkdown className="prose-headings:font-josefin prose prose-xl h-full max-w-full overflow-y-auto break-words rounded-md bg-zinc-800 p-2.5 text-start text-zinc-100 prose-headings:font-semibold prose-headings:text-zinc-50 prose-h1:m-0 prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-code:whitespace-pre-wrap prose-img:rounded-md">
                            {form.getValues().description || ""}
                          </ReactMarkdown>
                        ) : (
                          <p className="grid h-96 place-items-center text-zinc-400">
                            Nothing to preview yet
                          </p>
                        )
                      ) : (
                        <textarea
                          {...field}
                          placeholder="Optional description for your post..."
                          className="h-[400px] resize-none rounded-sm border-none bg-zinc-800 px-3 py-1.5 text-lg text-zinc-50 outline-none focus:outline-none"
                        />
                      )}
                    </FormControl>
                    <a
                      href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
                      target="_blank"
                      className="flex w-fit items-center gap-1 text-xs text-zinc-400 transition duration-200 hover:text-blue-500 sm:text-sm"
                    >
                      Markdown is supported!
                      <ExternalLink className="size-4" />
                    </a>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <hr className="mt-4 border-background-surface" />

          <FormField
            control={form.control}
            name="tags"
            render={() => (
              <FormItem className="mt-6 w-full">
                <p className="text-zinc-400 max-md:text-sm">TAGS</p>
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

          <div className="mt-6">
            <p className="text-zinc-400 max-sm:text-sm">RESEARCH QUESTIONS</p>
            <FormField
              control={form.control}
              name="researchQuestions"
              render={({ field }) => (
                <div className="space-y-2 rounded-md bg-zinc-800 p-4">
                  {[
                    "Challenges or barriers",
                    "What wellbeing means to you",
                    "Advice to my older or younger self",
                    "Practices, habits, and routines",
                    "The impact of digital technology",
                    "The future (fears, hopes, or dreams)",
                    "Resources or groups that support wellbeing",
                  ].map((question) => (
                    <div key={question} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value?.includes(question)}
                        onChange={(e) => {
                          const newValue = e.target.checked
                            ? [...(field.value || []), question]
                            : field.value?.filter(
                                (q: string) => q !== question,
                              );
                          field.onChange(newValue);
                        }}
                        className="h-4 w-4 rounded border-zinc-500 bg-zinc-700 text-lime-500 focus:ring-lime-500"
                      />
                      <label className="text-sm text-zinc-100">
                        {question}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="mt-6">
                <p className="text-zinc-400 max-sm:text-sm">LOCATION</p>
                <FormControl>
                  <div className="rounded-md bg-zinc-800 p-4">
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="border border-background-surface bg-zinc-800 text-zinc-100 outline-none">
                        <SelectValue
                          className="placeholder-zinc-400"
                          placeholder="Select a country"
                        />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px] rounded-sm border-background-surface bg-zinc-800 text-zinc-100">
                        {allCountries.map((c) => (
                          <SelectItem
                            className="hover:bg-background-surface focus:bg-background-surface"
                            key={c}
                            value={c.toLowerCase()}
                          >
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </FormControl>
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
