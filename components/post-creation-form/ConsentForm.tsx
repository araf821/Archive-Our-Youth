import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { Checkbox } from "@/components/ui/checkbox";

interface ConsentFormProps {
  ageVerified: boolean;
  consentChecked: boolean;
  error: boolean;
  onAgeVerificationChange: (checked: boolean) => void;
  onConsentChange: (checked: boolean) => void;
}

export const ConsentForm = ({
  ageVerified,
  consentChecked,
  error,
  onAgeVerificationChange,
  onConsentChange,
}: ConsentFormProps) => {
  const t = useTranslations("PostCreation");

  return (
    <motion.div className="rounded-lg border p-4 md:p-6">
      <AnimatePresence>
        {error ? (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            exit={{
              height: 0,
              opacity: 0,
              transition: { duration: 0.1 },
            }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: { duration: 0.2 },
            }}
            className="mb-2 text-red-500"
          >
            {t("errors.consentRequired")}
          </motion.p>
        ) : null}
      </AnimatePresence>
      <div className="space-y-4">
        <div className="flex gap-2">
          <Checkbox
            id="age-verification"
            checked={ageVerified}
            onCheckedChange={(checked) =>
              onAgeVerificationChange(checked as boolean)
            }
            className="size-5 translate-y-1"
          />
          <label
            htmlFor="age-verification"
            className="leading-relaxed text-text-secondary max-md:text-sm"
          >
            {t("consentForm.ageVerification.label.part1")}{" "}
            {t("consentForm.ageVerification.label.part2")}{" "}
            <a
              href="mailto:younglives@edu.yorku.ca"
              className="text-blue-400 underline"
            >
              younglives@edu.yorku.ca
            </a>
            {t("consentForm.ageVerification.label.part3")}
          </label>
        </div>

        <div className="flex gap-2">
          <Checkbox
            id="consent"
            checked={consentChecked}
            onCheckedChange={(checked) => onConsentChange(checked as boolean)}
            className="size-5 translate-y-1"
          />
          <label
            htmlFor="consent"
            className="space-y-4 leading-relaxed text-text-secondary max-md:text-sm"
          >
            <p>{t("consentForm.consent.label")}</p>
            <p>{t("consentForm.consent.researchPurpose")}</p>
            <p>{t("consentForm.consent.rightsNotice")}</p>
            <p>{t("consentForm.consent.deletionInfo")}</p>
            <p>{t("consentForm.consent.anonymousNote")}</p>
            <p>
              {t("consentForm.consent.readMore")}
              <Link
                href="/consent-form.pdf"
                target="_blank"
                className="text-blue-400 underline"
              >
                {t("consentForm.consent.readMore")}
              </Link>
              .
            </p>
          </label>
        </div>
      </div>
    </motion.div>
  );
};
