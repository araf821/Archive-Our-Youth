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
import { cn } from "@/lib/utils";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

interface DescriptionSlideProps {
  form: PostCreationForm;
}

const DescriptionSlide: FC<DescriptionSlideProps> = ({ form }) => {
  const [preview, setPreview] = useState(false);

  return (
    <FormField
      name="description"
      control={form.control}
      render={({ field }) => (
        <FormItem className="mx-auto flex h-[40vh] max-w-screen-sm flex-col justify-center space-y-4">
          <FormLabel className="text-xl text-zinc-300 max-md:text-center md:text-left md:text-2xl">
            Add a description (optional)
            <hr className="mt-1.5 w-full border-zinc-700" />
          </FormLabel>
          <div className="w-fit space-x-2">
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
                if (form.getValues().description) {
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

          <FormControl>
            {preview ? (
              form.getValues().description ? (
                <ReactMarkdown className="prose-headings:font-josefin prose prose-xl h-full max-w-full overflow-y-auto break-words rounded-md bg-zinc-800 p-2.5 text-start text-zinc-100 prose-headings:font-semibold prose-headings:text-zinc-50 prose-h1:m-0 prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-code:whitespace-pre-wrap prose-img:rounded-md">
                  {form.getValues().description || ""}
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
        </FormItem>
      )}
    />
  );
};

export default DescriptionSlide;
