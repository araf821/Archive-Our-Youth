import { FC } from "react";
import { useTranslations } from "next-intl";

import { TPostCreationForm } from "@/lib/types/form";

import { FormControl, FormField, FormItem, FormMessage } from "../ui/Form";

interface TitleSlideProps {
  form: TPostCreationForm;
}

const TitleSlide: FC<TitleSlideProps> = ({ form }) => {
  const t = useTranslations("PostCreation.slides.title");

  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem className="rounded-lg border p-4 md:p-6">
          <div className="space-y-2">
            <p className="font-medium">{t("label")}</p>
            <FormControl>
              <input
                placeholder={t("placeholder")}
                className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-600"
                type="text"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default TitleSlide;
