import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { stripe } from "./stripe";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function takeUniqueOrThrow<T extends unknown[]>(values: T): T[number] {
  if (values.length !== 1)
    throw new Error("Found non unique or inexistent value");
  return values[0];
}

export async function getPlanName(productId: string) {
  const product = await stripe.products.retrieve(productId);
  return product.name;
}
