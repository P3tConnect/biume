"use client";

import { useSearchParams } from "next/navigation";
import { useQuotesSearchParams } from "@/src/hooks/use-quotes-search-params";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { QuotesDataTable } from "./components/quotes-data-table";
import { QuotesFilters } from "./components/quotes-filters";
import { QuotesKanban } from "./components/quotes-kanban";
import { ViewToggle } from "./components/view-toggle";
import { useState } from "react";

type ViewMode = "table" | "kanban";

export function DashboardQuotesComponent() {
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const searchParams = useSearchParams();
  const {
    page,
    perPage,
    sort,
    status,
    search,
    dateRange,
    updateSearchParams
  } = useQuotesSearchParams();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Devis</h1>
          <p className="text-muted-foreground">
            Gérez vos devis et convertissez-les en factures
          </p>
        </div>
        <div className="flex items-center gap-4">
          <ViewToggle value={viewMode} onValueChange={setViewMode} />
          <Button asChild>
            <Link href="/dashboard/quotes/new">
              <Plus className="mr-2 h-4 w-4" />
              Nouveau devis
            </Link>
          </Button>
        </div>
      </div>

      <QuotesFilters />

      {viewMode === "table" ? (
        <Card className="p-6">
          <QuotesDataTable />
        </Card>
      ) : (
        <QuotesKanban />
      )}
    </div>
  );
}
