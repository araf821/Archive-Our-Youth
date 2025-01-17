"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Form } from "../ui/Form";

import { IntroScreen } from "./IntroScreen";
import ResearchQuestions from "./ResearchQuestions";
import TypeSelectionSlide from "./TypeSelectionSlide";
import TitleSlide from "./TitleSlide";
import ContentSlide from "./ContentSlide";
import DescriptionSlide from "./DescriptionSlide";
import TagSelectionSlide from "./TagSelectionSlide";
import ThumbnailSlide from "./ThumbnailSlide";
import LocationSelection from "./LocationSelection";

import { usePostForm } from "./hooks/usePostForm";
import { ConsentForm } from "./ConsentForm";

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
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(handleSubmit)}>
        <ResearchQuestions form={form} />

        <TypeSelectionSlide form={form} handleTypeChange={handleTypeChange} />

        <TitleSlide form={form} />

        <ContentSlide form={form} />

        {contentType !== "IMAGE" && <ThumbnailSlide form={form} />}

        {contentType !== "TEXT" && <DescriptionSlide form={form} />}

        <TagSelectionSlide form={form} />

        <LocationSelection form={form} />

        <ConsentForm
          checked={checked}
          error={error}
          onCheckedChange={handleConsentChange}
        />

        <hr />

        <button
          type="submit"
          disabled={
            isLoading ||
            !!form.formState.errors.content ||
            !!form.formState.errors.contentType ||
            !!form.formState.errors.title ||
            !!form.formState.errors.description
          }
          className="rounded-md bg-zinc-800 px-3 py-2 transition hover:bg-background-surface disabled:opacity-70 disabled:hover:bg-zinc-800"
        >
          {!!form.formState.errors.content ||
          !!form.formState.errors.contentType ||
          !!form.formState.errors.title ||
          !!form.formState.errors.description
            ? "Form Incomplete"
            : "Submit Post"}
        </button>
      </form>
    </Form>
  );
};

export default PostCreationForm;
