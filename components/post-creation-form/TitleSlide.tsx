import { TPostCreationForm } from "@/lib/types/form";
import { FC } from "react";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/Form";

interface TitleSlideProps {
  form: TPostCreationForm;
}

const TitleSlide: FC<TitleSlideProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <div className="space-y-2">
            <p className="font-medium">
              What would you like to call this masterpiece?
            </p>
            <FormControl>
              <input
                placeholder="Enter a title"
                className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-600"
                type="text"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default TitleSlide;
