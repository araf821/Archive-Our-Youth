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
    <div className="flex flex-col items-center justify-center space-y-10 md:space-y-14">
      <div className="flex">
        <span className="aspect-square w-8 bg-[#D5222A] md:w-12" />
        <span className="aspect-square w-8 bg-[#FA322C] md:w-12" />
      </div>
      <p className="text-center text-xl max-md:max-w-[290px] md:text-2xl">
        What type of content would you like to submit?
      </p>
      <FormField
        control={form.control}
        name="contentType"
        render={() => (
          <FormItem className="flex items-center justify-center space-y-4 max-md:flex-col md:flex-row md:space-x-6 md:space-y-0 lg:space-x-8">
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
          </FormItem>
        )}
      />
      {/* <p className="text-zinc-400 max-md:text-center max-md:text-sm md:text-left md:text-base">
        Note: You will get the chance to add a description for the image, video
        and audio file types.
      </p> */}
    </div>
  );
};

export default TypeSelectionSlide;
