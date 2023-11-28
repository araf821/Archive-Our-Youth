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
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { ExternalLink, RefreshCcw, X } from "lucide-react";
import MultiSelect from "../MultiSelect";
import { allTags } from "../post-creation-form/TagSelectionSlide";
import { z } from "zod";

interface EditPostProps {
  post: Post;
}

const formSchema = z.object({
  content: z.string().min(3).max(2048),
  tags: z.string().array().min(1),
});

const EditPost: FC<EditPostProps> = ({ post }) => {
  const [preview, setPreview] = useState(false);

  const form = useForm({
    defaultValues: {
      content: post.postContent,
      tags: post.tags,
    },
  });

  const tags = form.watch("tags");

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                      className="flex w-fit items-center gap-1 text-zinc-400 transition duration-200 hover:text-blue-500"
                    >
                      Markdown is supported!
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <FormField
            control={form.control}
            name="tags"
            render={() => (
              <FormItem className="mt-6 w-full space-y-4">
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
                <ul className="flex flex-wrap gap-4 text-white">
                  {form.getValues().tags.map((tag, index) => (
                    <li
                      key={tag}
                      className={cn(
                        "text-bold flex items-center justify-between gap-1 rounded-md px-2.5 py-1 text-zinc-900",
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

          <div className="mt-6 border-y border-zinc-700">
            <p className="py-4">
              flex w-fit items-center gap-2 rounded-sm px-3 py-2 text-white
              transition hover:bg-zinc-800 max-md:text-sm md:text-base flex
              w-fit items-center gap-2 rounded-sm px-3 py-2 text-white
              transition hover:bg-zinc-800 max-md:text-sm md:text-base flex
              w-fit items-center gap-2 rounded-sm px-3 py-2 text-white
              transition hover:bg-zinc-800 max-md:text-sm md:text-base
            </p>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <Button type="button" className="bg-zinc-800 hover:bg-zinc-700">
              Cancel
            </Button>
            <Button type="submit" variant="outline">
              Confirm Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditPost;
