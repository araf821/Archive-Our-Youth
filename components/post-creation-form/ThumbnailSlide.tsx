import { TPostCreationForm } from "@/lib/types/form";
import { FC } from "react";
import { FormControl, FormField, FormItem } from "../ui/Form";
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
        <FormItem className="mx-auto grid max-w-screen-sm place-items-center gap-8 max-sm:mt-12 md:gap-12">
          <p className="text-center text-xl md:text-2xl">Add an image</p>
          <FormControl>
            <FileUpload
              classNames="aspect-video"
              endPoint="image"
              onChange={field.onChange}
              value={field.value}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default ThumbnailSlide;
