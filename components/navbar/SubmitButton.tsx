"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { useModal } from "@/hooks/useModal";

const SubmitButton = ({ pathname }: { pathname: string }) => {
  const t = useTranslations();
  const { user } = useUser();
  const router = useRouter();
  const { onOpen: onOpenModal } = useModal();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative overflow-hidden rounded-full bg-gradient-to-r px-6 py-2 font-medium text-white shadow-sm transition-all duration-300",
        pathname === "/submit"
          ? "from-green-500 to-green-300 shadow-green-500/20"
          : "from-green-600 to-green-400 hover:shadow-lg hover:shadow-green-500/20",
      )}
      onClick={() => {
        if (user) {
          router.push("/submit");
        } else {
          onOpenModal("submitAuthModal");
        }
      }}
    >
      <span className="relative z-10">{t("Navigation.submit")}</span>
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-300"
      />
    </motion.button>
  );
};

export default SubmitButton;
