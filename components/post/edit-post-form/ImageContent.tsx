"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import { UseFormReturn } from "react-hook-form";
import { PostEditValidator } from "@/lib/validators/post";
import { z } from "zod";

interface ImageContentProps {
  form: UseFormReturn<z.infer<typeof PostEditValidator>>;
  preview: boolean;
  setPreview: (preview: boolean) => void;
}

export const ImageContent = ({
  form,
  preview,
  setPreview,
}: ImageContentProps) => {
  return (
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
  );
};
