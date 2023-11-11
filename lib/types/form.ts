import { UseFormReturn } from "react-hook-form";

export type PostCreationForm = UseFormReturn<
  {
    title: string;
    contentType: "TEXT" | "IMAGE" | "VIDEO" | "AUDIO";
    content: string;
    tags: string[];
    researchQuestions: string[];
    description?: string | undefined;
  },
  any,
  undefined
>;