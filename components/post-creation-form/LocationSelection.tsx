import { FC } from "react";
import { useTranslations } from "next-intl";

import { allCountries } from "@/lib/constants";
import { TPostCreationForm } from "@/lib/types/form";
import { cn } from "@/lib/utils";

import { FormControl, FormField, FormItem } from "../ui/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface LocationSelectionProps {
  form: TPostCreationForm;
}

const LocationSelection: FC<LocationSelectionProps> = ({ form }) => {
  const t = useTranslations("PostCreation.slides.location");
  const country = form.watch("location");

  return (
    <FormField
      control={form.control}
      name="location"
      render={({ field }) => (
        <FormItem className="space-y-4 rounded-lg border p-4 md:p-6">
          <div>
            <p className="font-medium">{t("title")}</p>
          </div>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="border border-background-surface bg-zinc-800 text-zinc-100 outline-none">
                <SelectValue
                  className="placeholder-zinc-400"
                  placeholder={t("description")}
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
        </FormItem>
      )}
    />
  );
};

export default LocationSelection;
