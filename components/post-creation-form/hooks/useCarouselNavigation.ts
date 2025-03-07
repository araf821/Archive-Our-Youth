import { useEffect } from "react";

import { CarouselApi } from "@/components/ui/carousel";

export const useCarouselNavigation = (api: CarouselApi | null) => {
  useEffect(() => {
    if (!api) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      const isInputFocused =
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement;

      // If an input is focused, don't change steps
      if (isInputFocused) {
        return;
      }

      switch (event.key) {
        case "ArrowRight":
          event.preventDefault();
          api?.scrollNext();
          break;
        case "ArrowLeft":
          event.preventDefault();
          api?.scrollPrev();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [api]);

  return api;
};
