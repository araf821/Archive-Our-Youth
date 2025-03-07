import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

interface FilterHeaderProps {
  onClose: () => void;
}

const FilterHeader = ({ onClose }: FilterHeaderProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SlidersHorizontal className="h-6 w-6 text-primary" />
          <h2 className="bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-2xl font-medium text-transparent md:text-3xl">
            Search & Filter
          </h2>
        </div>
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-zinc-800/50"
        >
          <span className="sr-only">Close</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-x"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </Button>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>
    </>
  );
};

export default FilterHeader;
