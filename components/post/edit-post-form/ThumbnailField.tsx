"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import type { UseFormReturn } from "react-hook-form";
import { PostEditValidator } from "@/lib/validators/post";
import { z } from "zod";
import FileUpload from "@/components/file-upload/FileUpload";

type Props = {
  form: UseFormReturn<z.infer<typeof PostEditValidator>>;
};

const ThumbnailField = ({ form }: Props) => {
  return (
    <FormField
      name="thumbnail"
      control={form.control}
      render={({ field }) => (
        <FormItem className="mx-auto w-full max-w-4xl space-y-0 rounded-lg border p-4 pb-6 sm:flex sm:justify-between sm:gap-4 md:p-6">
          <div className="max-sm:mb-2">
            <p className="text-lg font-medium">Thumbnail</p>
            <p className="text-sm text-zinc-400">Optional but recommended</p>
          </div>
          <FormControl>
            <div className="flex justify-center">
              <FileUpload
                classNames="aspect-square mt-0 min-w-52 w-full max-w-[225px]"
                endPoint="image"
                onChange={field.onChange}
                value={field.value || ""}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default ThumbnailField;
