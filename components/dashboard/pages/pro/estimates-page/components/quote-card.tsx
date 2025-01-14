"use client";

import { Card } from "@/components/ui/card";
import { Quote } from "@/types/quote";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Eye, MoreVertical } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/src/lib/utils";

interface QuoteCardProps {
  quote: Quote;
}

export function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute right-2 top-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link
                href={`/dashboard/quotes/${quote.id}`}
                className="flex items-center"
              >
                <Eye className="mr-2 h-4 w-4" />
                Voir
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Link
        href={`/dashboard/quotes/${quote.id}`}
        className="block p-4 hover:bg-muted/50"
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{quote.number}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{quote.client.name}</span>
            <span>{format(new Date(quote.date), "dd/MM/yyyy", { locale: fr })}</span>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-sm font-medium">
              {new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
              }).format(quote.amount)}
            </span>
          </div>
        </div>
      </Link>
    </Card>
  );
} 