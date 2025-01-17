import { TPostCreationForm } from "@/lib/types/form";
import { FC, useState } from "react";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/Form";
import { AnimatedTabs } from "../ui/animated-tabs";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { ExternalLink } from "lucide-react";

interface DescriptionSlideProps {
  form: TPostCreationForm;
}

const DescriptionSlide: FC<DescriptionSlideProps> = ({ form }) => {
  const [preview, setPreview] = useState(false);

  return (
    <FormField
      name="description"
      control={form.control}
      render={({ field }) => (
        <FormItem className="mx-auto grid max-w-screen-sm place-items-center gap-8 md:gap-12">
          <div className="text-center">
            <p className="text-xl md:text-2xl">Add a description</p>
            <p className="text-sm text-zinc-400">Optional</p>
          </div>
          <div className="flex w-full flex-col gap-2">
            <AnimatedTabs
              tabs={[
                { id: "write", label: "Write" },
                { id: "preview", label: "Preview" },
              ]}
              defaultTab={preview ? "preview" : "write"}
              onChange={(tabId) => setPreview(tabId === "preview")}
              layoutId="description-tabs"
            />

            <FormControl className="min-h-[150px]">
              {preview ? (
                form.getValues().description ? (
                  <ReactMarkdown className="prose-headings:font-josefin prose prose-xl h-full max-w-full overflow-y-auto break-words rounded-md bg-zinc-800 p-2.5 text-start text-zinc-100 prose-headings:font-semibold prose-headings:text-zinc-50 prose-h1:m-0 prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-code:whitespace-pre-wrap prose-img:rounded-md">
                    {form.getValues().description || ""}
                  </ReactMarkdown>
                ) : (
                  <p className="grid h-40 place-items-center rounded-lg border border-background-surface bg-zinc-800 px-4 text-center">
                    A preview of what the finished product will look like.
                  </p>
                )
              ) : (
                <textarea
                  {...field}
                  placeholder="Describe your content..."
                  className="morph-sm mt-2 h-full resize-none rounded-sm border-none bg-zinc-800 px-3 py-1.5 text-lg text-zinc-50 outline-none focus:outline-none"
                />
              )}
            </FormControl>
            <a
              href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
              target="_blank"
              className="flex w-fit items-center gap-1 text-zinc-400 transition duration-200 hover:text-blue-500"
            >
              Markdown is supported!
              <ExternalLink className="size-4" />
            </a>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default DescriptionSlide;
