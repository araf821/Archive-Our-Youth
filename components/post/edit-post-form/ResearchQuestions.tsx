"use client";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { RESEARCH_QUESTIONS } from "@/lib/constants";
import { PostEditValidator } from "@/lib/validators/post";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField, FormItem } from "@/components/ui/Form";
import { Label } from "@/components/ui/Label";

interface ResearchQuestionsProps {
  form: UseFormReturn<z.infer<typeof PostEditValidator>>;
}

export const ResearchQuestions = ({ form }: ResearchQuestionsProps) => {
  return (
    <FormField
      control={form.control}
      name="researchQuestions"
      render={({ field }) => (
        <FormItem className="w-full space-y-4 rounded-lg border p-4 md:p-6">
          <div>
            <p className="font-medium text-text-primary">Research Questions</p>
            <p className="text-sm text-text-secondary">
              How does your post explore wellbeing? (Choose all that apply)
            </p>
          </div>
          <div className="w-full">
            {RESEARCH_QUESTIONS.map((question) => (
              <div
                key={question.id}
                className="flex items-center gap-3 rounded-md px-2 transition-colors hover:bg-background-elevated"
              >
                <Checkbox
                  id={question.id}
                  checked={field.value?.includes(question.text)}
                  onCheckedChange={(checked) => {
                    const newValue = checked
                      ? [...(field.value || []), question.text]
                      : field.value?.filter((q) => q !== question.text);
                    field.onChange(newValue);
                  }}
                />
                <Label
                  htmlFor={question.id}
                  className="w-full cursor-pointer py-3 text-sm text-text-primary"
                >
                  {question.text}
                </Label>
              </div>
            ))}
            <div className="flex items-center gap-3 rounded-md px-2 transition-colors hover:bg-background-elevated">
              <Checkbox
                id="none"
                checked={!field.value?.length}
                onCheckedChange={(checked) => {
                  field.onChange(checked ? [] : field.value);
                }}
              />
              <Label
                htmlFor="none"
                className="w-full cursor-pointer py-3 text-sm text-text-primary"
              >
                None of the above
              </Label>
            </div>
          </div>
        </FormItem>
      )}
    />
  );
};
