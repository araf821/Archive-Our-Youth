"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import { useLanguage } from "../providers/LanguageProvider";
import { Languages, X } from "lucide-react";
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
      <DialogContent className="max-w-md bg-background-muted p-4 outline-none md:py-8">
        <DialogTrigger className="absolute right-4 top-4">
          <X className="text-text-secondary transition hover:rotate-90 hover:text-zinc-200" />
        </DialogTrigger>
        <DialogHeader className="flex flex-row items-center gap-2">
          <Languages className="h-5 w-5 text-primary" />
          <div>
            <DialogTitle className="text-xl font-semibold">
              Select Language
            </DialogTitle>
            <DialogDescription>
              Choose your preferred language
            </DialogDescription>
          </div>
        </DialogHeader>

        <hr className="border-background-surface" />

        <div className="space-y-4">
          <p className="text-sm text-text-secondary">
            Archive Our Youth is currently in beta. While we strive to provide
            accurate translations, some content may only be available in English
            during this phase.
          </p>

          <div className="grid gap-2">
            {languages.map((language) => (
              <Button
                key={language.code}
                variant="ghost"
                className={cn(
                  "relative w-full justify-start text-left font-normal transition-all duration-300",
                  "hover:bg-gradient-to-r hover:from-background-surface hover:to-background-muted",
                  "border border-transparent hover:border-background-surface",
                  currentLocale === language.code && [
                    "bg-gradient-to-r from-primary/10 to-primary/5",
                    "border border-primary/20",
                    "text-primary",
                  ],
                )}
                onClick={() => {
                  setLocale(language.code);
                  onClose();
                }}
              >
                <Languages className="mr-2 h-4 w-4 opacity-50" />
                <span>{language.label}</span>
                {currentLocale === language.code && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 transform">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                )}
              </Button>
            ))}
          </div>
        </div>

        <hr className="border-background-surface" />

        <p className="text-center text-sm text-text-secondary">
          Help us improve! If you notice any translation issues, please let us
          know through the contact form.
        </p>
      </DialogContent>
    </Dialog>
  );
};
