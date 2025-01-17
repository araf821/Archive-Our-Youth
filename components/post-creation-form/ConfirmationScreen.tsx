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
    <ConsentForm
      checked={checked}
      error={error}
      onCheckedChange={onCheckedChange}
    />
  );
};
