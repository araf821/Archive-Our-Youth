"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Form } from "../ui/Form";
import { ConsentForm } from "./ConsentForm";
import ContentSlide from "./ContentSlide";
import DescriptionSlide from "./DescriptionSlide";
import { usePostForm } from "./hooks/usePostForm";
import LocationSelection from "./LocationSelection";
import ResearchQuestions from "./ResearchQuestions";
import TagSelectionSlide from "./TagSelectionSlide";
import ThumbnailSlide from "./ThumbnailSlide";
import TitleSlide from "./TitleSlide";
import TypeSelectionSlide from "./TypeSelectionSlide";

const PostCreationForm = () => {
  const t = useTranslations("PostCreation");
  const { form, handleTypeChange, onSubmit, isLoading, contentType } =
    usePostForm();
  const [{ ageVerified, consentChecked, error }, setConsent] = useState({
    ageVerified: false,
    consentChecked: false,
    error: false,
  });

  const handleSubmit = async () => {
    try {
      if (!ageVerified || !consentChecked) {
        setConsent((prev) => ({
          ...prev,
          error: true,
        }));
        toast.error(t("errors.consentRequired"));
        return;
      }

      const result = await onSubmit(form.getValues(), consentChecked);

      if (!result.success) {
        setConsent((prev) => ({
          ...prev,
          error: true,
        }));
        toast.error(result.error || t("errors.generalError"));
        return;
      }

      toast.success(t("success.published"));
    } catch (error) {
      toast.error(t("errors.generalError"));
    }
  };

  const handleAgeVerificationChange = (checked: boolean) => {
    setConsent((prev) => ({
      ...prev,
      ageVerified: checked,
      error: checked ? prev.error : true,
    }));
  };

  const handleConsentChange = (checked: boolean) => {
    setConsent((prev) => ({
      ...prev,
      consentChecked: checked,
      error: checked ? prev.error : true,
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
          ageVerified={ageVerified}
          consentChecked={consentChecked}
          error={error}
          onAgeVerificationChange={handleAgeVerificationChange}
          onConsentChange={handleConsentChange}
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
            ? t("formIncomplete")
            : t("submitPost")}
        </button>
      </form>
    </Form>
  );
};

export default PostCreationForm;
