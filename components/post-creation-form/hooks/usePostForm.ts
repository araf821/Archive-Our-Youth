import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostCreationValidator } from "@/lib/validators/post";
import { ContentType } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useCallback } from "react";

export const usePostForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof PostCreationValidator>>({
    resolver: zodResolver(PostCreationValidator),
    defaultValues: {
      title: "",
      contentType: "TEXT",
      content: "",
      thumbnail: "",
      description: "",
      tags: [],
      researchQuestions: [],
      location: "canada",
    },
  });

  const handleTypeChange = useCallback(
    (type: ContentType) => {
      if (type === form.getValues().contentType) {
        return;
      }
      form.setValue("contentType", type);
      form.setValue("content", "");
    },
    [form],
  );

  const onSubmit = async (
    values: z.infer<typeof PostCreationValidator>,
    checked: boolean,
  ) => {
    if (!checked) {
      return {
        success: false,
        error: "You must agree to the terms and conditions.",
      };
    }

    try {
      const response = await axios.post("/api/post", values);
      form.reset();
      router.push(`/post/${response.data.slug}`);
      return { success: true };
    } catch (error: any) {
      if (error.response?.status === 409) {
        return {
          success: false,
          error: "You already have a post with this title.",
        };
      } else {
        return {
          success: false,
          error: "Something went wrong.",
        };
      }
    }
  };

  return {
    form,
    handleTypeChange,
    onSubmit,
    isLoading: form.formState.isSubmitting,
    contentType: form.watch("contentType"),
    tags: form.watch("tags"),
  };
};
