"use client";

import { cn } from "@/lib/utils";
import { FC, useState } from "react";
import { toast } from "sonner";

interface MultiSelectProps {
  options: string[];
  selectedOptions: string[];
  onChange: (value: string[]) => void;
  maxSelection: number;
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
    if (selectedOptions?.includes(option)) {
      onChange(selectedOptions.filter((val) => val !== option));
    } else {
      if (selectedOptions.length >= maxSelection) {
        toast.error(`Select up to ${maxSelection}.`);
        return;
      }

      if (option.length > 16) {
        toast.error("Tags must be less than 15 characters long.");
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
        className="w-full rounded-sm bg-zinc-800 px-3 py-2 outline-zinc-700 focus:border-none focus:outline-none md:text-lg"
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
        } absolute left-0 top-[110%] z-[9999] max-h-72 w-full origin-top-left divide-y-[1px] divide-zinc-700 overflow-y-auto rounded-md border border-zinc-700 bg-zinc-800 text-zinc-100 transition duration-200 ease-out`}
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
                  "bg-green-600 text-white hover:bg-opacity-80 focus-visible:opacity-75":
                    isSelected(option),
                  "hover:bg-zinc-700 focus-visible:bg-zinc-700":
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
