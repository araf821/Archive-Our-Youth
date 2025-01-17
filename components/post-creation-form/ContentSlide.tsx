import { TPostCreationForm } from "@/lib/types/form";
import { FC, useState } from "react";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/Form";
import { AnimatedTabs } from "../ui/animated-tabs";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import FileUpload from "../FileUpload";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { getYouTubeVideoId, isYouTubeUrl } from "@/lib/utils";

interface ContentSlideProps {
  form: TPostCreationForm;
}

const ContentSlide: FC<ContentSlideProps> = ({ form }) => {
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
    );
  } else if (form.getValues().contentType === "IMAGE") {
    return (
      <FormField
        name="content"
        control={form.control}
        render={({ field }) => (
          <FormItem className="rounded-lg border p-4 md:p-6">
            <div className="space-y-4">
              <p className="font-medium">Add an image</p>
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
              <p className="font-medium">Add a video</p>
              <div className="space-y-3">
                <AnimatedTabs
                  tabs={[
                    { id: "file", label: "Upload Video" },
                    { id: "url", label: "YouTube URL" },
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
    );
  } else if (form.getValues().contentType === "PDF") {
    return (
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
    );
  }
};

export default ContentSlide;
