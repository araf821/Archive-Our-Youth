"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { allCountries } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { FormControl, FormField, FormItem } from "@/components/ui/Form";
import { UseFormReturn } from "react-hook-form";
import { PostEditValidator } from "@/lib/validators/post";
import { z } from "zod";

interface LocationSelectProps {
  form: UseFormReturn<z.infer<typeof PostEditValidator>>;
}

export const LocationSelect = ({ form }: LocationSelectProps) => {
  return (
    <FormField
      control={form.control}
      name="location"
      render={({ field }) => (
        <FormItem className="space-y-4 rounded-lg border p-4 md:p-6">
          <div>
            <p className="font-medium">Location</p>
          </div>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="border border-background-surface bg-zinc-800 text-zinc-100 outline-none">
                <SelectValue
                  className="placeholder-zinc-400"
                  placeholder="Select a country"
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="max-h-[300px] rounded-sm border-background-surface bg-zinc-800 text-zinc-100">
              {allCountries.map((c) => (
                <SelectItem
                  className={cn(
                    "hover:bg-background-surface focus:bg-background-surface",
                    {
                      "bg-background-muted focus:bg-background-muted":
                        field.value === c.toLowerCase(),
                    },
                  )}
                  key={c}
                  value={c.toLowerCase()}
                >
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};
