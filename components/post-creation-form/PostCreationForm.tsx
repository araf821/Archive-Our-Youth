"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Form } from "../ui/Form";

import { IntroScreen } from "./IntroScreen";
import { ConfirmationScreen } from "./ConfirmationScreen";
import ResearchQuestions from "./ResearchQuestions";
import TypeSelectionSlide from "./TypeSelectionSlide";
import TitleSlide from "./TitleSlide";
import ContentSlide from "./ContentSlide";
import DescriptionSlide from "./DescriptionSlide";
import TagSelectionSlide from "./TagSelectionSlide";
import ThumbnailSlide from "./ThumbnailSlide";
import LocationSelection from "./LocationSelection";

// Hooks
import { usePostForm } from "./hooks/usePostForm";
import { useCarouselNavigation } from "./hooks/useCarouselNavigation";

const PostCreationForm = () => {
  const { form, handleTypeChange, onSubmit, isLoading, contentType } =
    usePostForm();
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [{ checked, error }, setConsentChecked] = useState({
    checked: false,
    error: false,
  });

  // Setup keyboard navigation
  useCarouselNavigation(api);

  const handleSubmit = async () => {
    const result = await onSubmit(form.getValues(), checked);

    if (!result.success) {
      setConsentChecked((prev) => ({
        ...prev,
        error: true,
      }));
      toast.error(result.error || "Something went wrong.");
      return;
    }

    toast.success("Your post has been published!");
  };

  const handleConsentChange = (checked: boolean) => {
    setConsentChecked(() => ({
      checked,
      error: checked ? false : true,
    }));
  };

  return (
    <Carousel setApi={setApi} className="w-full max-w-screen-md px-4">
      <Form {...form}>
        <form className="mx-auto" onSubmit={form.handleSubmit(handleSubmit)}>
          <CarouselContent>
            <CarouselItem>
              <IntroScreen api={api} />
            </CarouselItem>

            <CarouselItem>
              <ResearchQuestions form={form} />
            </CarouselItem>

            <CarouselItem>
              <TypeSelectionSlide
                form={form}
                nextStep={() => api?.scrollNext()}
                handleTypeChange={handleTypeChange}
              />
            </CarouselItem>

            <CarouselItem>
              <TitleSlide form={form} />
            </CarouselItem>

            <CarouselItem>
              <ContentSlide form={form} />
            </CarouselItem>

            <CarouselItem>
              <ThumbnailSlide form={form} />
            </CarouselItem>

            {contentType !== "TEXT" && (
              <CarouselItem>
                <DescriptionSlide form={form} />
              </CarouselItem>
            )}

            <CarouselItem>
              <TagSelectionSlide form={form} />
            </CarouselItem>

            <CarouselItem>
              <LocationSelection form={form} />
            </CarouselItem>

            <CarouselItem>
              <ConfirmationScreen
                form={form}
                api={api}
                isLoading={isLoading}
                checked={checked}
                error={error}
                onCheckedChange={handleConsentChange}
                onSubmit={handleSubmit}
              />
            </CarouselItem>
          </CarouselContent>
        </form>
      </Form>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default PostCreationForm;
