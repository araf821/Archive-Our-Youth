import { PostCreationForm } from "@/lib/types/form";
import { FC, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";
import { Button } from "../ui/Button";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import FileUpload from "../FileUpload";
import { cn } from "@/lib/utils";

interface ContentSlideProps {
  form: PostCreationForm;
}

const ContentSlide: FC<ContentSlideProps> = ({ form }) => {
  const [preview, setPreview] = useState(false);

  if (form.getValues().contentType === "TEXT") {
    return (
      <FormField
        name="content"
        control={form.control}
        render={({ field }) => (
          <FormItem className="mx-auto grid max-w-screen-sm place-items-center gap-8 max-sm:mt-12 md:gap-12">
            <div className="flex">
              <span className="aspect-square w-7 bg-[#D5222A] md:w-10" />
              <span className="aspect-square w-7 bg-[#FA322C] md:w-10" />
            </div>

            <p className="text-center text-xl md:text-2xl">
              What have you got for us?
            </p>
            <div className="flex w-full flex-col gap-2">
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
              <FormControl className="min-h-[300px]">
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
                    placeholder="Placeholder Text"
                    className="h-full resize-none rounded-sm border-none bg-zinc-800 px-3 py-1.5 text-lg text-zinc-50 outline-none focus:outline-none"
                  />
                )}
              </FormControl>
              <FormMessage />
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
          <FormItem className="mx-auto grid max-w-screen-sm place-items-center gap-8 max-sm:mt-12 md:gap-12">
            <div className="flex">
              <span className="aspect-square w-7 bg-[#D5222A] md:w-10" />
              <span className="aspect-square w-7 bg-[#FA322C] md:w-10" />
            </div>

            <p className="text-center text-xl md:text-2xl">Add an image</p>
            <FormControl>
              <FileUpload
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
          <FormItem className="mx-auto grid max-w-screen-sm place-items-center gap-8 max-sm:mt-12 md:gap-12">
            <div className="flex">
              <span className="aspect-square w-7 bg-[#D5222A] md:w-10" />
              <span className="aspect-square w-7 bg-[#FA322C] md:w-10" />
            </div>
            <FormLabel className="text-center text-xl md:text-2xl">
              Add a video
            </FormLabel>{" "}
            <FormControl>
              <FileUpload
                endPoint="video"
                onChange={field.onChange}
                value={field.value}
              />
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
          <FormItem className="mx-auto grid max-w-screen-sm place-items-center gap-8 max-sm:mt-12 md:gap-12">
            <div className="flex">
              <span className="aspect-square w-7 bg-[#D5222A] md:w-10" />
              <span className="aspect-square w-7 bg-[#FA322C] md:w-10" />
            </div>

            <FormLabel className="text-center text-xl md:text-2xl">
              Add an audio
            </FormLabel>
            <FormControl>
              <FileUpload
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
          <FormItem className="mx-auto grid max-w-screen-sm place-items-center gap-8 max-sm:mt-12 md:gap-12">
            <div className="flex">
              <span className="aspect-square w-7 bg-[#D5222A] md:w-10" />
              <span className="aspect-square w-7 bg-[#FA322C] md:w-10" />
            </div>

            <FormLabel className="text-center text-xl md:text-2xl">
              Upload a PDF
            </FormLabel>
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
