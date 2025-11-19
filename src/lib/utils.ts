import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function minToHours(minutes: number): string {
  const minsInHour = 60;
  const minsInDay = 60 * 24;

  if (minutes >= minsInDay) {
    const days = Math.floor(minutes / minsInDay);
    const rem = minutes % minsInDay;
    const hours = Math.floor(rem / minsInHour);
    const mins = rem % minsInHour;

    if (hours === 0 && mins === 0) return `${days}d`;
    if (mins === 0) return `${days}d ${hours}h`;
    return `${days}d ${hours}h ${mins}m`;
  }

  if (minutes >= minsInHour) {
    const hours = Math.floor(minutes / minsInHour);
    const mins = minutes % minsInHour;
    return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`;
  }

  return `${minutes}m`;
}