import { RESEARCH_QUESTIONS, postTypes } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Control } from "react-hook-form";
import { FilterFormType } from "@/lib/validators/filters";
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
import { useTranslations } from "next-intl";

interface ResearchAndPostTypeProps {
  control: Control<FilterFormType>;
  getValues: () => FilterFormType;
}

const ResearchAndPostType = ({
  control,
  getValues,
}: ResearchAndPostTypeProps) => {
  const t = useTranslations("Filters");

  return (
    <div className="flex gap-6 max-md:flex-col md:gap-8">
      <FormField
        name="question"
        control={control}
        render={({ field }) => (
          <FormItem className="w-full md:w-[70%]">
            <FormLabel className="text-zinc-300">
              {t("researchQuestion.label")}
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="morph-sm h-fit border border-zinc-700/50 bg-zinc-800/80 py-3.5 text-zinc-100 outline-none transition-all duration-200 focus:ring-1 focus:ring-primary/50">
                  <SelectValue
                    className="placeholder-zinc-400"
                    placeholder={t("researchQuestion.label")}
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-[400px] max-w-[510px] rounded-md border-zinc-700 bg-zinc-800/95 text-zinc-100 backdrop-blur-md">
                <SelectItem
                  className={cn("py-3 transition-colors hover:bg-zinc-700/50", {
                    "bg-zinc-700/70 text-primary":
                      getValues().question === "any",
                  })}
                  value="any"
                >
                  {t("researchQuestion.all")}
                </SelectItem>
                {RESEARCH_QUESTIONS.map(({ id, text }) => (
                  <SelectItem
                    className={cn(
                      "py-3 transition-colors hover:bg-zinc-700/50",
                      {
                        "bg-zinc-700/70 text-primary":
                          getValues().question === text,
                      },
                    )}
                    key={id}
                    value={text}
                  >
                    {text}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="postType"
        control={control}
        render={({ field }) => (
          <FormItem className="w-full md:w-[30%]">
            <FormLabel className="text-zinc-300">
              {t("postType.label")}
            </FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value || ""}
            >
              <FormControl>
                <SelectTrigger className="morph-sm border border-zinc-700/50 bg-zinc-800/80 py-6 text-zinc-100 outline-none transition-all duration-200 focus:ring-1 focus:ring-primary/50">
                  <SelectValue
                    className="placeholder-zinc-400"
                    placeholder={t("postType.label")}
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-[400px] rounded-md border-zinc-700 bg-zinc-800/95 text-zinc-100 backdrop-blur-md">
                <SelectItem
                  className={cn("py-3 transition-colors hover:bg-zinc-700/50", {
                    "bg-zinc-700/70 text-primary":
                      getValues().postType === "ANY",
                  })}
                  value="ANY"
                >
                  {t("postType.all")}
                </SelectItem>
                {postTypes.map((type) => (
                  <SelectItem
                    className={cn(
                      "py-3 transition-colors hover:bg-zinc-700/50",
                      {
                        "bg-zinc-700/70 text-primary":
                          getValues().postType === type.toUpperCase(),
                      },
                    )}
                    key={type}
                    value={type.toUpperCase()}
                  >
                    {type}
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

export default ResearchAndPostType;
