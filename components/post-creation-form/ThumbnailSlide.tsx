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
        <FormItem className="mx-auto flex w-full max-w-xs flex-col items-center gap-8 md:gap-12">
          <div className="">
            <p className="text-center text-xl md:text-2xl">Add a thumbnail</p>
            <p className="max-w-[500px] text-center text-sm text-zinc-400">
              Optional but recommended.
            </p>
          </div>
          <FormControl className="mx-auto">
            <FileUpload
              classNames="aspect-square"
              endPoint="image"
              onChange={field.onChange}
              value={field.value || ""}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ThumbnailSlide;
