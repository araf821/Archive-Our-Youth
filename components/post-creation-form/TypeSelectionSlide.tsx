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
    <div className="mx-auto w-full max-w-4xl rounded-lg border p-4 md:p-6">
      <FormField
        control={form.control}
        name="contentType"
        render={() => (
          <FormItem className="space-y-6">
            <div>
              <p className="text-lg font-medium text-text-primary">
                Content Type
              </p>
              <p className="text-sm text-text-secondary">
                Select the format for your post
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              <FormControl>
                <button
                  type="button"
                  onClick={() => {
                    handleTypeChange("TEXT");
                  }}
                  className={cn(
                    "w-full rounded-md border border-border px-4 py-3 text-sm text-text-primary transition-colors hover:bg-primary/10",
                    {
                      "border-primary/50 bg-background-elevated bg-primary/10":
                        type === "TEXT",
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
                      "border-primary/50 bg-background-elevated bg-primary/10":
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
                      "border-primary/50 bg-background-elevated bg-primary/10":
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
                      "border-primary/50 bg-background-elevated bg-primary/10":
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
                      "border-primary/50 bg-background-elevated bg-primary/10":
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
