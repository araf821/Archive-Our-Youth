"use client";

import EmptyState from "@/components/EmptyState";

export default function Error({}: {}) {
  return (
    <div className="grid h-[100dvh] w-screen place-items-center">
      <EmptyState
        title="Something went wrong."
        onClick={{
          label: "Try Again",
          action: () => window.location.reload(),
        }}
      />
    </div>
  );
}
