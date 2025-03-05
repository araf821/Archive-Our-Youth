"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

export const IntroScreen = () => {
  const t = useTranslations();

  return (
    <div className="animate-fade-in flex w-full flex-col gap-8">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Sparkles className="size-6 text-secondary md:size-7" />
          <h1 className="text-2xl font-bold tracking-tight max-md:text-xl">
            {t("PostCreation.intro.title")}
          </h1>
        </div>
        <p className="text-text-secondary max-md:text-sm">
          {t("PostCreation.intro.subtitle")}
        </p>
      </div>

      <hr className="border-t-2" />

      <div className="space-y-6 text-text-secondary">
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-text-primary max-md:text-base">
            {t("PostCreation.intro.welcomeTitle")}
          </h2>
          <p className="leading-relaxed">
            {t("PostCreation.intro.welcomeText")}
          </p>
          <p className="leading-relaxed">
            {t("PostCreation.intro.aboutLinkText")}{" "}
            <Link
              href="/about"
              className="font-medium text-secondary underline underline-offset-4 transition-colors hover:text-secondary/80"
            >
              About Us
            </Link>
            .
          </p>
          <p className="font-medium">
            {t("PostCreation.intro.signOff.message")}
          </p>
          <p>{t("PostCreation.intro.signOff.signature")}</p>
        </div>
      </div>

      <hr className="border-t-2" />
    </div>
  );
};
