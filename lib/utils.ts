import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateString = (
  dateInString: string,
  options?: { hideTime?: boolean; hideMonth?: boolean },
) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dateObj = new Date(dateInString);

  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  const month = months[dateObj.getMonth()];
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();

  let formattedDate = "";

  if (!options?.hideMonth && !options?.hideTime) {
    formattedDate = `${formattedHours}:${formattedMinutes} ${ampm} | ${month} ${day}, ${year}`;
  } else if (options.hideMonth && !options.hideTime) {
    formattedDate = `${formattedHours}:${formattedMinutes} ${ampm}`;
  } else if (options.hideTime && !options.hideMonth) {
    formattedDate = `${month} ${day}, ${year}`;
  }

  return formattedDate;
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export function isYouTubeUrl(url: string): boolean {
  const patterns = [
    /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+/,
    /^https?:\/\/(www\.)?youtube\.com\/embed\/[\w-]+/,
    /^https?:\/\/(www\.)?youtube\.com\/v\/[\w-]+/,
    /^https?:\/\/youtu\.be\/[\w-]+/,
  ];
  return patterns.some((pattern) => pattern.test(url));
}

export function getYouTubeVideoId(url: string): string | null {
  if (url.includes("youtube.com/watch?v=")) {
    return url.split("v=")[1].split("&")[0];
  }
  if (url.includes("youtube.com/embed/")) {
    return url.split("embed/")[1].split("?")[0];
  }
  if (url.includes("youtube.com/v/")) {
    return url.split("v/")[1].split("?")[0];
  }
  if (url.includes("youtu.be/")) {
    return url.split("youtu.be/")[1].split("?")[0];
  }
  return null;
}
