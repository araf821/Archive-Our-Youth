import { AnimatedTabs } from "@/components/ui/animated-tabs";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import { PostEditValidator } from "@/lib/validators/post";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { z } from "zod";

type Props = {
  form: UseFormReturn<z.infer<typeof PostEditValidator>>;
};

export const DescriptionField = ({ form }: Props) => {
  const [preview, setPreview] = useState(false);

  return (
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
                      A preview of what the finished product will look like.
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
  );
};
