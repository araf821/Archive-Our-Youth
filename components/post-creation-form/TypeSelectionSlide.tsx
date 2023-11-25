"use client";

import { PostCreationForm } from "@/lib/types/form";
import { FC } from "react";
import { FormControl, FormField, FormItem } from "../ui/Form";
import { cn } from "@/lib/utils";
import { ContentType } from "@prisma/client";

interface TypeSelectionSlideProps {
  form: PostCreationForm;
  handleTypeChange: (type: ContentType) => void;
  nextStep: () => void;
}

const TypeSelectionSlide: FC<TypeSelectionSlideProps> = ({
  nextStep,
  form,
  handleTypeChange,
}) => {
  const type = form.watch("contentType");
  return (
    <div className="flex flex-col items-center justify-center space-y-10 max-sm:my-12 md:space-y-14">
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
                  onClick={() => {
                    nextStep();
                    handleTypeChange("TEXT");
                  }}
                  className={cn(
                    "w-36 border-2 border-green-600 bg-transparent py-2 transition hover:shadow-[0_0_20px_2px] hover:shadow-green-600/50 duration-300",
                    {
                      "bg-green-600 shadow-[0_4px_20px_4px] shadow-white/10 md:text-lg":
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
                    nextStep();
                    handleTypeChange("IMAGE");
                  }}
                  className={cn(
                    "w-36 border-2 border-green-600 bg-transparent py-2 transition hover:shadow-[0_0_20px_2px] hover:shadow-green-600/50 duration-300",
                    {
                      "bg-green-600 shadow-[0_4px_20px_4px] shadow-white/10 md:text-lg":
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
                    nextStep();
                    handleTypeChange("VIDEO");
                  }}
                  className={cn(
                    "w-36 border-2 border-green-600 bg-transparent py-2 transition hover:shadow-[0_0_20px_2px] hover:shadow-green-600/50 duration-300",
                    {
                      "bg-green-600 shadow-[0_4px_20px_4px] shadow-white/10 md:text-lg":
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
                  onClick={() => {
                    nextStep();
                    handleTypeChange("AUDIO");
                  }}
                  className={cn(
                    "w-36 border-2 border-green-600 bg-transparent py-2 transition hover:shadow-[0_0_20px_2px] hover:shadow-green-600/50 duration-300",
                    {
                      "bg-green-600 shadow-[0_4px_20px_4px] shadow-white/10 md:text-lg":
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
                    nextStep();
                    handleTypeChange("PDF");
                  }}
                  className={cn(
                    "w-36 border-2 border-green-600 bg-transparent py-2 transition hover:shadow-[0_0_20px_2px] hover:shadow-green-600/50 duration-300",
                    {
                      "bg-green-600 shadow-[0_4px_20px_4px] shadow-white/10 md:text-lg":
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
