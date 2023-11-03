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
      question1: string;
      question2: string;
      question3: string;
      question4: string;
      question5: string;
      description?: string | undefined;
    },
    any,
    undefined
  >;
}

const ResearchQuestions: FC<ResearchQuestionsProps> = ({ form }) => {
  return (
    <div className="flex max-w-screen-md flex-col gap-2">
      <p className="text-xl md:text-2xl">
        What question does your submission answer?{" "}
        <span className="text-zinc-400">(Optional)</span>
      </p>
      <hr className="border-zinc-700" />
      <div className="">
        <Accordion className="space-y-2" type="single" collapsible>
          <AccordionItem className="border-zinc-800" value="1">
            <AccordionTrigger className="text-sm text-zinc-300 md:text-base">
              What&rsquo;s the future you dream of?
            </AccordionTrigger>
            <FormField
              name="question1"
              control={form.control}
              render={({ field }) => (
                <AccordionContent>
                  <FormControl>
                    <input
                      placeholder="Your answer... (Optional)"
                      className="w-full rounded-md bg-zinc-800 px-3 py-2 font-semibold focus:outline-none focus:outline-2 focus:outline-zinc-700 md:text-base"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                </AccordionContent>
              )}
            />
          </AccordionItem>

          <AccordionItem className="border-zinc-800" value="2">
            <AccordionTrigger className="text-sm text-zinc-300 md:text-base">
              What does well-being mean to you right now?
            </AccordionTrigger>
            <FormField
              name="question2"
              control={form.control}
              render={({ field }) => (
                <AccordionContent>
                  <FormControl>
                    <input
                      placeholder="Your answer... (Optional)"
                      className="w-full rounded-md bg-zinc-800 px-3 py-2 font-semibold focus:outline-none focus:outline-2 focus:outline-zinc-700 md:text-base"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                </AccordionContent>
              )}
            />
          </AccordionItem>

          <AccordionItem className="border-zinc-800" value="3">
            <AccordionTrigger className="text-sm text-zinc-300 md:text-base">
              What would you tell your younger or older self?
            </AccordionTrigger>
            <FormField
              name="question3"
              control={form.control}
              render={({ field }) => (
                <AccordionContent>
                  <FormControl>
                    <input
                      placeholder="Your answer... (Optional)"
                      className="w-full rounded-md bg-zinc-800 px-3 py-2 font-semibold focus:outline-none focus:outline-2 focus:outline-zinc-700 md:text-base"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                </AccordionContent>
              )}
            />
          </AccordionItem>

          <AccordionItem className="border-zinc-800" value="4">
            <AccordionTrigger className="text-sm text-zinc-300 md:text-base">
              What&rsquo;s the future you dream of?
            </AccordionTrigger>
            <FormField
              name="question4"
              control={form.control}
              render={({ field }) => (
                <AccordionContent>
                  <FormControl>
                    <input
                      placeholder="Your answer... (Optional)"
                      className="w-full rounded-md bg-zinc-800 px-3 py-2 font-semibold focus:outline-none focus:outline-2 focus:outline-zinc-700 md:text-base"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                </AccordionContent>
              )}
            />
          </AccordionItem>

          <AccordionItem className="border-zinc-800" value="5">
            <AccordionTrigger className="text-sm text-zinc-300 md:text-base">
              What groups, initiatives, projects, and resources support your
              wellbeing and the wellbeing of the planet? What more would be
              helpful and of value to you right now?
            </AccordionTrigger>
            <FormField
              name="question5"
              control={form.control}
              render={({ field }) => (
                <AccordionContent>
                  <FormControl>
                    <input
                      placeholder="Your answer... (Optional)"
                      className="w-full rounded-md bg-zinc-800 px-3 py-2 font-semibold focus:outline-none focus:outline-2 focus:outline-zinc-700 md:text-base"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                </AccordionContent>
              )}
            />
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default ResearchQuestions;
