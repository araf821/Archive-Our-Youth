"use client";

import { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";
import { Info, X } from "lucide-react";
import Link from "next/link";

interface AnonymousPostInfoProps {}

const AnonymousPostInfo: FC<AnonymousPostInfoProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="text-zinc-400 transition duration-300 hover:text-green-500">
        <Info className="h-4 w-4 md:h-5 md:w-5" />
      </DialogTrigger>
      <DialogContent className="max-w-lg border border-zinc-800 bg-zinc-900 p-4 text-zinc-100">
        <button
          className="absolute right-2 top-2 text-zinc-400 transition-colors hover:text-zinc-100"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-4 w-4 md:h-5 md:w-5" />
        </button>
        <DialogHeader>
          <DialogTitle>About anonymous posts</DialogTitle>
        </DialogHeader>
        <hr className="border-zinc-800" />
        <div className="flex flex-col gap-3 text-lg text-zinc-200">
          <p>This submission was made without signing in.</p>
          <p className="text-base leading-5 text-zinc-400">
            If this is your post and you would like for it to be taken down,
            please reach out to us by emailing Deborah MacDonald at the Young
            Lives Research Lab at York University at:{" "}
            <Link
              href="mailto:dmacd@yorku.ca"
              className="text-blue-500 underline underline-offset-4"
              target="_blank"
            >
              dmacd@yorku.ca
            </Link>
            .
          </p>
          <p className="text-base leading-5 text-zinc-400">
            We will get back to you as soon possible if we require any further
            details from your end.
          </p>
          <Link
            href="mailto:dmacd@yorku.ca"
            className="mt-2 w-fit rounded-md border-2 border-red-600 px-2 py-1 text-base font-semibold text-red-500 transition hover:bg-red-600 hover:text-white"
            target="_blank"
          >
            Request Deletion
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnonymousPostInfo;
