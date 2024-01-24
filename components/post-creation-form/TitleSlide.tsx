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
        <FormItem className="flex flex-col items-center justify-center space-y-10 md:space-y-14">
          <p className="text-center text-xl md:text-2xl">
            What would you like to call this masterpiece?
          </p>
          <div className="space-y-1">
            <FormControl>
              <input
                placeholder="Title"
                className="w-full rounded-sm border border-zinc-700 bg-zinc-800 px-3 py-2 text-2xl focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-zinc-600 md:text-3xl"
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
