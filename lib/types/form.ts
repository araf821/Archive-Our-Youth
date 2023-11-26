import { UseFormReturn } from "react-hook-form";

export type TPostCreationForm = UseFormReturn<
  {
    title: string;
    content: string;
    contentType: "TEXT" | "IMAGE" | "VIDEO" | "AUDIO" | "PDF";
    tags: string[];
    researchQuestions: string[];
    thumbnail?: string | undefined;
    description?: string | undefined;
    location?: string | undefined;
  },
  any,
  undefined
>;
