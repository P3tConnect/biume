"use client"

import { Organization } from "@/src/db"

import { FiltersBar } from "./filters-bar"
import { MainContent } from "./main-content"

interface SearchResultsProps {
  organizations: Organization[]
}

export function SearchResults({ organizations }: SearchResultsProps) {
  return (
    <>
      <FiltersBar />
      <MainContent organizations={organizations} />
    </>
  )
}
