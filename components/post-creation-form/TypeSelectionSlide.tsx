"use client";

import { TPostCreationForm } from "@/lib/types/form";
import { FC } from "react";
import { FormControl, FormField, FormItem } from "../ui/Form";
import { cn } from "@/lib/utils";
import { ContentType } from "@prisma/client";

interface TypeSelectionSlideProps {
  form: TPostCreationForm;
  handleTypeChange: (type: ContentType) => void;
}

const TypeSelectionSlide: FC<TypeSelectionSlideProps> = ({
  form,
  handleTypeChange,
}) => {
  const type = form.watch("contentType");
  return (
    <div className="w-full">
      <FormField
        control={form.control}
        name="contentType"
        render={() => (
          <FormItem className="space-y-4">
            <div>
              <p className="font-medium text-text-primary">Content Type</p>
              <p className="text-sm text-text-secondary">
                Select the format for your post
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              <FormControl>
                <button
                  type="button"
                  onClick={() => {
                    handleTypeChange("TEXT");
                  }}
                  className={cn(
                    "w-full rounded-sm border px-3 py-1.5 text-sm transition-colors hover:bg-zinc-800/50",
                    {
                      "border-zinc-700 bg-zinc-800/50": type === "TEXT",
                      "border-zinc-800": type !== "TEXT",
                    },
                  )}
                >
                  Text
                </button>
              </FormControl>
              <FormControl>
                <button
                  type="button"
                  onClick={() => {
                    handleTypeChange("IMAGE");
                  }}
                  className={cn(
                    "w-full rounded-md border border-border px-3 py-2 text-sm text-text-primary transition-colors hover:bg-primary/10",
                    {
                      "border-primary/50 bg-background-elevated":
                        type === "IMAGE",
                    },
                  )}
                >
                  Image
                </button>
              </FormControl>
              <FormControl>
                <button
                  type="button"
                  onClick={() => {
                    handleTypeChange("VIDEO");
                  }}
                  className={cn(
                    "w-full rounded-md border border-border px-3 py-2 text-sm text-text-primary transition-colors hover:bg-primary/10",
                    {
                      "border-primary/50 bg-background-elevated":
                        type === "VIDEO",
                    },
                  )}
                >
                  Video
                </button>
              </FormControl>
              <FormControl>
                <button
                  type="button"
                  onClick={() => {
                    handleTypeChange("AUDIO");
                  }}
                  className={cn(
                    "w-full rounded-md border border-border px-3 py-2 text-sm text-text-primary transition-colors hover:bg-primary/10",
                    {
                      "border-primary/50 bg-background-elevated":
                        type === "AUDIO",
                    },
                  )}
                >
                  Audio
                </button>
              </FormControl>
              <FormControl>
                <button
                  type="button"
                  onClick={() => {
                    handleTypeChange("PDF");
                  }}
                  className={cn(
                    "w-full rounded-md border border-border px-3 py-2 text-sm text-text-primary transition-colors hover:bg-primary/10",
                    {
                      "border-primary/50 bg-background-elevated":
                        type === "PDF",
                    },
                  )}
                >
                  PDF
                </button>
              </FormControl>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};

export default TypeSelectionSlide;
