import { FC } from "react";
import { FormControl, FormField } from "../ui/Form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { UseFormReturn } from "react-hook-form";

interface ResearchQuestionsProps {
  form: UseFormReturn<
    {
      title: string;
      content: string;
      contentType: "TEXT" | "IMAGE" | "VIDEO" | "AUDIO";
      tags: string[];
      q1: string;
      q2: string;
      q3: string;
      q4: string;
      q5: string;
      description?: string | undefined;
    },
    any,
    undefined
  >;
}

const ResearchQuestions: FC<ResearchQuestionsProps> = ({ form }) => {
  return (
    <div className="flex max-w-screen-md flex-col gap-2">
      <p className="text-xl text-zinc-300 md:text-2xl">
        What question does your submission answer?{" "}
        <span className="text-zinc-400">(Optional)</span>
      </p>
      <p className="text-zinc-400 max-md:text-sm">
        This question is for research purposes only.
      </p>
      <hr className="border-zinc-700" />
      <div className="space-y-2">
        <label
          htmlFor="q1"
          className="group relative flex items-center gap-2 rounded-sm bg-zinc-800 px-3 py-1.5 pl-10 md:text-lg"
        >
          <input
            type="checkbox"
            id="q1"
            className="absolute left-2 top-2.5 h-5 w-5 appearance-none rounded-md border-2 border-zinc-500 bg-zinc-900 fill-pink-400 checked:border-zinc-900 checked:bg-red-500 group-hover:bg-zinc-700 group-hover:checked:bg-red-700"
          />
          What&rsquo;s the future that you dream of?
        </label>

        <label
          htmlFor="q2"
          className="group relative flex items-center gap-2 rounded-sm bg-zinc-800 px-3 py-1.5 pl-10 md:text-lg"
        >
          <input
            type="checkbox"
            id="q2"
            className="absolute left-2 top-2.5 h-5 w-5 appearance-none rounded-md border-2 border-zinc-500 bg-zinc-900 fill-pink-400 checked:border-zinc-900 checked:bg-red-500 group-hover:bg-zinc-700 group-hover:checked:bg-red-700"
          />
          What does well-being mean to you right now?
        </label>

        <label
          htmlFor="q3"
          className="group relative flex items-center gap-2 rounded-sm bg-zinc-800 px-3 py-1.5 pl-10 md:text-lg"
        >
          <input
            type="checkbox"
            id="q3"
            className="absolute left-2 top-2.5 h-5 w-5 appearance-none rounded-md border-2 border-zinc-500 bg-zinc-900 fill-pink-400 checked:border-zinc-900 checked:bg-red-500 group-hover:bg-zinc-700 group-hover:checked:bg-red-700"
          />
          What would you tell your younger or older self?
        </label>

        <label
          htmlFor="q4"
          className="group relative flex items-center gap-2 rounded-sm bg-zinc-800 px-3 py-1.5 pl-10 md:text-lg"
        >
          <input
            type="checkbox"
            id="q4"
            className="absolute left-2 top-2.5 h-5 w-5 appearance-none rounded-md border-2 border-zinc-500 bg-zinc-900 fill-pink-400 checked:border-zinc-900 checked:bg-red-500 group-hover:bg-zinc-700 group-hover:checked:bg-red-700"
          />
          What groups, initiatives, projects, and resources support your
          wellbeing and the wellbeing of the planet? What more would be helpful
          and of value to you right now? You can share links to websites and
          socials, videos, photos, etc.
        </label>

        <label
          htmlFor="q5"
          className="group relative flex items-center gap-2 rounded-sm bg-zinc-800 px-3 py-1.5 pl-10 md:text-lg"
        >
          <input
            type="checkbox"
            id="q5"
            className="absolute left-2 top-2.5 h-5 w-5 appearance-none rounded-md border-2 border-zinc-500 bg-zinc-900 fill-pink-400 checked:border-zinc-900 checked:bg-red-500 group-hover:bg-zinc-700 group-hover:checked:bg-red-700"
          />
          None of the above
        </label>
        {/* <Accordion className="space-y-2" type="single" collapsible>

          <AccordionItem className="border-zinc-800" value="5">
            <AccordionTrigger className="text-base max-md:text-sm">
              What groups, initiatives, projects, and resources support your
              wellbeing and the wellbeing of the planet? What more would be
              helpful and of value to you right now?
            </AccordionTrigger>
            <FormField
              name="q5"
              control={form.control}
              render={({ field }) => (
                <AccordionContent>
                  <FormControl>
                    <input
                      placeholder="Your answer... (Optional)"
                      className="w-full rounded-md bg-zinc-900 px-3 py-2 font-semibold focus:outline-none focus:outline-2 focus:outline-zinc-700 md:text-base"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                </AccordionContent>
              )}
            />
          </AccordionItem>
        </Accordion> */}
      </div>
    </div>
  );
};

export default ResearchQuestions;
