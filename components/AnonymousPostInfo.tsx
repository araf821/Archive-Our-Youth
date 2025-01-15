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
        <Info className="size-4 md:h-5 md:w-5" />
      </DialogTrigger>
      <DialogContent className="max-w-lg border border-border-dark bg-zinc-900 p-4 text-zinc-100 md:p-8">
        <button
          className="absolute right-2 top-2 text-zinc-400 transition-colors hover:text-zinc-100"
          onClick={() => setIsOpen(false)}
        >
          <X className="size-4 md:h-5 md:w-5" />
        </button>
        <DialogHeader>
          <DialogTitle>About anonymous posts</DialogTitle>
        </DialogHeader>
        <hr className="border-border-dark" />
        <div className="flex flex-col gap-3">
          <p className="text-zinc-200  md:text-lg">
            This submission was made without signing in.
          </p>
          <p className="leading-5 text-zinc-400 max-md:text-sm">
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
          <p className="leading-5 text-zinc-400 max-md:text-sm">
            We will get back to you as soon possible if we require any further
            details from your end.
          </p>
          <Link
            href="mailto:dmacd@yorku.ca"
            className="mt-2 w-fit rounded-md border border-red-600 bg-red-500/25 px-3 py-2 font-medium text-red-100 transition hover:bg-red-600 hover:text-white max-md:text-sm"
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
