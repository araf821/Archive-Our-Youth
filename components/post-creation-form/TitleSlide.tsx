import { PostCreationForm } from "@/lib/types/form";
import { FC } from "react";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/Form";

interface TitleSlideProps {
  form: PostCreationForm;
}

const TitleSlide: FC<TitleSlideProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem className="flex flex-col items-center justify-center space-y-10 md:space-y-14">
          <div className="flex">
            <span className="aspect-square w-8 bg-[#FFA573] md:w-12" />
            <span className="aspect-square w-8 bg-[#FD9747] md:w-12" />
          </div>
          <p className="text-center text-xl md:text-2xl">
            What would you like to call this masterpiece?
          </p>
          <FormControl>
            <input
              placeholder="Title"
              className="w-full bg-zinc-800 px-3 py-2 text-2xl font-semibold focus:outline-none focus:outline-2 focus:outline-zinc-300 md:text-3xl"
              type="text"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TitleSlide;
