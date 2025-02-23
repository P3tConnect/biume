import { parseAsString } from "nuqs/server";

export function parseSearchParams(searchParams: { [key: string]: string | string[] | undefined }) {
  return {
    search: searchParams.search?.toString() || "",
    location: searchParams.location?.toString() || "",
    categories: searchParams.categories?.toString()?.split(",") || [],
    availableToday: searchParams.availableToday?.toString() === "true",
    instantBooking: searchParams.instantBooking?.toString() === "true",
    sortBy: searchParams.sortBy?.toString() || "recommended",
    page: searchParams.page?.toString() || "1",
  };
} 