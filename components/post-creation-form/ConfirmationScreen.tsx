import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { PostCreationValidator } from "@/lib/validators/post";

import { ConsentForm } from "./ConsentForm";

interface ConfirmationScreenProps {
  form: UseFormReturn<z.infer<typeof PostCreationValidator>>;
  isLoading: boolean;
  ageVerified: boolean;
  consentChecked: boolean;
  error: boolean;
  onAgeVerificationChange: (checked: boolean) => void;
  onConsentChange: (checked: boolean) => void;
}

export const ConfirmationScreen = ({
  ageVerified,
  consentChecked,
  error,
  onAgeVerificationChange,
  onConsentChange,
}: ConfirmationScreenProps) => {
  return (
    <ConsentForm
      ageVerified={ageVerified}
      consentChecked={consentChecked}
      error={error}
      onAgeVerificationChange={onAgeVerificationChange}
      onConsentChange={onConsentChange}
    />
  );
};
