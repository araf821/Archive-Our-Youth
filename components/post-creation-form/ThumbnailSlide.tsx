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
        <FormItem className="space-y-4">
          <div>
            <p className="font-medium">Thumbnail</p>
            <p className="text-sm text-zinc-400">Optional but recommended</p>
          </div>
          <FormControl>
            <FileUpload
              classNames="aspect-square max-w-[200px]"
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
