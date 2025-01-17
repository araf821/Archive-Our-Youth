import { TPostCreationForm } from "@/lib/types/form";
import { FC, useState } from "react";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/Form";
import { AnimatedTabs } from "../ui/animated-tabs";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import FileUpload from "../FileUpload";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { isYouTubeUrl } from "@/lib/utils";

interface ContentSlideProps {
  form: TPostCreationForm;
}

const ContentSlide: FC<ContentSlideProps> = ({ form }) => {
  const [preview, setPreview] = useState(false);
  const [videoSourceType, setVideoSourceType] = useState<"file" | "url">(
    "file",
  );

  if (form.getValues().contentType === "TEXT") {
    return (
      <FormField
        name="content"
        control={form.control}
        render={({ field }) => (
          <FormItem className="mx-auto grid w-full max-w-screen-sm place-items-center gap-8 md:gap-12">
            <p className="text-center text-xl md:text-2xl">
              What have you got for us?
            </p>
            <div className="flex w-full flex-col gap-2">
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
                    <ReactMarkdown className="prose-headings:font-josefin prose prose-xl h-full max-w-full overflow-y-auto break-words rounded-md bg-zinc-800 p-2.5 text-start text-zinc-100 prose-headings:font-semibold prose-headings:text-zinc-50 prose-h1:m-0 prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-code:whitespace-pre-wrap prose-img:rounded-md">
                      {form.getValues().content}
                    </ReactMarkdown>
                  ) : (
                    <p className="grid h-40 place-items-center rounded-lg border border-background-surface bg-zinc-800">
                      Nothing to preview
                    </p>
                  )
                ) : (
                  <textarea
                    {...field}
                    placeholder="What's on your mind?!"
                    className="morph-sm mt-2 h-full resize-none rounded-sm border-none bg-zinc-800 px-3 py-1.5 text-zinc-50 outline-none focus:outline-none md:text-lg"
                  />
                )}
              </FormControl>
              <FormMessage />
              <Link
                href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
                target="_blank"
                className="flex w-fit items-center gap-1 text-zinc-400 transition hover:text-blue-400 max-md:mx-auto"
              >
                Markdown is supported!
                <ExternalLink className="size-4" />
              </Link>
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
          <FormItem className="mx-auto flex w-full max-w-screen-sm flex-col items-center gap-8 max-sm:mt-12 md:gap-12">
            <p className="text-center text-xl md:text-2xl">Add an image</p>
            <FormControl>
              <FileUpload
                classNames="aspect-[4/3]"
                endPoint="image"
                onChange={field.onChange}
                value={field.value}
              />
            </FormControl>
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
          <FormItem className="mx-auto flex w-full max-w-screen-sm flex-col gap-8 max-sm:mt-12 md:gap-12">
            <p className="text-center text-xl md:text-2xl">Add a video</p>
            <AnimatedTabs
              tabs={[
                { id: "file", label: "Upload Video" },
                { id: "url", label: "YouTube URL" },
              ]}
              defaultTab={videoSourceType}
              onChange={(tabId) => setVideoSourceType(tabId as "file" | "url")}
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
                    className="w-full rounded-sm border border-background-surface bg-zinc-800 px-3 py-2 focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-zinc-600"
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
                  <FormMessage />
                </div>
              )}
            </FormControl>
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
          <FormItem className="mx-auto flex w-full max-w-screen-sm flex-col gap-8 max-sm:mt-12 md:gap-12">
            <p className="text-center text-xl md:text-2xl">Add an audio</p>
            <FormControl>
              <FileUpload
                classNames="aspect-video"
                endPoint="audio"
                onChange={field.onChange}
                value={field.value}
              />
            </FormControl>
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
          <FormItem className="mx-auto grid w-full max-w-screen-sm place-items-center gap-8 max-sm:mt-12 md:gap-12">
            <p className="text-center text-xl md:text-2xl">Upload a PDF</p>
            <FormControl>
              <FileUpload
                endPoint="pdf"
                onChange={field.onChange}
                value={field.value}
                classNames="aspect-[3/4] max-w-[300px]"
              />
            </FormControl>
          </FormItem>
        )}
      />
    );
  }
};

export default ContentSlide;
