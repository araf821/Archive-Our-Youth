"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import { useLanguage } from "../providers/LanguageProvider";
import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";

const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
];

export const LanguageSwitcherModal = () => {
  const { isOpen, type, onClose } = useModal();
  const { currentLocale, setLocale } = useLanguage();

  const isModalOpen = isOpen && type === "languageSwitcherModal";
  const currentLanguage = languages.find((lang) => lang.code === currentLocale);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md gap-6 p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Select Language
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Archive Our Youth is currently in beta. While we strive to provide
            accurate translations, some content may only be available in English
            during this phase.
          </p>

          <div className="grid gap-2">
            {languages.map((language) => (
              <Button
                key={language.code}
                variant={
                  currentLocale === language.code ? "default" : "outline"
                }
                className={cn(
                  "w-full justify-start text-left font-normal",
                  currentLocale === language.code &&
                    "bg-green-600 hover:bg-green-500",
                )}
                onClick={() => {
                  setLocale(language.code);
                  onClose();
                }}
              >
                <span>{language.label}</span>
                {currentLocale === language.code && (
                  <span className="ml-auto">✓</span>
                )}
              </Button>
            ))}
          </div>

          <p className="text-muted-foreground text-xs">
            Help us improve! If you notice any translation issues, please let us
            know through the contact form.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
