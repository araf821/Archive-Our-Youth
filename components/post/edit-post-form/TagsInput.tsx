"use client";

import { RefreshCcw, X } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { PostEditValidator } from "@/lib/validators/post";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import MultiSelect from "@/components/MultiSelect";
import { allTags } from "@/components/post-creation-form/TagSelectionSlide";

interface TagsInputProps {
  form: UseFormReturn<z.infer<typeof PostEditValidator>>;
}

export const TagsInput = ({ form }: TagsInputProps) => {
  const tags = form.watch("tags");

  return (
    <FormField
      control={form.control}
      name="tags"
      render={() => (
        <FormItem className="space-y-4 rounded-lg border p-4 md:p-6">
          <div>
            <p className="font-medium">Tags</p>
            <p className="text-sm text-zinc-400">
              Relevant tags lead your posts to the right people!
            </p>
          </div>
          <FormControl>
            <MultiSelect
              maxSelection={8}
              onChange={(values: string[]) => {
                form.setValue("tags", values);
              }}
              options={allTags}
              selectedOptions={tags}
            />
          </FormControl>
          {tags.length < 1 && <FormMessage />}
          <ul className="flex flex-wrap gap-4 pt-2 text-white">
            {form.getValues().tags.map((tag, index) => (
              <li
                key={tag}
                className={cn(
                  "text-bold flex items-center justify-between gap-1 rounded-md px-2.5 py-1 text-background-muted",
                  {
                    "border-2 border-rose-500 text-rose-500": index === 0,
                    "border-2 border-lime-500 text-lime-500": index === 1,
                    "border-2 border-sky-500 text-sky-500": index === 2,
                    "border-2 border-amber-500 text-amber-500": index === 3,
                    "border-2 border-fuchsia-500 text-fuchsia-500": index === 4,
                    "border-2 border-teal-400 text-teal-400": index === 5,
                    "border-2 border-red-400 text-red-400": index === 6,
                    "border-2 border-indigo-400 text-indigo-400": index === 7,
                  },
                )}
              >
                {tag}
                <button
                  onClick={() =>
                    form.setValue(
                      "tags",
                      tags.filter((t) => t !== tag),
                    )
                  }
                  type="button"
                  className=""
                >
                  <X size={15} />
                </button>
              </li>
            ))}
            {!!tags.length && (
              <button
                type="button"
                onClick={() => form.setValue("tags", [])}
                className="morph-sm flex w-fit items-center gap-2 rounded-sm border border-background-surface bg-zinc-800 px-3 py-2 text-white transition max-md:text-sm md:text-base"
              >
                Reset
                <RefreshCcw size={16} />
              </button>
            )}
          </ul>
        </FormItem>
      )}
    />
  );
};
