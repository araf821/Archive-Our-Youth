"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
  layoutId?: string;
  activeTab?: string;
}

export function AnimatedTabs({
  tabs,
  defaultTab,
  onChange,
  className,
  layoutId,
  activeTab = defaultTab || tabs[0].id,
}: AnimatedTabsProps) {
  const handleTabChange = (tabId: string) => {
    onChange?.(tabId);
  };

  return (
    <div
      className={cn("flex w-fit space-x-1 rounded-lg border p-1", className)}
    >
      {tabs.map((tab) => (
        <button
          type="button"
          key={tab.id}
          onClick={() => handleTabChange(tab.id)}
          className={`outline-ring relative rounded-md px-3 py-1.5 text-sm font-medium text-text-primary transition focus-visible:outline-2 ${
            activeTab === tab.id
              ? "text-text-primary"
              : "text-text-secondary hover:text-text-primary"
          } `}
          style={{
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {activeTab === tab.id && (
            <motion.span
              layoutId={layoutId || "bubble"}
              className="absolute inset-0 bg-primary"
              style={{ borderRadius: "var(--radius)" }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
