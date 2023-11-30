import { TPostCreationForm } from "@/lib/types/form";
import { FC } from "react";
import { FormControl, FormField, FormItem } from "../ui/Form";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { allCountries } from "../Filters";

interface LocationSelectionProps {
  form: TPostCreationForm;
}

const LocationSelection: FC<LocationSelectionProps> = ({ form }) => {
  const country = form.watch("location");

  return (
    <FormField
      control={form.control}
      name="location"
      render={({ field }) => (
        <FormItem className="mx-auto grid max-w-screen-sm place-items-center gap-8 md:gap-12">
          <div className="text-center">
            <p className="balance text-xl md:text-2xl">
              Where are you posting from?
            </p>
          </div>
          <div className="w-full space-y-4">
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="border-none bg-zinc-800 py-5 text-zinc-100 outline-none">
                  <SelectValue
                    className="placeholder-zinc-400"
                    placeholder="Select a country"
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-[300px] rounded-sm border-zinc-700 bg-zinc-800 text-zinc-100">
                {allCountries.map((c) => (
                  <SelectItem
                    className={cn("py-3 hover:bg-zinc-700 focus:bg-zinc-700", {
                      "bg-zinc-900 focus:bg-zinc-900":
                        country === c.toLowerCase(),
                    })}
                    key={c}
                    value={c.toLowerCase()}
                  >
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </FormItem>
      )}
    />
  );
};

export default LocationSelection;
