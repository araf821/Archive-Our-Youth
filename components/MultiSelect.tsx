"use client";

import { FC, useState } from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

interface MultiSelectProps {
  options: string[];
  selectedOptions: string[];
  onChange: (value: string[]) => void;
  maxSelection: number;
  className?: string;
}

const MultiSelect: FC<MultiSelectProps> = ({
  maxSelection,
  options,
  selectedOptions,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput] = useState("");

  function selectOption(option: string) {
    if (option === "") return;

    if (selectedOptions?.includes(option)) {
      onChange(selectedOptions.filter((val) => val !== option));
    } else {
      if (selectedOptions.length >= maxSelection) {
        toast.error(`Select up to ${maxSelection}.`);
        return;
      }

      if (option.length > 21) {
        toast.error("Tags must be less than 21 characters long.");
        return;
      }

      onChange([...selectedOptions, option]);
    }
    setInput("");
  }

  function isSelected(option: string) {
    return selectedOptions?.includes(option);
  }

  return (
    <div className="relative w-full">
      <input
        value={input}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        type="text"
        placeholder="Select Tags"
        onChange={(e) => setInput(e.target.value)}
        className="morph-sm w-full rounded-sm border border-background-surface bg-zinc-800 px-4 py-3 placeholder-zinc-200 outline-background-surface focus:outline-none"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            selectOption(input);
            setIsOpen(false);
          }
        }}
      />
      <ul
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        className={`${
          isOpen ? "scale-y-100" : "scale-y-0"
        } absolute left-0 top-[110%] z-[9999] max-h-72 w-full origin-top-left divide-y-[1px] divide-background-surface overflow-y-auto rounded-md border border-background-surface bg-zinc-800 text-zinc-100 transition duration-200 ease-out`}
      >
        {[input, ...options].map((option, index) => {
          if (!option.toLowerCase().includes(input.toLowerCase())) return;
          if (option === "") return;
          return (
            <li
              tabIndex={0}
              key={index}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  selectOption(option);
                  setIsOpen(false);
                }
              }}
              onClick={() => {
                selectOption(option);
                setIsOpen(false);
              }}
              className={cn(
                "z-[9999] cursor-pointer list-none px-3 py-2.5 transition focus-visible:outline-none",
                {
                  "bg-primary-dark text-white hover:bg-opacity-80 focus-visible:opacity-75":
                    isSelected(option),
                  "hover:bg-background-surface focus-visible:bg-background-surface":
                    !isSelected(option),
                },
              )}
            >
              {option}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MultiSelect;
