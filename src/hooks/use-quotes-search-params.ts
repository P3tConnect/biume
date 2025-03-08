import { usePathname, useRouter } from "next/navigation"
import { useQueryState } from "nuqs"
import { useCallback } from "react"

export type QuoteStatus = "draft" | "sent" | "accepted" | "rejected" | "expired"

export function useQuotesSearchParams() {
  const pathname = usePathname()
  const router = useRouter()

  const [page, setPage] = useQueryState("page", {
    defaultValue: "1",
    parse: value => value,
  })

  const [perPage, setPerPage] = useQueryState("per_page", {
    defaultValue: "10",
    parse: value => value,
  })

  const [sort, setSort] = useQueryState("sort", {
    defaultValue: "created_at.desc",
    parse: value => value,
  })

  const [status, setStatus] = useQueryState<QuoteStatus | undefined>("status", {
    parse: value => value as QuoteStatus,
  })

  const [search, setSearch] = useQueryState("search", {
    parse: value => value,
  })

  const [dateRange, setDateRange] = useQueryState("date_range", {
    parse: value => value,
  })

  const updateSearchParams = useCallback(
    (params: Record<string, string | undefined>) => {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          searchParams.set(key, value)
        }
      })
      router.push(`${pathname}?${searchParams.toString()}`)
    },
    [pathname, router]
  )

  return {
    page,
    setPage,
    perPage,
    setPerPage,
    sort,
    setSort,
    status,
    setStatus,
    search,
    setSearch,
    dateRange,
    setDateRange,
    updateSearchParams,
  }
}
