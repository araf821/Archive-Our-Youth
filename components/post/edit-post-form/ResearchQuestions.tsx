"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/Label";
import { FormControl, FormField, FormItem } from "@/components/ui/Form";
import { UseFormReturn } from "react-hook-form";
import { PostEditValidator } from "@/lib/validators/post";
import { z } from "zod";

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
            {[
              "Challenges or barriers",
              "What wellbeing means to you",
              "Advice to my older or younger self",
              "Practices, habits, and routines",
              "The impact of digital technology",
              "The future (fears, hopes, or dreams)",
              "Resources or groups that support wellbeing",
            ].map((question) => (
              <div
                key={question}
                className="flex items-center gap-3 rounded-md px-2 transition-colors hover:bg-background-elevated"
              >
                <Checkbox
                  id={question}
                  checked={field.value?.includes(question)}
                  onCheckedChange={(checked) => {
                    const newValue = checked
                      ? [...(field.value || []), question]
                      : field.value?.filter((q) => q !== question);
                    field.onChange(newValue);
                  }}
                />
                <Label
                  htmlFor={question}
                  className="w-full cursor-pointer py-3 text-sm text-text-primary"
                >
                  {question}
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
