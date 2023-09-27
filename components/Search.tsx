"use client";

import { FC, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/Command";
import Link from "next/link";
import { Users } from "lucide-react";

interface SearchProps {}

const Search: FC<SearchProps> = ({}) => {
  const [input, setInput] = useState("");

  return (
    <Command className="relative z-50 hidden bg-zinc-700 md:block md:max-w-xs lg:max-w-lg">
      <CommandInput
        value={input}
        onValueChange={(text) => {
          setInput(text);
          //   debounceRequest();
        }}
        placeholder="Search for communities..."
        className="border-none text-zinc-100 text-base outline-none ring-0 placeholder:text-zinc-400 focus:border-none focus:outline-0"
      />

      {input.length > 0 ? (
        <CommandList className="absolute inset-x-0 top-full mt-1 rounded-md border border-zinc-700 bg-zinc-800 text-white shadow-md">
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Communities">
            <CommandItem
              className="font-semibold text-white hover:bg-background hover:text-black"
              //   key={community.id}
              //   value={community.name}
              onSelect={(e) => {
                // router.push(`/community/${e}`);
                // router.refresh();
                setInput("");
              }}
            >
              <Users className="mr-2 h-4 w-4" />
              <Link href={`/`}>idk</Link>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      ) : null}
    </Command>
  );
};

export default Search;
