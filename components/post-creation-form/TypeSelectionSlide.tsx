"use client";

import { PostCreationForm } from "@/lib/types/form";
import { FC } from "react";
import { FormControl, FormField, FormItem } from "../ui/Form";
import { cn } from "@/lib/utils";
import { ContentType } from "@prisma/client";

interface TypeSelectionSlideProps {
  form: PostCreationForm;
  handleTypeChange: (type: ContentType) => void;
}

const TypeSelectionSlide: FC<TypeSelectionSlideProps> = ({
  form,
  handleTypeChange,
}) => {
  const type = form.watch("contentType");
  return (
    <div className="flex flex-col items-center justify-center space-y-10 max-sm:my-12 md:space-y-14">
      <div className="flex">
        <span className="aspect-square w-7 bg-[#D5222A] md:w-10" />
        <span className="aspect-square w-7 bg-[#FA322C] md:w-10" />
      </div>
      <p className="text-center text-xl max-md:max-w-[290px] md:text-2xl">
        What type of content would you like to submit?
      </p>
      <FormField
        control={form.control}
        name="contentType"
        render={() => (
          <FormItem className="flex flex-col items-center gap-2 md:gap-4">
            <div className="flex justify-around max-md:flex-col max-md:gap-4 md:gap-8">
              <FormControl>
                <button
                  type="button"
                  onClick={() => handleTypeChange("TEXT")}
                  className={cn(
                    "w-36 border-2 border-[#D5222A] bg-transparent py-2 transition hover:scale-105 active:scale-95",
                    {
                      "bg-[#D5222A] shadow-[0_4px_20px_4px] shadow-white/10 md:text-lg":
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
                  onClick={() => handleTypeChange("IMAGE")}
                  className={cn(
                    "w-36 border-2 border-[#D5222A] bg-transparent py-2 transition hover:scale-105 active:scale-95",
                    {
                      "bg-[#D5222A] shadow-[0_4px_20px_4px] shadow-white/10 md:text-lg":
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
                  onClick={() => handleTypeChange("VIDEO")}
                  className={cn(
                    "w-36 border-2 border-[#D5222A] bg-transparent py-2 transition hover:scale-105 active:scale-95",
                    {
                      "bg-[#D5222A] shadow-[0_4px_20px_4px] shadow-white/10 md:text-lg":
                        type === "VIDEO",
                    },
                  )}
                >
                  Video
                </button>
              </FormControl>
            </div>

            <div className="flex justify-around max-md:flex-col max-md:gap-4 md:gap-8">
              <FormControl>
                <button
                  type="button"
                  onClick={() => handleTypeChange("AUDIO")}
                  className={cn(
                    "w-36 border-2 border-[#D5222A] bg-transparent py-2 transition hover:scale-105 active:scale-95",
                    {
                      "bg-[#D5222A] shadow-[0_4px_20px_4px] shadow-white/10 md:text-lg":
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
                  onClick={() => handleTypeChange("PDF")}
                  className={cn(
                    "w-36 border-2 border-[#D5222A] bg-transparent py-2 transition hover:scale-105 active:scale-95",
                    {
                      "bg-[#D5222A] shadow-[0_4px_20px_4px] shadow-white/10 md:text-lg":
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
