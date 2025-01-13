export type QuoteStatus =
  | "draft"
  | "sent"
  | "accepted"
  | "rejected"
  | "expired";

export interface Quote {
  id: string;
  number: string;
  client: {
    id: string;
    name: string;
  };
  date: string;
  amount: number;
  status: QuoteStatus;
  createdAt: string;
  updatedAt: string;
}
