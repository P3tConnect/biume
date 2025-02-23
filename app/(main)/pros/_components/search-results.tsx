"use client";

import { FiltersBar } from "./filters-bar";
import { MainContent } from "./main-content";
import { Organization } from "@/src/db";

interface SearchResultsProps {
  organizations: Organization[];
}

export function SearchResults({ organizations }: SearchResultsProps) {
  return (
    <>
      <FiltersBar />
      <MainContent organizations={organizations} />
    </>
  );
} 