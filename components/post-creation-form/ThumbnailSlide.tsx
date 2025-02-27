import { TPostCreationForm } from "@/lib/types/form";
import { FC } from "react";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/Form";
import FileUpload from "../FileUpload";

interface ThumbnailSlideProps {
  form: TPostCreationForm;
}

const ThumbnailSlide: FC<ThumbnailSlideProps> = ({ form }) => {
  return (
    <FormField
      name="thumbnail"
      control={form.control}
      render={({ field }) => (
        <FormItem className="bebi mx-auto w-full max-w-4xl space-y-0 rounded-lg border p-4 pb-6 sm:flex sm:justify-between sm:gap-4 md:p-6">
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

export default ThumbnailSlide;
