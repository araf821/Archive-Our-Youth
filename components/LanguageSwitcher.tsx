"use client";

import { useLanguage } from "./providers/LanguageProvider";
import { Button } from "./ui/button";
import { Languages } from "lucide-react";
import { useModal } from "@/hooks/useModal";

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
    <Button
      variant="outline"
      size="sm"
      onClick={() => onOpen("languageSwitcherModal")}
      className="gap-2"
    >
      <Languages className="size-4" />
      {currentLanguage?.label || "Language"}
    </Button>
  );
};
