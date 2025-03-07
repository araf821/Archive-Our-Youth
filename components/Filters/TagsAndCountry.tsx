import { allCountries } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Control } from "react-hook-form";
import { FilterFormType } from "@/lib/validators/filters";
import { allTags } from "@/components/post-creation-form/TagSelectionSlide";
import MultiSelect from "@/components/MultiSelect";
import Tag from "@/components/Tag";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";

interface TagsAndCountryProps {
  control: Control<FilterFormType>;
  tags: string[];
  country: string;
  onDeleteTag: (tag: string) => void;
  setValue: (name: "tags", value: string[]) => void;
}

const TagsAndCountry = ({
  control,
  tags,
  country,
  onDeleteTag,
  setValue,
}: TagsAndCountryProps) => {
  return (
    <div className="flex gap-6 max-md:flex-col md:gap-8">
      <FormField
        name="tags"
        control={control}
        render={({ field }) => (
          <FormItem className="z-40 w-full space-y-0 md:w-[70%]">
            <FormLabel className="text-zinc-300">Tags</FormLabel>
            <FormControl className="pt-2">
              <div className="relative">
                <MultiSelect
                  onChange={field.onChange}
                  maxSelection={5}
                  options={allTags}
                  selectedOptions={tags}
                  className="border border-zinc-700/50 bg-zinc-800/80 py-6 text-zinc-100 outline-none transition-all duration-200 focus:ring-1 focus:ring-primary/50"
                />
              </div>
            </FormControl>
            <FormMessage />
            {!!tags.length && (
              <div className="mt-4 rounded-md border border-zinc-700/50 bg-zinc-800/50 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm text-zinc-400">
                    Selected Tags ({tags.length}/5)
                  </p>
                  <button
                    onClick={() => setValue("tags", [])}
                    className="text-xs text-zinc-400 transition-colors hover:text-primary"
                  >
                    Clear All
                  </button>
                </div>
                <ul className="flex flex-wrap items-center gap-2">
                  {tags.map((tag, index) => (
                    <Tag
                      key={tag}
                      tag={tag}
                      index={index}
                      onDelete={onDeleteTag}
                    />
                  ))}
                </ul>
              </div>
            )}
          </FormItem>
        )}
      />

      <FormField
        name="location"
        control={control}
        render={({ field }) => (
          <FormItem className="w-full md:w-[30%]">
            <FormLabel className="text-zinc-300">Country</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="morph-sm border border-zinc-700/50 bg-zinc-800/80 py-6 text-zinc-100 outline-none transition-all duration-200 focus:ring-1 focus:ring-primary/50">
                  <SelectValue
                    className="placeholder-zinc-400"
                    placeholder="Select a country"
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-[400px] overflow-y-auto rounded-md border-zinc-700 bg-zinc-800/95 text-zinc-100 backdrop-blur-md">
                <SelectItem
                  className={cn("py-3 transition-colors hover:bg-zinc-700/50", {
                    "bg-zinc-700/70 text-primary": country === "any",
                  })}
                  value="any"
                >
                  Any
                </SelectItem>
                {allCountries.map((c) => (
                  <SelectItem
                    className={cn(
                      "py-3 transition-colors hover:bg-zinc-700/50",
                      {
                        "bg-zinc-700/70 text-primary":
                          country === c.toLowerCase(),
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
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default TagsAndCountry;
