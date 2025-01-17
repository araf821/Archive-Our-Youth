import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { PostCreationValidator } from "@/lib/validators/post";
import { ConsentForm } from "./ConsentForm";

interface ConfirmationScreenProps {
  form: UseFormReturn<z.infer<typeof PostCreationValidator>>;
  isLoading: boolean;
  checked: boolean;
  error: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const ConfirmationScreen = ({
  form,
  isLoading,
  checked,
  error,
  onCheckedChange,
}: ConfirmationScreenProps) => {
  return (
    <div className="mx-auto flex max-w-screen-sm flex-col justify-center space-y-4">
      <ConsentForm
        checked={checked}
        error={error}
        onCheckedChange={onCheckedChange}
      />

      <button
        type="submit"
        disabled={
          isLoading ||
          !!form.formState.errors.content ||
          !!form.formState.errors.contentType ||
          !!form.formState.errors.title ||
          !!form.formState.errors.description
        }
        className="morph-md rounded-md bg-zinc-800 px-3 py-2 transition hover:bg-background-surface disabled:opacity-70 disabled:hover:bg-zinc-800"
      >
        {!!form.formState.errors.content ||
        !!form.formState.errors.contentType ||
        !!form.formState.errors.title ||
        !!form.formState.errors.description
          ? "Form Incomplete"
          : "Submit Post"}
      </button>
    </div>
  );
};
