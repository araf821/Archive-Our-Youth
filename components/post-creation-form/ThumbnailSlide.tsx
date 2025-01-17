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
        <FormItem className="mx-auto w-full max-w-4xl space-y-4 rounded-lg border p-4 md:p-6">
          <div className="">
            <p className="text-lg font-medium">Thumbnail</p>
            <p className="text-sm text-zinc-400">Optional but recommended</p>
          </div>
          <FormControl>
            <div className="flex justify-center">
              <FileUpload
                classNames="aspect-square w-full max-w-[200px] md:max-w-[300px] lg:max-w-[400px]"
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
