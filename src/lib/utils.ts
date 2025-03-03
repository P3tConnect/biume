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
  if (!productId) {
    return;
  }

  const product = await stripe.products.retrieve(productId);

  if (!product) {
    return;
  }

  return product.name;
}

export const getFileExtension = (url: string) => {
  const extension = url.split(".").pop()?.toLowerCase();
  return extension || "";
};

export const getDocumentName = (
  document: { url: string; name: string },
  index: number,
) => {
  const extension = getFileExtension(document.url);
  const isImage = ["jpg", "jpeg", "png", "webp"].includes(extension);
  const isPDF = extension === "pdf";

  if (document.name) return document.name;
  if (isImage) return `Image ${index + 1}`;
  if (isPDF) return `Document PDF ${index + 1}`;
  return `Document ${index + 1}`;
};
