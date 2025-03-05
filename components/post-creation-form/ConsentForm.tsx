import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

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
            Click this box if you are 16 years old or older. If you are under
            16, we&apos;d love to hear from you with your post over email!
            Please reach out to us at{" "}
            <a
              href="mailto:younglives@edu.yorku.ca"
              className="text-blue-400 underline"
            >
              younglives@edu.yorku.ca
            </a>
            , subject line: Archive Submission.
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
            <p>
              Click this box if you agree that your submission can be used for
              research purposes.
            </p>

            <p>
              What&apos;s the research purpose? To document and better
              understand youth and planetary well-being. Posts on the archive
              might be used in presentations, classrooms, and/or publications
              like social media posts, journal articles, and books.
            </p>

            <p>All intellectual and creative rights remain yours.</p>

            <p>
              You can delete your post at any time by signing in and deleting it
              directly, or by emailing Deborah MacDonald at the Young Lives
              Research Lab at York University at:{" "}
              <a
                className="text-blue-400 underline"
                href="mailto:dmacd@yorku.ca"
              >
                dmacd@yorku.ca
              </a>
              .
            </p>

            <p>
              If you submit anonymously (you don&apos;t make an account/sign
              in), you can only delete your post by emailing the contact above.
            </p>

            <p>
              We encourage you to read the full{" "}
              <Link
                href="/consent-form.pdf"
                target="_blank"
                className="text-blue-400 underline"
              >
                consent form here
              </Link>
              .
            </p>
          </label>
        </div>
      </div>
    </motion.div>
  );
};
