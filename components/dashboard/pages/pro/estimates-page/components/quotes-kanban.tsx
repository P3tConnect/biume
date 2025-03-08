"use client"

import { Ban, Clock, FileText, Send, ThumbsUp } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/src/lib/utils"
import { QuoteStatus } from "@/types/quote"

import { QuoteCard } from "./quote-card"

const columns: {
  id: QuoteStatus
  title: string
  icon: React.ElementType
  color: string
}[] = [
  {
    id: "draft",
    title: "Brouillons",
    icon: FileText,
    color: "text-muted-foreground",
  },
  {
    id: "sent",
    title: "Envoyés",
    icon: Send,
    color: "text-blue-500",
  },
  {
    id: "accepted",
    title: "Acceptés",
    icon: ThumbsUp,
    color: "text-green-500",
  },
  {
    id: "rejected",
    title: "Refusés",
    icon: Ban,
    color: "text-red-500",
  },
  {
    id: "expired",
    title: "Expirés",
    icon: Clock,
    color: "text-yellow-500",
  },
]

// TODO: Remplacer par les vraies données
const mockQuotes = [
  {
    id: "1",
    number: "DEV-2024-001",
    client: { id: "1", name: "Client A" },
    date: new Date().toISOString(),
    amount: 1500,
    status: "draft" as QuoteStatus,
  },
  {
    id: "2",
    number: "DEV-2024-002",
    client: { id: "2", name: "Client B" },
    date: new Date().toISOString(),
    amount: 2500,
    status: "sent" as QuoteStatus,
  },
]

export function QuotesKanban() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {columns.map(column => (
        <Card key={column.id} className="p-4">
          <div className="mb-4 flex items-center gap-2">
            <column.icon className={cn("h-5 w-5", column.color)} />
            <h3 className="font-semibold">{column.title}</h3>
            <Badge variant="secondary" className="ml-auto">
              {mockQuotes.filter(q => q.status === column.id).length}
            </Badge>
          </div>
          <div className="space-y-4">
            {mockQuotes
              .filter(quote => quote.status === column.id)
              .map(quote => {
                const { id, number, client, date, amount, status } = quote
                return (
                  <QuoteCard
                    key={id}
                    quote={{ id, number, client, date, amount, status, createdAt: "", updatedAt: "" }}
                  />
                )
              })}
          </div>
        </Card>
      ))}
    </div>
  )
}
