import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

interface ConsentFormProps {
  checked: boolean;
  error: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const ConsentForm = ({
  checked,
  error,
  onCheckedChange,
}: ConsentFormProps) => {
  return (
    <motion.div className="py-6">
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
            className="text-red-500"
          >
            Your consent is required for us to approve your submission.
          </motion.p>
        ) : null}
      </AnimatePresence>
      <div className="flex gap-2">
        <Checkbox
          id="consent"
          checked={checked}
          onCheckedChange={(checked) => onCheckedChange(checked as boolean)}
          className="h-5 w-5 translate-y-1 border border-zinc-500 bg-zinc-700 checked:bg-zinc-600 data-[state=checked]:bg-green-600"
        />
        <label
          htmlFor="consent"
          className="space-y-3 text-zinc-100 max-md:text-sm"
        >
          <p>
            Click this box if you agree that your submission can be used for
            research purposes. The Archive will contribute to a better
            understanding of youth and planetary well-being and will be used to
            develop future presentations, teaching and/or publications such as
            social media posts, journal articles, and books.
          </p>

          <p>All intellectual and creative rights remain yours.</p>

          <p>
            You have the right to stop participating and delete your submission
            at any time by signing in and deleting it directly, or by emailing
            Deborah MacDonald at the Young Lives Research Lab at York University
            at:{" "}
            <a className="text-blue-400 underline" href="mailto:dmacd@yorku.ca">
              dmacd@yorku.ca
            </a>
            .
          </p>

          <p>
            You have the right to submit anonymously. If you submit anonymously,
            you can only delete your post by emailing the contact above.
          </p>

          <p>
            Please read the full{" "}
            <Link
              href="/consent-form.pdf"
              target="_blank"
              className="text-blue-400 underline"
            >
              consent form here.
            </Link>
          </p>
        </label>
      </div>
    </motion.div>
  );
};
