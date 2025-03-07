import { FC, useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import { TPostCreationForm } from "@/lib/types/form";
import { getYouTubeVideoId, isYouTubeUrl } from "@/lib/utils";

import FileUpload from "../file-upload/FileUpload";
import { AnimatedTabs } from "../ui/animated-tabs";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/Form";

interface ContentSlideProps {
  form: TPostCreationForm;
}

const ContentSlide: FC<ContentSlideProps> = ({ form }) => {
  const t = useTranslations("PostCreation.slides.content");
  const [preview, setPreview] = useState(false);
  const [videoSourceType, setVideoSourceType] = useState<"url" | "file">(
    "file",
  );

  if (form.getValues().contentType === "TEXT") {
    return (
      <FormField
        name="content"
        control={form.control}
        render={({ field }) => (
          <FormItem className="rounded-lg border p-4 md:p-6">
            <div className="space-y-4">
              <p className="font-medium">{t("textContent.label")}</p>
              <div className="space-y-3">
                <AnimatedTabs
                  tabs={[
                    { id: "write", label: t("textContent.write") },
                    { id: "preview", label: t("textContent.preview") },
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
                        {t("textContent.nothingToPreview")}
                      </p>
                    )
                  ) : (
                    <textarea
                      {...field}
                      placeholder={t("textContent.placeholder")}
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
                  {t("textContent.markdownSupported")}
                  <ExternalLink className="size-4" />
                </Link>
              </div>
            </div>
          </FormItem>
        )}
      />
    );
  } else if (form.getValues().contentType === "IMAGE") {
    return (
      <FormField
        name="content"
        control={form.control}
        render={({ field }) => (
          <FormItem className="rounded-lg border p-4 md:p-6">
            <div className="space-y-4">
              <p className="font-medium">{t("imageContent.label")}</p>
              <FormControl>
                <FileUpload
                  classNames="aspect-[4/3]"
                  endPoint="image"
                  onChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
            </div>
          </FormItem>
        )}
      />
    );
  } else if (form.getValues().contentType === "VIDEO") {
    return (
      <FormField
        name="content"
        control={form.control}
        render={({ field }) => (
          <FormItem className="rounded-lg border p-4 md:p-6">
            <div className="space-y-4">
              <p className="font-medium">{t("videoContent.label")}</p>
              <div className="space-y-3">
                <AnimatedTabs
                  tabs={[
                    { id: "file", label: t("videoContent.uploadVideo") },
                    { id: "url", label: t("videoContent.youtubeUrl") },
                  ]}
                  defaultTab={videoSourceType}
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
                        placeholder={t("videoContent.placeholder")}
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
                          {t("videoContent.urlHint")}
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
                      <FormMessage />
                    </div>
                  )}
                </FormControl>
              </div>
            </div>
          </FormItem>
        )}
      />
    );
  } else if (form.getValues().contentType === "AUDIO") {
    return (
      <FormField
        name="content"
        control={form.control}
        render={({ field }) => (
          <FormItem className="rounded-lg border p-4 md:p-6">
            <div className="space-y-4">
              <p className="font-medium">{t("audioContent.label")}</p>
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
    );
  } else if (form.getValues().contentType === "PDF") {
    return (
      <FormField
        name="content"
        control={form.control}
        render={({ field }) => (
          <FormItem className="rounded-lg border p-4 md:p-6">
            <div className="space-y-4">
              <p className="font-medium">{t("pdfContent.label")}</p>
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
    );
  }
};

export default ContentSlide;
