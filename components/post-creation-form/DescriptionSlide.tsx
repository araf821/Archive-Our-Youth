import { FC, useState } from "react";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import { TPostCreationForm } from "@/lib/types/form";

import { AnimatedTabs } from "../ui/animated-tabs";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/Form";

interface DescriptionSlideProps {
  form: TPostCreationForm;
}

const DescriptionSlide: FC<DescriptionSlideProps> = ({ form }) => {
  const t = useTranslations("PostCreation.slides.description");
  const [preview, setPreview] = useState(false);

  return (
    <FormField
      name="description"
      control={form.control}
      render={({ field }) => (
        <FormItem className="space-y-4 rounded-lg border p-4 md:p-6">
          <div>
            <p className="font-medium">{t("label")}</p>
            <p className="text-sm text-zinc-400">{t("optional")}</p>
          </div>
          <div className="flex flex-col gap-2">
            <AnimatedTabs
              tabs={[
                { id: "write", label: t("write") },
                { id: "preview", label: t("preview") },
              ]}
              defaultTab={preview ? "preview" : "write"}
              onChange={(tabId) => setPreview(tabId === "preview")}
              layoutId="description-tabs"
            />

            <FormControl>
              {preview ? (
                form.getValues().description ? (
                  <ReactMarkdown className="prose-headings:font-josefin prose h-full max-w-full overflow-y-auto break-words rounded-md bg-zinc-800 p-2.5 text-start text-zinc-100 prose-headings:font-semibold prose-headings:text-zinc-50 prose-h1:m-0 prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-code:whitespace-pre-wrap prose-img:rounded-md">
                    {form.getValues().description || ""}
                  </ReactMarkdown>
                ) : (
                  <p className="rounded-md border border-background-surface bg-zinc-800 px-4 py-2 text-sm">
                    {t("previewEmpty")}
                  </p>
                )
              ) : (
                <textarea
                  {...field}
                  placeholder={t("placeholder")}
                  className="h-32 resize-none rounded-md border-none bg-zinc-800 px-3 py-2 text-sm text-zinc-50 outline-none focus:outline-none"
                />
              )}
            </FormControl>
            <a
              href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
              target="_blank"
              className="flex w-fit items-center gap-1 text-sm text-zinc-400 transition duration-200 hover:text-blue-500"
            >
              {t("markdownSupported")}
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
