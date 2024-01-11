import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateString = (
  dateInString: string,
  options: { hideTime?: boolean; hideMonth?: boolean },
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

  if (!options.hideMonth && !options.hideTime) {
    formattedDate = `${formattedHours}:${formattedMinutes} ${ampm} | ${month} ${day}, ${year}`;
  } else if (options.hideMonth && !options.hideTime) {
    formattedDate = `${formattedHours}:${formattedMinutes} ${ampm}`;
  } else if (options.hideTime && !options.hideMonth) {
    formattedDate = `${month} ${day}, ${year}`;
  }

  return formattedDate;
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
