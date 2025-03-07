import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { Control } from "react-hook-form";

import { cn } from "@/lib/utils";
import { FilterFormType } from "@/lib/validators/filters";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchAndSortProps {
  control: Control<FilterFormType>;
  getValues: () => FilterFormType;
}

const SearchAndSort = ({ control, getValues }: SearchAndSortProps) => {
  const t = useTranslations("Filters");

  const sortOptions = [
    { value: "latest", label: t("sort.latest") },
    { value: "oldest", label: t("sort.oldest") },
    { value: "most-popular", label: t("sort.mostLiked") },
  ];

  return (
    <div className="flex gap-6 max-md:flex-col md:gap-8">
      <FormField
        name="keyword"
        control={control}
        render={({ field }) => (
          <FormItem className="w-full md:w-[70%]">
            <FormLabel className="text-zinc-300">{t("search.label")}</FormLabel>
            <FormControl>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <Input
                  {...field}
                  type="text"
                  placeholder={t("search.placeholder")}
                  className="morph-sm border border-zinc-700/50 bg-zinc-800/80 py-6 pl-10 pr-4 outline-none transition-all duration-200 focus-visible:ring-1 focus-visible:ring-primary/50"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="sortBy"
        control={control}
        render={({ field }) => (
          <FormItem className="w-full md:w-[30%]">
            <FormLabel className="text-zinc-300">{t("sort.label")}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="morph-sm border border-zinc-700/50 bg-zinc-800/80 py-6 text-zinc-100 outline-none transition-all duration-200 focus:ring-1 focus:ring-primary/50">
                  <SelectValue placeholder={t("sort.label")} />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="rounded-md border-zinc-700 bg-zinc-800/95 text-zinc-100 backdrop-blur-md">
                {sortOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    className={cn(
                      "py-3 transition-colors hover:bg-zinc-700/50",
                      {
                        "bg-zinc-700/70 text-primary":
                          getValues().sortBy === option.value,
                      },
                    )}
                    value={option.value}
                  >
                    {option.label}
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

export default SearchAndSort;
