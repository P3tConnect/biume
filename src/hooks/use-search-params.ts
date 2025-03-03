"use client";

import { useQueryState } from "nuqs";

export function useSearchParams() {
  const [search, setSearch] = useQueryState("search");
  const [location, setLocation] = useQueryState("location");
  const [categories, setCategories] = useQueryState<string[]>("categories", {
    serialize: (value) => value.join(","),
    parse: (value) => (value ? value.split(",") : []),
  });
  const [availableToday, setAvailableToday] = useQueryState<boolean>("availableToday", {
    serialize: (value) => value.toString(),
    parse: (value) => value === "true",
  });
  const [instantBooking, setInstantBooking] = useQueryState<boolean>("instantBooking", {
    serialize: (value) => value.toString(),
    parse: (value) => value === "true",
  });
  const [sortBy, setSortBy] = useQueryState("sortBy");
  const [page, setPage] = useQueryState("page");

  return {
    search: {
      value: search ?? "",
      set: setSearch,
    },
    location: {
      value: location ?? "",
      set: setLocation,
    },
    categories: {
      value: categories ?? [],
      set: setCategories,
    },
    availableToday: {
      value: availableToday ?? false,
      set: setAvailableToday,
    },
    instantBooking: {
      value: instantBooking ?? false,
      set: setInstantBooking,
    },
    sortBy: {
      value: sortBy ?? "recommended",
      set: setSortBy,
    },
    page: {
      value: page ?? "1",
      set: setPage,
    },
  };
} 