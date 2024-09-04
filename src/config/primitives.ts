import { tv } from "tailwind-variants";

export const title = tv({
  base: "text-2xl font-bold",
  variants: {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-4xl",
    xl: "text-5xl",
  },
});

export const subtitle = tv({
  base: "text-xl font-semibold",
  variants: {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
  },
});

export const paragraph = tv({
  base: "text-base",
  variants: {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl",
    xl: "text-2xl",
  },
});

export const container = tv({
  base: "container mx-auto px-4 max-w-screen-xl",
  variants: {
    sm: "container mx-auto px-4 max-w-screen-sm",
    md: "container mx-auto px-4 max-w-screen-md",
    lg: "container mx-auto px-4 max-w-screen-lg",
    xl: "container mx-auto px-4 max-w-screen-xl",
  },
  compoundVariants: [
    {
      variant: "sm",
      class: "text-sm",
    },
    {
      variant: "md",
      class: "text-base",
    },
    {
      variant: "lg",
      class: "text-lg",
    },
    {
      variant: "xl",
      class: "text-xl",
    },
  ],
});

export const button = tv({
  base: "rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90",
  variants: {
    sm: "rounded-lg bg-primary px-3 py-1 text-white hover:bg-primary/90",
    md: "rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90",
    lg: "rounded-lg bg-primary px-5 py-3 text-white hover:bg-primary/90",
    xl: "rounded-lg bg-primary px-6 py-4 text-white hover:bg-primary/90",
  },
  compoundVariants: [
    {
      variant: "sm",
      class: "text-sm",
    },
    {
      variant: "md",
      class: "text-base",
    },
    {
      variant: "lg",
      class: "text-lg",
    },
    {
      variant: "xl",
      class: "text-xl",
    },
  ],
});

export const input = tv({
  base: "rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    sm: "rounded-lg border border-input bg-background px-2 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    md: "rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    lg: "rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    xl: "rounded-lg border border-input bg-background px-5 py-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  },
  compoundVariants: [
    {
      variant: "sm",
      class: "text-sm",
    },
    {
      variant: "md",
      class: "text-base",
    },
    {
      variant: "lg",
      class: "text-lg",
    },
    {
      variant: "xl",
      class: "text-xl",
    },
  ],
});

export const select = tv({
  base: "rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    sm: "rounded-lg border border-input bg-background px-2 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    md: "rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    lg: "rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    xl: "rounded-lg border border-input bg-background px-5 py-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  },
  compoundVariants: [
    {
      variant: "sm",
      class: "text-sm",
    },
    {
      variant: "md",
      class: "text-base",
    },
    {
      variant: "lg",
      class: "text-lg",
    },
    {
      variant: "xl",
      class: "text-xl",
    },
  ],
});

export const checkbox = tv({
  base: "rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    sm: "rounded-lg border border-input bg-background px-2 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    md: "rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    lg: "rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    xl: "rounded-lg border border-input bg-background px-5 py-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  },
  compoundVariants: [
    {
      variant: "sm",
      class: "text-sm",
    },
    {
      variant: "md",
      class: "text-base",
    },
    {
      variant: "lg",
      class: "text-lg",
    },
    {
      variant: "xl",
      class: "text-xl",
    },
  ],
});

export const radio = tv({
  base: "rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    sm: "rounded-lg border border-input bg-background px-2 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    md: "rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    lg: "rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    xl: "rounded-lg border border-input bg-background px-5 py-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  },
});

export const badge = tv({
  base: "rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    sm: "rounded-lg border border-input bg-background px-2 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    md: "rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    lg: "rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    xl: "rounded-lg border border-input bg-background px-5 py-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  },
});

export const accordion = tv({
  base: "border-none",
  variants: {
    sm: "border-none",
    md: "border-none",
    lg: "border-none",
    xl: "border-none",
  },
  compoundVariants: [
    {
      variant: "sm",
      class: "text-sm",
    },
    {
      variant: "md",
      class: "text-base",
    },
    {
      variant: "lg",
      class: "text-lg",
    },
    {
      variant: "xl",
      class: "text-xl",
    },
  ],
});

export const avatar = tv({
  base: "rounded-full",
  variants: {
    sm: "rounded-full",
    md: "rounded-full",
    lg: "rounded-full",
    xl: "rounded-full",
  },
  compoundVariants: [
    {
      size: "sm",
      class: "h-8 w-8",
    },
    {
      size: "md",
      class: "h-10 w-10",
    },
    {
      size: "lg",
      class: "h-12 w-12",
    },
    {
      size: "xl",
      class: "h-14 w-14",
    },
  ],
});
