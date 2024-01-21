"use client";

import EmptyState from "@/components/EmptyState";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="grid h-[100dvh] w-screen place-items-center">
      <EmptyState
        title="Something went wrong."
        onClick={{
          label: "Try Again",
          action: () => reset(),
        }}
      />
    </div>
  );
}
