import { RefreshCcw, Search } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

interface FilterFooterProps {
  onReset: () => void;
}

const FilterFooter = ({ onReset }: FilterFooterProps) => {
  const t = useTranslations("Filters");

  return (
    <>
      <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>

      <div className="flex items-center gap-6 pt-2">
        <Button
          onClick={onReset}
          type="button"
          variant="outline"
          className="group relative overflow-hidden rounded-full border-zinc-700/50 bg-zinc-800/50 px-6 py-6 text-zinc-300 backdrop-blur-sm hover:border-zinc-600 hover:text-zinc-100"
        >
          <span className="absolute inset-0 -translate-y-full bg-gradient-to-b from-zinc-700/0 to-zinc-700/20 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"></span>
          <span className="relative z-10 flex items-center">
            {t("buttons.reset")}
            <RefreshCcw className="ml-2 size-4 transition-transform duration-300 group-hover:rotate-180" />
          </span>
        </Button>
        <Button className="group relative overflow-hidden rounded-full bg-primary px-8 py-6 text-black shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30">
          <span className="absolute inset-0 -translate-y-full bg-gradient-to-b from-black/0 to-black/10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"></span>
          <span className="relative z-10 flex items-center font-medium tracking-wider">
            <Search className="mr-2 h-4 w-4" />
            {t("buttons.apply")}
          </span>
        </Button>
      </div>
    </>
  );
};

export default FilterFooter;
