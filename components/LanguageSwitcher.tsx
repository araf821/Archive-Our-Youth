"use client";

import { useLanguage } from "./providers/LanguageProvider";
import { Button } from "./ui/button";
import { Languages } from "lucide-react";
import { useModal } from "@/hooks/useModal";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
];

export const LanguageSwitcher = () => {
  const { currentLocale } = useLanguage();
  const { onOpen } = useModal();

  const currentLanguage = languages.find((lang) => lang.code === currentLocale);

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onOpen("languageSwitcherModal")}
        className={cn(
          "gap-2 border-zinc-700/50 bg-zinc-800/50 text-zinc-100 backdrop-blur-sm transition-all duration-300",
          "hover:border-green-500/30 hover:bg-zinc-800/70 hover:text-green-400 hover:shadow-md hover:shadow-green-500/10",
        )}
      >
        <motion.div
          animate={{ rotate: [0, 10, 0] }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 5,
          }}
        >
          <Languages className="size-4" />
        </motion.div>
        {currentLanguage?.label || "Language"}
      </Button>
    </motion.div>
  );
};
