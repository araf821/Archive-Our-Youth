"use client";

import { useState } from "react";
import { toast } from "sonner";
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

const PostCreationForm = () => {
  const { form, handleTypeChange, onSubmit, isLoading, contentType } =
    usePostForm();
  const [{ checked, error }, setConsentChecked] = useState({
    checked: false,
    error: false,
  });

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
    <div className="mx-auto max-w-3xl">
      <Form {...form}>
        <form
          className="mx-auto space-y-8"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="space-y-8">
            <IntroScreen />

            <div className="space-y-8 rounded-lg border border-zinc-800 p-6">
              <ResearchQuestions form={form} />

              <TypeSelectionSlide
                form={form}
                handleTypeChange={handleTypeChange}
              />

              <TitleSlide form={form} />

              <ContentSlide form={form} />

              <ThumbnailSlide form={form} />

              {contentType !== "TEXT" && <DescriptionSlide form={form} />}

              <TagSelectionSlide form={form} />

              <LocationSelection form={form} />
            </div>

            <ConfirmationScreen
              form={form}
              isLoading={isLoading}
              checked={checked}
              error={error}
              onCheckedChange={handleConsentChange}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PostCreationForm;
